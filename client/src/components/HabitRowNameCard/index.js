
// icons
import { MdOutlineMenuBook } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

// constants
import {habitCategoryList} from '../../constants/habitConstants'

import './index.css'

const HabitRowNameCard = props => {
    const {habitDetails} = props
    const {name, category} = habitDetails

    const currentCategoryDetails = habitCategoryList.find(eachCategory => eachCategory.label === category)
    
    return (
      <div className='each-habit-name-card-container'>

        <div className="each-habit-name-card-left-container">
           <div className="each-habit-name-card-icon-container">
            <currentCategoryDetails.icon className="habit-name-card-icon" />
          </div>
          
          <h3 className='habit-name'>{name}</h3>
        </div>

       


        
        <button className="each-habit-name-card-three-dot-btn">
          <BsThreeDots className="each-habit-name-card-three-dot-icon" />
        </button>
        
        
        
      </div>
    )
  }

  export default HabitRowNameCard