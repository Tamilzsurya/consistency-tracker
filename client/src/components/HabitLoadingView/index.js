
import Loader from "react-loader-spinner";

import './index.css';


const HabitLoadingView = () => {
    return (
        <div className="habit-loading-view-container">  
            <Loader className="habit-loading-view-container-loader" type="Oval" color="#3525CD" height={60} width={60} />  
            <p className="habit-loading-view-container-para">Loading your consistency...</p>   
            <p className="habit-loading-view-container-para">Preparing your habits and progress.</p>    
        </div>
    )
}

export default HabitLoadingView