

import AddHabitModalContext from '../../contexts/AddHabitModalContext.js'

// icons
import { FaPlus } from "react-icons/fa";

// assets
import consistencyGridEmptyStateImg from '../../assets/images/consistency-grid-empty-state-img.jpg'

// constents
import habitSuggestionList from '../../constents/habitSuggestion.js'

// components
import HabitSuggestionItem from '../HabitSuggestionItem'

import './index.css'

const HabitEmptyView = () => {

    return (
        <AddHabitModalContext.Consumer>
            {
                value => {
                    const { isAddHabitModalOpen, setIsAddHabitModalOpen } = value;

                    const handelSetIsAddHabitModalOpen = () =>{
                        setIsAddHabitModalOpen(true)
                    }

                    return(
                        <div className="habit-empty-view-bg-container">
                            <div className="habit-empty-view">

                                <section className="habit-empty-view-add-habit-section">
                                    <img className="habit-empty-view-add-habit-section-image" src={consistencyGridEmptyStateImg} alt='' />
                                    <h1 className="habit-empty-view-add-habit-section-title">Your grid is waiting for its first habit.</h1>
                                    <p className="habit-empty-view-add-habit-section-description">Click the button below to add your first habit.Show up consistently, and watch your pattern grow day by day.</p>
                                    <button type='button' onClick={handelSetIsAddHabitModalOpen} className="habit-empty-view-add-habit-section-button"><FaPlus className="habit-empty-view-add-habit-section-button-icon" />Add Your First Habit</button>
                                </section>

                                <section className="habit-empty-view-suggestion-section">
                                    <h1 className="habit-empty-view-suggestion-section-title">NOT SURE WHERE TO START?</h1>
                                    <ul className="habit-empty-view-suggestion-section-ul-list">
                                        {
                                            habitSuggestionList.map((habitSuggestionItem) => <HabitSuggestionItem key={habitSuggestionItem.id} habitSuggestionItemDetails={habitSuggestionItem} />)
                                        }
                                    </ul>
                                </section>
                                
                            </div>
                        </div>
                    )
                }
            }
        </AddHabitModalContext.Consumer>
        
    )
}

export default HabitEmptyView    