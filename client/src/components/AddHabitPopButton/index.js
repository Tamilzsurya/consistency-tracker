
import AddHabitModalContext from '../../contexts/AddHabitModalContext'

import { FaPlus } from "react-icons/fa";

import './index.css'

const AddHabitPopButton = () => {
    return (
        <AddHabitModalContext.Consumer>
            {
                value => {
                    const {isAddHabitModalOpen, setIsAddHabitModalOpen} = value;
                    
                    const handelSetIsAddHabitModalOpen = () => {
                        setIsAddHabitModalOpen(true)
                    }

                    return(
                        <div className="add-habit-pop-button-container">
                            <button type="button" onClick={handelSetIsAddHabitModalOpen} className="add-habit-pop-button">
                                <FaPlus className="add-habit-pop-button-icon" />
                            </button>
                        </div>
                    )
                }
            }
        </AddHabitModalContext.Consumer>
    )
}

export default AddHabitPopButton