
import { MdOutlineMenuBook } from "react-icons/md";

import './index.css'

const HabitRowNameCard = ({name}) => {
    return (
      <div className='each-habit-name-card-container'>
        <MdOutlineMenuBook className="habit-name-card-icon" />
        <h3 className='habit-name'>{name}</h3>
      </div>
    )
  }

  export default HabitRowNameCard