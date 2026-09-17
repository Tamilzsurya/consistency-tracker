import { useState } from "react";


// components
import HabitSuccessView from '../HabitSuccessView';
import HabitEmptyView from '../HabitEmptyView';

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
         <main className="home-page-main-content">

            { apiResponse.habitData.length > 0 ? <HabitSuccessView /> : <HabitEmptyView /> }
            
        </main>
    )
}


export default HomeMainContent