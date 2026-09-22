import { useState } from "react";


// components
import HabitSuccessView from '../HabitSuccessView';
import HabitEmptyView from '../HabitEmptyView';
import HabitLoadingView from '../HabitLoadingView';
import HabitFailureView from '../HabitFailureView';
import AddHabitPopButton from '../AddHabitPopButton';

import './index.css'

const responseConstants = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE'
}

const HomeMainContent = () => {
    const [apiResponse, setApiResponse] = useState({
        error: "",
        habitData: [],
        isLoading: responseConstants.initial
    });

    return (
         <main className="home-page-main-container">

            <HabitEmptyView />

            {/* <HabitLoadingView /> */}

            {/* <HabitSuccessView /> */}

            {/* <HabitFailureView /> */}

            
        </main>
    )
}


export default HomeMainContent