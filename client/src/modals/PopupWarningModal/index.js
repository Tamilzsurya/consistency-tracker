
import {useContext} from 'react'

// contexts
import AddHabitModalContext from '../../contexts/AddHabitModalContext'

// constants
import {responseConstants} from '../../constants/uiConstants'

// icons
import { IoIosClose } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";


import './index.css';

const PopupWarningModal = props => {
    const {warningModalDetails, onCancel, onConfirm} = props
    const {title, description, confirmBtnText, cancelBtnText} = warningModalDetails


    return (
        <div className="popup-warning-bg-container">
            <div className="popup-warning-content-container">
                <button type="button" onClick={onCancel} className="popup-warning-content-close-btn">
                    <IoIosClose className="popup-warning-content-close-icon" />
                </button>

                
                <div className="popup-warning-content-icon-container">
                    <MdOutlineDeleteForever className="popup-warning-content-icon"  />
                </div>

                <h1 className="popup-warning-content-title">{title}</h1>
                <p className="popup-warning-content-description">{description}</p>

                <div className="popup-warning-content-btn-container">
                    <button type="button" onClick={onCancel} className="popup-warning-content-cancel-btn">{cancelBtnText}</button>
                    <button type="button" onClick={onConfirm} className="popup-warning-content-confirm-btn">{confirmBtnText}</button>
                </div>
            </div>
        </div>
    )
}

export default PopupWarningModal