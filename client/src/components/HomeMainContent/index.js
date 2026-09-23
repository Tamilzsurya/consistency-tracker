import { useState, useEffect, useContext } from "react";
import Cookies from 'js-cookie'


// contexts
import AddHabitModalContext from '../../contexts/AddHabitModalContext'

// components
import HabitSuccessView from '../HabitSuccessView';
import HabitEmptyView from '../HabitEmptyView';
import HabitLoadingView from '../HabitLoadingView';
import HabitFailureView from '../HabitFailureView';


import {getAllHabits} from '../../services/habitService';

import './index.css'

const responseConstants = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE',
    empty: 'EMPTY'
}

const HomeMainContent = () => {
    const [apiResponse, setApiResponse] = useState({
        error: "",
        habitData: [],
        currentApiStateView: responseConstants.initial
    });

    const {allHabitsDataVersion} = useContext(AddHabitModalContext);


    useEffect(() => {
        console.log("Main content rendered")
        getAllHabitsApiCall();
    }, [allHabitsDataVersion])

    


    const getAllHabitsApiCall = async () => {
        const jwt_token =  Cookies.get("jwt_token");

        const formData = {
            jwt_token
        }


        // set the loading view
        setApiResponse(prevState => (
            {
                ...prevState,
                currentApiStateView: responseConstants.loading
            }
        ) )


        try {

            const data = await getAllHabits(formData);
            const {habits} = data;

            if(habits.length === 0){
                setApiResponse(prevState => ({
                    ...prevState,
                    habitData: habits,
                    currentApiStateView: responseConstants.empty
                }))
                return;
            }

            

            setApiResponse(prevState => ({
                ...prevState,
                habitData: habits,
                currentApiStateView: responseConstants.success
            }))


        }catch(error){

            setApiResponse(prevState => ({
                ...prevState,
                error,
                currentApiStateView: responseConstants.failure
            }))

        }
    }



    const renderCurrentView = () => {
        switch(apiResponse.currentApiStateView){
            case responseConstants.initial:
                return null;
            case responseConstants.loading:
                return <HabitLoadingView />;
            case responseConstants.success:
                return <HabitSuccessView habitData={apiResponse.habitData} />;
            case responseConstants.failure:
                return <HabitFailureView error={apiResponse.error} />;
            case responseConstants.empty:
                return <HabitEmptyView />;
            default:
                return null;
        }
    }



    return (
       
            <main className="home-page-main-container">

                {/* <HabitLoadingView /> */}

                {/* <HabitSuccessView /> */}

                {/* <HabitFailureView /> */}

                { renderCurrentView() }
                            
            </main>        
    )
}


export default HomeMainContent