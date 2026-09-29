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
import AddHabitPopFormModal from '../../modals/AddHabitPopFormModal'

// utils/dateAndTime/dateOperations.js
import {getNextMonthAndTotalDays, getPreviousMonthAndTotalDays, getCurrentMonthAndTotalDays } from '../../utils/dateAndTime/dateOperations'

// constants
import {responseConstants} from '../../constants/uiConstants'

// services
import {createOrUpdateHabitEntry} from '../../services/habitEntryService'
import {deleteHabit} from '../../services/habitService'

import AddHabitModalContext from '../../contexts/AddHabitModalContext'

import './index.css'




const HabitSucessView = props => {
    const {habitsData} = props
    
    
    const currentMonthDetails = getCurrentMonthAndTotalDays(new Date())
    
    // state
    const [monthDetails, setMonthDetails] = useState(currentMonthDetails);
    const [todayHabitEntryApiResponse, setTodayHabitEntryApiResponse] = useState({
        todayHabitEntryApiResponseView: responseConstants.initial,
        submitErrorMsg: "",
        submitSuccessMsg: ""
    });
    const [deleteHabitApiResponse, setDeleteHabitApiResponse] = useState({
        deleteHabitApiResponseView: responseConstants.initial,
        submitErrorMsg: "",
        submitSuccessMsg: ""
    });

    const {setIsAddHabitModalOpen, setFormDetails} = useContext(AddHabitModalContext)
    
    
    
    
    const {totalDays, formatedMonth, newDate, totalDaysList} = monthDetails;
    const jwtToken =  Cookies.get("jwt_token");



    // todayHabitEntryApiResponse api call
    const onCallUpdateTodayHabitEntryApi = async entryData => {
        
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

    // delete Habit Api call
    const onCallDeleteHabitApi = async habitId => {


        console.log(habitId);
        setDeleteHabitApiResponse(prevState => ({
            ...prevState,
            deleteHabitApiResponseView: responseConstants.loading
        }))

        try{
            const data = await deleteHabit(habitId, jwtToken)
            setDeleteHabitApiResponse(prevState => ({
                ...prevState,
                deleteHabitApiResponseView: responseConstants.success,
                submitErrorMsg: "",
                submitSuccessMsg: data.message
            }))
        }catch(error){
            console.log(error.message);
            setDeleteHabitApiResponse(prevState => ({
                ...prevState,
                deleteHabitApiResponseView: responseConstants.failure,
                submitErrorMsg: error.message,
                submitSuccessMsg: ""
            }))
        }
    }

    const onCallUpdateHabitApi = async formData => {
      const formDetails = {
          formName: "Update",
          formData
      }


      setFormDetails(formDetails)
      setIsAddHabitModalOpen(true)
       
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
          
          <button type="button" onClick={() => setIsAddHabitModalOpen(true)} className="add-habit-button">
            <AiOutlinePlusCircle className="tips-section-btn-icon" />
            <span className="tips-section-btn-text">Add Habit</span>
          </button>
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

      // todayHabitEntryApiResponse view
    const renderTodayHabitEntryApiResponseView = (currentView) => {
      switch(currentView){
        case responseConstants.initial:
          return null;
        case responseConstants.loading:
          return <PopupLoadingModal />;
        case responseConstants.success:
          return <PopupSuccessModal setApiResponse={setTodayHabitEntryApiResponse} />;
        case responseConstants.failure:
          return <PopupFailureModal setApiResponse={setTodayHabitEntryApiResponse} />;
        default:
          return null;
      }
    }

    // deleteHabitApiResponse view
    const renderDeleteHabitApiResponseView = (currentView) => {
      switch(currentView){
        case responseConstants.initial:
          return null;
        case responseConstants.loading:
          return <PopupLoadingModal />;
        case responseConstants.success:
          return <PopupSuccessModal id="Delete" setApiResponse={setDeleteHabitApiResponse} />;
        case responseConstants.failure:
          return <PopupFailureModal id="Delete" setApiResponse={setDeleteHabitApiResponse} />;
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
                      <HabitRowNameCard key={eachHabit.id} habitDetails={eachHabit} onCallUpdateHabitApi={onCallUpdateHabitApi} onCallDeleteHabitApi={onCallDeleteHabitApi} />
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

            {// todayHabitEntryApiResponse view
              renderTodayHabitEntryApiResponseView(todayHabitEntryApiResponse.todayHabitEntryApiResponseView)
            }
            {
              renderDeleteHabitApiResponseView(deleteHabitApiResponse.deleteHabitApiResponseView)
            }


           

        </section>
    )
}

export default HabitSucessView