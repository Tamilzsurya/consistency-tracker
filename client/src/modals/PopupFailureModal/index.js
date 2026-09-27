
import {responseConstants} from '../../constants/uiConstants'


import { IoIosClose } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { FaExclamation } from "react-icons/fa";

import './index.css';

const PopupFailureModal = props => {
    const {setTodayHabitEntryApiResponse} = props

    const handleClose = () => {
        setTodayHabitEntryApiResponse({
            todayHabitEntryApiResponseView: responseConstants.initial,
            submitErrorMsg: "",
            submitSuccessMsg: ""
        })
    }

    return (
        <div className="popup-failure-bg-container">
            <div className="popup-failure-content-container">
                <button type="button" onClick={handleClose} className="popup-failure-content-close-btn">
                    <IoIosClose className="popup-failure-content-close-icon" />
                </button>

                
                <div className="popup-failure-content-icon-container">
                    <FaExclamation className="popup-failure-content-icon" />
                </div>

                <h1 className="popup-failure-content-title">Unable to Complete Your Request</h1>
                <p className="popup-failure-content-description">Something went wrong on our end. Please try again later.</p>
            </div>
        </div>
    )
}

export default PopupFailureModal