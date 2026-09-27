
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import './index.css';

const HabitRowNameCardHeader = props => {
    const {formatedMonth, handleNextMonth,  handlePreviousMonth} = props

    const handleNextMonthClick = () => {
      handleNextMonth();
    }

    const handlePreviousMonthClick = () => {
      handlePreviousMonth();
    }

    return (
      <div className='each-habit-name-card-container each-habit-name-card-container-header'>
        <button onClick={handlePreviousMonthClick} type="button" className="each-habit-name-card-icon-btn">
          <MdOutlineKeyboardArrowLeft className="each-habit-name-card-arrow-icon" />
        </button>

        <h3 className='habit-name'>{formatedMonth}</h3>

        <button onClick={handleNextMonthClick} type="button" className="each-habit-name-card-icon-btn">
          <MdOutlineKeyboardArrowRight className="each-habit-name-card-arrow-icon" />
        </button>
      </div>
    )
  }

export default HabitRowNameCardHeader;