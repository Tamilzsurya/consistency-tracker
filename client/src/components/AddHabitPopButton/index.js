
import { FaPlus } from "react-icons/fa";

import './index.css'

const AddHabitPopButton = () => {
    return (
        <div className="add-habit-pop-button-container">
            <button className="add-habit-pop-button">
                <FaPlus className="add-habit-pop-button-icon" />
            </button>
        </div>
    )
}

export default AddHabitPopButton