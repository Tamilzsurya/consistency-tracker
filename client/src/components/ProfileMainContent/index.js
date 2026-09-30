import { useState, useEffect } from "react";
import Cookies from 'js-cookie'

// components
import HabitLoadingView from '../HabitLoadingView';
import HabitFailureView from '../HabitFailureView';
import ProfileSuccessView from '../ProfileSuccessView';

// constants
import {responseConstants} from '../../constants/uiConstants'

import {getUserDetails} from '../../services/userService'

import './index.css';

const ProfileMainContent = () => {
    const [getUserDetailsApiResponse, setGetUserDetailsApiResponse] = useState({
        getUserDetailsApiResponseView: responseConstants.initial,
        userDetails: {},
        submitErrorMsg: "",
        submitSuccessMsg: ""
    })

    // get user details only once
    useEffect(() => {
        callGetUserDetailsApi();
    }, []);



    // get user details api 
    const callGetUserDetailsApi = async () => {
        const jwtToken = Cookies.get("jwt_token");


        // set the loading view
        setGetUserDetailsApiResponse(prevState => ({
            ...prevState,
            submitErrorMsg: "",
            submitSuccessMsg: "",
            getUserDetailsApiResponseView: responseConstants.loading
        }))

        try{

            const data = await getUserDetails(jwtToken);

            setGetUserDetailsApiResponse(prevState => ({
                ...prevState,
                submitErrorMsg: "",
                submitSuccessMsg: "",
                getUserDetailsApiResponseView: responseConstants.success,
                userDetails: data.user
            }))

        }catch(error){

            setGetUserDetailsApiResponse(prevState => ({
                ...prevState,
                getUserDetailsApiResponseView: responseConstants.failure,
                submitErrorMsg: error.message,
                submitSuccessMsg: ""
            }))
        }

    }

    


    // render the get user details api response view UI
    const renderGetUserDetailsApiResponseView = () => {
        switch(getUserDetailsApiResponse.getUserDetailsApiResponseView) {
            case responseConstants.initial:
                return null;
            case responseConstants.loading:
                return <HabitLoadingView />;
            case responseConstants.failure:
                return <HabitFailureView />;
            case responseConstants.success:
                return <ProfileSuccessView userDetails={getUserDetailsApiResponse.userDetails} />;
            default:
                return null;
        }
    }


    return (
        <main className="profile-page-main-container">

            {renderGetUserDetailsApiResponseView()}
        </main>
    )
}


export default ProfileMainContent