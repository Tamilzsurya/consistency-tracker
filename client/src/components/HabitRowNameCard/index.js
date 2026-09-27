import { useState, useRef, useEffect } from "react";

// icons
import { MdOutlineMenuBook } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";


// constants
import {habitCategoryList} from '../../constants/habitConstants'

import './index.css'

const HabitRowNameCard = props => {
    const {habitDetails, onCallDeleteHabitApi} = props
    const {id, name, category} = habitDetails
    

    const currentCategoryDetails = habitCategoryList.find(eachCategory => eachCategory.label === category)
    
  const [isShowDropDownMenu, setShowDropDownMenu] = useState(false)
  const dropdownRef = useRef(null);


  // Close dropdown when clicking outside
  useEffect(() => {
    // close dropdown when clicking outside
    const handleClickOutside = event => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropDownMenu(false);
      }
    };

    if (isShowDropDownMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShowDropDownMenu]);


  // delete habit
  const handleDeleteHabit = () => {
    onCallDeleteHabitApi(id)
  }


  // show/hide dropdown menu
  const handleShowDropDownMenu = () => {
    setShowDropDownMenu(!isShowDropDownMenu)
  }

  // hide dropdown menu
  const handleHideDropDownMenu = () => {
    setShowDropDownMenu(false)
  }



  const renderDropDownMenu = () => {

    return (
      <div ref={dropdownRef} onBlur={handleHideDropDownMenu}  className="each-habit-name-card-dropdown-menu-container">
        <button className="each-habit-name-card-dropdown-menu-btn edit-btn"><MdOutlineEdit className="each-habit-name-card-dropdown-menu-icon-edit-icon" />Edit</button>
        <button type="button" onClick={handleDeleteHabit} className="each-habit-name-card-dropdown-menu-btn delete-btn"><RiDeleteBin6Line className="each-habit-name-card-dropdown-menu-icon-delete-icon" />Delete</button>
      </div>
    )
  }



    return (
      <div className='each-habit-name-card-container'>

        <div className="each-habit-name-card-left-container">
           <div className="each-habit-name-card-icon-container">
            <currentCategoryDetails.icon className="habit-name-card-icon" />
          </div>
          
          <h3 className='habit-name'>{name}</h3>
        </div>

       


        
        <button type="button"  onClick={handleShowDropDownMenu} className="each-habit-name-card-three-dot-btn">
          
           <BsThreeDotsVertical className="each-habit-name-card-three-dot-icon" />
        </button>
        
        {
          isShowDropDownMenu && renderDropDownMenu()
        }
        
      </div>
    )
  }

  export default HabitRowNameCard