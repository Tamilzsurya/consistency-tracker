import { useState, useEffect, useContext } from "react";
import Cookies from 'js-cookie'


// icons
import { FaCheckCircle } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineShare } from "react-icons/md";

// components
import HabitRowGridCard from '../HabitRowGridCard';
import HabitRowNameCard from '../HabitRowNameCard';
import HabitRowGridCardHeader from '../HabitRowGridCardHeader';
import HabitRowNameCardHeader from '../HabitRowNameCardHeader';

// modals
import PopupLoadingModal from '../../modals/PopupLoadingMoadal';
import PopupSuccessModal from '../../modals/PopupSuccessModal';
import PopupFailureModal from '../../modals/PopupFailureModal';

// utils/dateAndTime/dateOperations.js
import {getNextMonthAndTotalDays, getPreviousMonthAndTotalDays, getCurrentMonthAndTotalDays } from '../../utils/dateAndTime/dateOperations'

// constants
import {responseConstants} from '../../constants/uiConstants'

// services
import {createOrUpdateHabitEntry} from '../../services/habitEntryService'



import './index.css'




const HabitSucessView = props => {
    const {habitsData} = props
    
    
    const currentMonthDetails = getCurrentMonthAndTotalDays(new Date())
    
    
    const [monthDetails, setMonthDetails] = useState(currentMonthDetails);
    const [todayHabitEntryApiResponse, setTodayHabitEntryApiResponse] = useState({
        todayHabitEntryApiResponseView: responseConstants.initial,
        submitErrorMsg: "",
        submitSuccessMsg: ""
    });
    
    
    
    const {totalDays, formatedMonth, newDate, totalDaysList} = monthDetails;
    


    // todayHabitEntryApiResponse api call
    const onCallUpdateTodayHabitEntryApi = async entryData => {
        const jwtToken =  Cookies.get("jwt_token");

        setTodayHabitEntryApiResponse(prevState => ({
            ...prevState,
            todayHabitEntryApiResponseView: responseConstants.loading
        }))

        try{
          const data = await createOrUpdateHabitEntry(entryData, jwtToken);

          setTodayHabitEntryApiResponse(prevState => ({
            ...prevState,
            todayHabitEntryApiResponseView: responseConstants.success,
            submitErrorMsg: "",
            submitSuccessMsg: data.message
          }))

          
          
        }catch(error){
          console.log(error.message);
          setTodayHabitEntryApiResponse(prevState => ({
            ...prevState,
            todayHabitEntryApiResponseView: responseConstants.failure,
            submitErrorMsg: error.message,
            submitSuccessMsg: ""
          }))
        }

    }



    // functions to change current month to next month
    const handleNextMonth = () => {
        const nextMonthDetails = getNextMonthAndTotalDays(newDate);
        setMonthDetails(nextMonthDetails);
    }
    // functions to change current month to previous month
    const handlePreviousMonth = () => {
        const previousMonthDetails = getPreviousMonthAndTotalDays(newDate);
        setMonthDetails(previousMonthDetails);
    }


    // render
    const renderInformationSection = () =>{
        return (
          <section className="info-section">
                <div className="today-info-container">
                  <h2 className="info-title">CURRENT STANDING</h2>
                  <p className="info-description">85% Task Completed Today.</p>
                  <div className='info-percentage-outer-container'>
                    <div className='info-percentage-inner-container'></div>
                  </div>
                  <p className="info-quote">“If you improve by 1% every day, in a year it becomes a great achievement.”</p>
                </div>
    
                <div className="streak-info-container">
                  <h1 className="streak-number">24d</h1>
                  <h2 className="streak-title">Streak</h2>
                  <p className="streak-description">Uinterrupted momentum</p>
                </div>
    
                <div className="tasks-info-container">
                  <div className="check-icon-container">
                    <FaCheckCircle className="check-icon" />
                  </div>
                  <h2 className="tasks-number">142 Done</h2>
                  <p className="tasks-description">Tasks completed this month</p>
                </div>
          </section>
        )
      }

    const renderTipsSection = () =>(
        <section className="tips-section">
          
          <button className="add-habit-button">
            <AiOutlinePlusCircle className="tips-section-btn-icon" />
            <span className="tips-section-btn-text">Add Habit</span></button>
          <button className='export-data-button'>
            <MdOutlineShare className="tips-section-btn-icon" />
            <span className="tips-section-btn-text">Export Data</span>
          </button>
    
          <div className="tips-container">
            <div className="tips-icon-container">
              <BsStars className="tips-icon" />
            </div>
            <div className="tips-content-container">
              <h1 className="tips-title">Consistency Tip</h1>
              <p className="tips-description">"Never miss twice. The second miss is the start of a new habit."</p>
            </div>
          </div>
        </section>
      )

    const renderTodayHabitEntryApiResponseView = (currentView) => {
      switch(currentView){
        case responseConstants.initial:
          return null;
        case responseConstants.loading:
          return <PopupLoadingModal />;
        case responseConstants.success:
          return <PopupSuccessModal setTodayHabitEntryApiResponse={setTodayHabitEntryApiResponse} />;
        case responseConstants.failure:
          return <PopupFailureModal setTodayHabitEntryApiResponse={setTodayHabitEntryApiResponse} />;
        default:
          return null;
      }
    }



    return (
        
        <section className="habit-success-view">
            {/* today-page: information section */
            renderInformationSection()
            }
            
            {/* today-page: habits section */}
            <section className="habits-section">
                <div className='habit-names-container'>
                  <HabitRowNameCardHeader key={formatedMonth} formatedMonth={formatedMonth} handleNextMonth={handleNextMonth} handlePreviousMonth={handlePreviousMonth} />
                  {
                    habitsData.map(eachHabit => (
                      <HabitRowNameCard key={eachHabit.id} habitDetails={eachHabit} />
                    ))
                  }
                  
                  
                </div>

                <div className='habit-cards-container'>
                  <HabitRowGridCardHeader totalDays={totalDays} key={formatedMonth} />
                  {
                    habitsData.map(eachHabit => (
                      <HabitRowGridCard key={eachHabit.id} habitDetails={eachHabit} totalDays={totalDays} totalDaysList={totalDaysList} onCallUpdateTodayHabitEntryApi={onCallUpdateTodayHabitEntryApi} />
                    ))
                  }
                </div>
            </section>

            

            {/* { today-page: tips section */
            renderTipsSection()
            }


            {/* <PopupLoadingModal /> */}
            {/* <PopupSuccessModal /> */}
            {/* <PopupFailureModal /> */}
            {
              renderTodayHabitEntryApiResponseView(todayHabitEntryApiResponse.todayHabitEntryApiResponseView)
            }
        </section>
    )
}

export default HabitSucessView