
import { FaSquare } from "react-icons/fa";

import './index.css'

const HabitRowGridCard = () => {

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

export default HabitRowGridCard