import { useState, useEffect, useContext } from "react";
import Cookies from 'js-cookie'


// contexts
import AddHabitModalContext from '../../contexts/AddHabitModalContext'

// components
import HabitSuccessView from '../HabitSuccessView';
import HabitEmptyView from '../HabitEmptyView';
import HabitLoadingView from '../HabitLoadingView';
import HabitFailureView from '../HabitFailureView';

// services
import {getAllHabits} from '../../services/habitService';

// utils
import {getFormatedDate} from '../../utils/dateAndTime/dateOperations'



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
        dashboardStats: {},
        currentApiStateView: responseConstants.initial
    });

   

    // context
    const {allHabitsDataVersion, setTodayCompletedTasksPercentage} = useContext(AddHabitModalContext);

    // console.log(`Habit Data: ${apiResponse.habitData[0].habitName}`)

    useEffect(() => {
        console.log("Main content rendered")
        getAllHabitsApiCall();
    }, [allHabitsDataVersion])

    


    const getAllHabitsApiCall = async () => {
        const jwt_token =  Cookies.get("jwt_token");
        const date = getFormatedDate(new Date())

        const formData = {
            jwt_token,
            date
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
            const habits = data.habits.habitDetails;
            const dashboardStats = data.habits.dashboardStats;
            const {todayCompletedTasksPercentage} = dashboardStats;
            

            if(habits.length === 0){
                setApiResponse(prevState => ({
                    ...prevState,
                    habitData: habits,
                    currentApiStateView: responseConstants.empty
                }))

                setTodayCompletedTasksPercentage(todayCompletedTasksPercentage)

                return;
            }


            // format the response data
            const formatedHabits = habits.map(habit => ({
                id: habit.id,
                name: habit.name,
                category: habit.category,
                habitEntries: habit.habitEntries
            }))
            

            setApiResponse(prevState => ({
                ...prevState,
                habitData: formatedHabits,
                dashboardStats: dashboardStats,
                currentApiStateView: responseConstants.success
            }))

            setTodayCompletedTasksPercentage(todayCompletedTasksPercentage)


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
                return <HabitSuccessView habitsData={apiResponse.habitData} dashboardStats={apiResponse.dashboardStats} />;
            case responseConstants.failure:
                return <HabitFailureView error={apiResponse.error} tryAgainApiCall = {getAllHabitsApiCall} />;
            case responseConstants.empty:
                return <HabitEmptyView />;
            default:
                return null;
        }
    }



    return (
       
            <main className="home-page-main-container">

                {/* <HabitLoadingView /> */}

                {/*<HabitSuccessView habitsData={apiResponse.habitData} /> */}

                {/* <HabitFailureView /> */}

                { renderCurrentView() }
                            
            </main>        
    )
}


export default HomeMainContent