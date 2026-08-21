import { Component } from 'react';

import { FaCheckCircle } from "react-icons/fa";
import { FaSquare } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineShare } from "react-icons/md";

import HomeSidebar from '../../components/HomeSidebar';
import HomeTopNavbar from '../../components/HomeTopNavbar';

import './index.css';

class HomePage extends Component {


  renderInformationSection = () =>{
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

  renderHabitRowCards = () =>{
    const eachHabitRowData = [];
    for (let i = 1; i <= 31; i++) {
      eachHabitRowData.push(
        {
          id: i,
          habitName: 'Habit Name',
          isCompleted: false
        }
      );
    }
    return (
      <div className='each-habit-row-container'>
        {eachHabitRowData.map(each => (
          <div className='each-habit-card-container'>
            <FaSquare className="habit-card-icon" />
          </div>
        ))}
      </div>
      
    )
  }

  renderEachHabitNameCard = () =>{
    return (
      <div className='each-habit-name-card-container'>
        <MdOutlineMenuBook className="habit-name-card-icon" />
        <h3 className='habit-name'>Entertainment</h3>
      </div>
    )
  }

  renderHabitRowCardsHeader = () =>{
     const eachHabitRowData = [];
    for (let i = 1; i <= 31; i++) {
      eachHabitRowData.push(
        {
          id: i,
          habitName: 'Habit Name',
          isCompleted: false
        }
      );
    }
     
    return (
      <div className='each-habit-row-container'>
        {eachHabitRowData.map(each => (
          <div className='each-habit-card-container'>
            <p className='each-habit-row-card-header-date'>{each.id}</p>
          </div>
        ))}
      </div>
      
    )
    
  }
  renderEachHabitNameCardHeader = () =>{
    return (
      <div className='each-habit-name-card-container'>
        
        <h3 className='habit-name'>November</h3>
      </div>
    )
  }

  renderTipsSection = () =>(
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

  render() {

    return (
      <div className="home-page">
        <HomeSidebar />
        <HomeTopNavbar />

        {/* main Content */}
        <main className="main-content">
            {/* today-page: information section */
            this.renderInformationSection()
            }
            
            <section className="habits-section">
              <div className='habit-names-container'>
                {this.renderEachHabitNameCardHeader()}

               
                
                {this.renderEachHabitNameCard()}
                {this.renderEachHabitNameCard()}
              </div>

              <div className='habit-cards-container'>
                {this.renderHabitRowCardsHeader()}
                
                
                {this.renderHabitRowCards()}
                {this.renderHabitRowCards()}
              </div>
            </section>

            {/* { today-page: tips section */
            this.renderTipsSection()
            }

        </main>
      </div>
    );
  }
}

export default HomePage;