import { useState, useContext } from 'react';
import Cookies from 'js-cookie'

//context
import AddHabitModalContext from '../../contexts/AddHabitModalContext'

// icons
import { IoIosClose } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";


// components
import AddHabitCategoryListItem from '../AddHabitCategoryListItem'
import RegLoaderBtn from '../RegLoaderBtn'


// constants
import {habitCategoryList} from '../../constants/habitConstants'
import {buttonStatus} from '../../constants/uiConstants'

// utils/validation
import {habitFormValidation} from '../../utils/validation/habitValidation'

// services
import {createHabit} from '../../services/habitService'


import './index.css'




const AddHabitPopupForm = props => {

    const { setShowAddHabitPopupForm } = props


    const [selectedHabitCategory, setSelectedHabitCategory] = useState(habitCategoryList[6]);
    const [showDropDownMenu, setShowDropDownMenu] = useState(false);
    const [habitName, setHabitName] = useState('');
    const [addHabitResponseData, setAddHabitResponseData] = useState({
        error: {},
        currentStageBtn: buttonStatus.ready,
        isCloseBtnDisabled: false,
        submitErrorMsg: "",
        submitSuccessMsg: ""
    });

    // context
    const {isAddHabitModalOpen, setIsAddHabitModalOpen, refreshHabitsData} = useContext(AddHabitModalContext);

    // handel the close modal button click context
    const handleCloseModal = () => {
        setIsAddHabitModalOpen(false);
    }



    // handle form submit
    const onSubmitAddHabit = async event =>{
        event.preventDefault();


        const jwt_token = Cookies.get("jwt_token");

        const formData = {
            name: habitName,
            category: selectedHabitCategory.label,   
            jwt_token
        }

        // validate form and set error
        const error = habitFormValidation(formData);

        if(Object.keys(error).length !== 0) {
            setAddHabitResponseData(prevState => ( {...prevState, error, currentStageBtn: buttonStatus.ready})  );
            return;
        } 
       
        
        // clear all error messages and set loading state if there is no error
        setAddHabitResponseData({ 
            error: {}, 
            currentStageBtn: buttonStatus.loading,
            submitErrorMsg: "",
            submitSuccessMsg: "",
            isCloseBtnDisabled: true
         })


        // call add habit api
        try{
            
            const data = await createHabit(formData);

            // state update
            setAddHabitResponseData(prevState => ({
                ...prevState,
                currentStageBtn: buttonStatus.ready,
                isCloseBtnDisabled: false,
                submitErrorMsg: "",
                submitSuccessMsg: data.message
            }))
            setHabitName('');
            setSelectedHabitCategory(habitCategoryList[6]);

            // close popup form
            setShowAddHabitPopupForm(false);
        
            
            // context update
            refreshHabitsData();
            

        }catch(error){

            setAddHabitResponseData(prevState => ({
                ...prevState,
                currentStageBtn: buttonStatus.ready,
                isCloseBtnDisabled: false,
                submitErrorMsg: error.message,
                submitSuccessMsg: ""
            }))
            
        }

               
    }




    // change habit name
    const onChangeHabitName = event => {
        setHabitName(event.target.value);
    }

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
        const habitNameError = addHabitResponseData.error.name;
        return (
            <div className="add-habit-pop-modal-form-habit-name-container">
                <label className="add-habit-pop-modal-form-label">HABIT NAME</label>
                <input value={habitName} onChange={onChangeHabitName} className="add-habit-pop-modal-form-input" type="text" placeholder="e.g. Morning Workout" />
                {
                    habitNameError && <p className="add-habit-form-err-msg">{habitNameError}</p>
                }
            </div>
        )
    }


    const renderHabitCategoryContainer = () => {

        const habitCategoryError = addHabitResponseData.error.category;
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
                    habitCategoryError && <p className="add-habit-form-err-msg">{habitCategoryError}</p>
                }


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


    const renderCurrentStageAddHabitBtnView = () => {
        
        switch(addHabitResponseData.currentStageBtn){
            case buttonStatus.loading:
                return <RegLoaderBtn className = "add-habit-pop-modal-form-add-habit-btn" />;
            case buttonStatus.ready:
                return <button type="submit" onClick={onSubmitAddHabit} className="add-habit-pop-modal-form-add-habit-btn">Create Habit</button>
            default:
                null
        }
    }


    return(
        
            <form className="add-habit-pop-modal-form">

                {/* form header */}
                <div className="add-habit-pop-modal-form-header-container">
                    <h1 className="add-habit-pop-modal-form-header-title">Add Habit</h1>

                    <button disabled = {addHabitResponseData.isCloseBtnDisabled} type="button" onClick={handleCloseModal} className="add-habit-pop-modal-form-header-close-btn">
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
                    <button disabled = {addHabitResponseData.isCloseBtnDisabled} type="button" onClick={handleCloseModal} className="add-habit-pop-modal-form-cancel-btn">Cancel</button>
                    {
                        renderCurrentStageAddHabitBtnView()
                    }
                </div>

                {
                    addHabitResponseData.submitErrorMsg && <p className="add-habit-form-err-msg">{addHabitResponseData.submitErrorMsg}</p>
                }

                {
                    addHabitResponseData.submitSuccessMsg && <p className="add-habit-form-success-msg">{addHabitResponseData.submitSuccessMsg}</p>
                }


            </form>
        
    )
}

export default AddHabitPopupForm