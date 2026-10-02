import { useState, useRef, useEffect } from "react";

// icons
import { MdOutlineMenuBook } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

// components
import PopupWarningModal from "../../modals/PopupWarningModal";

// constants
import {habitCategoryList, warningModalConstants} from '../../constants/habitConstants'

import './index.css'

const HabitRowNameCard = props => {
    const {habitDetails, onCallDeleteHabitApi, onCallUpdateHabitApi} = props
    const {id, name, category} = habitDetails
    
    // get category icon and details
    const currentCategoryDetails = habitCategoryList.find(eachCategory => eachCategory.label === category)
    
    //state
  const [isShowDropDownMenu, setShowDropDownMenu] = useState(false)
  const [isShowPopupWarningModal, setShowPopupWarningModal] = useState(false)

  // refs
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
    setShowPopupWarningModal(false)
    onCallDeleteHabitApi(id)
  }

  // 
  const handleUpdateHabit = () => {
    const formData = {
      id, 
      habitName: name, 
      habitCategory: currentCategoryDetails}
    onCallUpdateHabitApi(formData)
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
        <button type="button" onClick={handleUpdateHabit} className="each-habit-name-card-dropdown-menu-btn edit-btn"><MdOutlineEdit className="each-habit-name-card-dropdown-menu-icon-edit-icon" />Edit</button>
        <button type="button" onClick={() => setShowPopupWarningModal(true)} className="each-habit-name-card-dropdown-menu-btn delete-btn"><RiDeleteBin6Line className="each-habit-name-card-dropdown-menu-icon-delete-icon" />Delete</button>
      </div>
    )
  }



    return (
      <div className='each-habit-name-card-container'>

        <div className="each-habit-name-card-left-container">
           <div className="each-habit-name-card-icon-container">
            <currentCategoryDetails.icon className="habit-name-card-icon" />
          </div>
          
          <h3 className='each-habit-name-card-name'>{name}</h3>
        </div>

       


        
        <button type="button"  onClick={handleShowDropDownMenu} className="each-habit-name-card-three-dot-btn">
          
           <BsThreeDotsVertical className="each-habit-name-card-three-dot-icon" />
        </button>
        
        {
          isShowDropDownMenu && renderDropDownMenu()
        }


        {
          isShowPopupWarningModal && (
            <PopupWarningModal
              warningModalDetails={warningModalConstants.deleteHabit}
              onCancel={() => setShowPopupWarningModal(false)}
              onConfirm={handleDeleteHabit}
            />
          )
        }
        
        
      </div>
    )
  }

  export default HabitRowNameCard