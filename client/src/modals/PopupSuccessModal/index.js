
import {useContext} from 'react'

// contexts
import AddHabitModalContext from '../../contexts/AddHabitModalContext'

// constants
import {responseConstants} from '../../constants/uiConstants'


import { IoIosClose } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

import './index.css';

const PopupSuccessModal = props => {
    const {id = "Entry", setApiResponse} = props

    // context
    const {refreshHabitsData} = useContext( AddHabitModalContext)

    const handleClose = () => {
        setApiResponse({
            todayHabitEntryApiResponseView: responseConstants.initial,
            submitErrorMsg: "",
            submitSuccessMsg: ""
        })

        refreshHabitsData();
    }

    return (
        <div className="popup-success-bg-container">
            <div className="popup-success-content-container">
                <button type="button" onClick={handleClose} className="popup-success-content-close-btn">
                    <IoIosClose className="popup-success-content-close-icon" />
                </button>

                {/* the bellow container is copied from the HabitSuccessView */}
                <div className="check-icon-container">
                    <FaCheckCircle className="check-icon" />
                </div>

                <h1 className="popup-success-content-title">Your Habit {id === 'Entry' ? 'Entried' : 'Deleted'} Successfully!</h1>
                <p className="popup-success-content-description">Your request has been completed successfully. It has been updated to your consistency grid.</p>
            </div>
        </div>
    )
}

export default PopupSuccessModal