import {useContext} from 'react'


import AddHabitModalContext from '../../contexts/AddHabitModalContext'


// icons
import {IoIosClose} from 'react-icons/io'
import { FaCheckCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";


import './index.css'

const AddHabitPupupFromSuccessView = props => {
    const {setShowAddHabitPopupForm} = props
    const {setIsAddHabitModalOpen} = useContext(AddHabitModalContext)

    const handleClose = () => {
        setIsAddHabitModalOpen(false)
    }

    const handleAddAnotherHabit = () => {
        setShowAddHabitPopupForm(true)
    }

    return(
        <div className="add-habit-popup-from-success-view-container">

            <div className="add-habit-popup-modal-form-success-view-header-container">
                <button type="button" onClick={handleClose} className="add-habit-popup-modal-form-success-view-header-close-btn">
                    <IoIosClose className="add-habit-popup-modal-form-success-view-header-close-icon" />
                </button>
            </div>

            <div className="add-habit-popup-modal-form-success-view-content-container">
                <div className="add-habit-popup-modal-form-success-view-icon-container">
                    <FaCheckCircle className="add-habit-popup-modal-form-success-view-icon" />
                </div>

                <h1 className='add-habit-popup-modal-form-success-view-content-container-title'>Habit Created Successfully!</h1>
                <p className="add-habit-popup-modal-form-success-view-content-container-para">Your new habit has been added and anchored into your Consistency Grid.</p>
                <button type="button" onClick={handleAddAnotherHabit} className="add-habit-popup-modal-form-success-view-content-container-add-habit-btn"><FaPlus className="add-habit-popup-modal-form-success-view-content-container-add-habit-icon" /> Add Another Habit</button>
            </div>

        </div>
    )

}

export default AddHabitPupupFromSuccessView