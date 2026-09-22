import { useState } from 'react';

import AddHabitModalContext from '../../contexts/AddHabitModalContext'

// icons
import { IoIosClose } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { MdAutoAwesome } from "react-icons/md";
import { FaDumbbell } from "react-icons/fa6";
import { FaBookOpenReader } from "react-icons/fa6";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { MdPeople } from "react-icons/md";
import { FaPalette } from "react-icons/fa";
import { MdSelfImprovement } from "react-icons/md";

import AddHabitCategoryListItem from '../../components/AddHabitCategoryListItem'


import './index.css'

const habitCategoryList = [
    {id: 1, label: 'Health', icon: FaDumbbell},
    {id: 2, label: 'Learning', icon: FaBookOpenReader},
    {id: 3, label: 'Productivity', icon: AiOutlineThunderbolt},
    {id: 4, label: 'Mindfulness', icon: MdSelfImprovement},
    {id: 5, label: 'Social', icon: MdPeople},
    {id: 6, label: 'Creative', icon: FaPalette},
    {id: 7, label: 'Others', icon: BsStars},
]


const AddHabitPopFormModal = props => {
    const [selectedHabitCategory, setSelectedHabitCategory] = useState(habitCategoryList[6]);
    const [showDropDownMenu, setShowDropDownMenu] = useState(false);




    console.log(selectedHabitCategory);
    console.log(showDropDownMenu);


    // change selected habit category
    const handleSelectHabitCategory = (habitCategoryItem) => {
        setSelectedHabitCategory(habitCategoryItem);
        setShowDropDownMenu(false);
    }

    // show/hide dropdown menu
    const handleShowDropDownMenu = () => {
        setShowDropDownMenu(prevState => !prevState);
    }




    // render elements
    const renderHabitNameContainer = () => {
        return (
            <div className="add-habit-pop-modal-form-habit-name-container">
                <label className="add-habit-pop-modal-form-label">HABIT NAME</label>
                <input className="add-habit-pop-modal-form-input" type="text" placeholder="e.g. Morning Workout" />
            </div>
        )
    }


    const renderHabitCategoryContainer = () => {

        const SelectedHabitCategoryIcon = selectedHabitCategory.icon;

        return (
            <div className="add-habit-pop-modal-form-habit-category-container">

                <label className="add-habit-pop-modal-form-label">CATEGORY</label>




                
                <button type="button" onClick={handleShowDropDownMenu} className="add-habit-pop-modal-form-habit-category-dropdown-selected-btn">
                    <div className="add-habit-pop-modal-form-habit-category-dropdown-selected-content-container">
                        <SelectedHabitCategoryIcon className="add-habit-pop-modal-form-habit-category-icon" />
                        <span className="add-habit-pop-modal-form-habit-category-text">{selectedHabitCategory.label}</span>
                    </div>
                    {
                        showDropDownMenu ? <MdOutlineKeyboardArrowUp className="add-habit-pop-modal-form-habit-category-dropdown-icon" /> : <MdOutlineKeyboardArrowDown className="add-habit-pop-modal-form-habit-category-dropdown-icon" />
                    }
                    
                </button>


                {
                    showDropDownMenu && <ul className="add-habit-pop-modal-form-habit-category-dropdown-menu-ul-container">
                    {
                            habitCategoryList.map(habitCategoryItem => (
                                <AddHabitCategoryListItem key={habitCategoryItem.id} handleSelectHabitCategory = {handleSelectHabitCategory} categoryItemDetails={habitCategoryItem} isActive = {selectedHabitCategory.id === habitCategoryItem.id} />
                            ))
                    }
                </ul>
                }


                


            </div>
        )
    }


    return (
        <AddHabitModalContext.Consumer>
            {
                value => {

                    const { isAddHabitModalOpen, setIsAddHabitModalOpen } = value;
                    
                    const handleCloseModal = () => {
                        setIsAddHabitModalOpen(false);
                    }


                    return(
                        <div className="add-habit-pop-modal-container">
                            
                            <form className="add-habit-pop-modal-form">

                                {/* form header */}
                                <div className="add-habit-pop-modal-form-header-container">
                                    <h1 className="add-habit-pop-modal-form-header-title">Add Habit</h1>

                                    <button type="button" onClick={handleCloseModal} className="add-habit-pop-modal-form-header-close-btn">
                                        <IoIosClose className="add-habit-pop-modal-form-header-close-icon" />
                                    </button>
                                    
                                </div>
                                                             
                                <div className="add-habit-pop-modal-form-inputs-container">
                                    { // habit name container
                                        renderHabitNameContainer()
                                    }
                                    { // habit category container
                                        renderHabitCategoryContainer()
                                    }
                                    
                                </div>

                                <div className="add-habit-pop-modal-form-btn-container">
                                    <button type="button" onClick={handleCloseModal} className="add-habit-pop-modal-form-cancel-btn">Cancel</button>
                                    <button type="submit" className="add-habit-pop-modal-form-add-habit-btn">Create Habit</button>
                                </div>


                            </form>


                        </div>
                    )

                }
            }
        </AddHabitModalContext.Consumer>
    )
}

export default AddHabitPopFormModal