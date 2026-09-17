
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



import './index.css'




const HabitSucessView = () => {




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



    return (
        
        <section className="main-content">
            {/* today-page: information section */
            renderInformationSection()
            }
            
            {/* today-page: habits section */}
            <section className="habits-section">
              <div className='habit-names-container'>
                <HabitRowNameCardHeader />
                <HabitRowNameCard name="Entertainment" />
                <HabitRowNameCard name="Workout" />
                <HabitRowNameCard name="Reading" />
                <HabitRowNameCard name="Sleep" />
              </div>

              <div className='habit-cards-container'>
                <HabitRowGridCardHeader />
                <HabitRowGridCard />
                <HabitRowGridCard />
                <HabitRowGridCard />
                <HabitRowGridCard />
              </div>
            </section>

            {/* { today-page: tips section */
            renderTipsSection()
            }
        </section>
    )
}

export default HabitSucessView