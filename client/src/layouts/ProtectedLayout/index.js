import { useState } from 'react'
import {Route, Switch} from 'react-router-dom'

// contexts
import AddHabitModalContext from '../../contexts/AddHabitModalContext'

// pages
import HomePage from '../../pages/HomePage';
import GridPage from '../../pages/GridPage';
import TrendPage from '../../pages/TrendPage';
import ProfilePage from '../../pages/ProfilePage';

// components
import AddHabitPopButton from '../../components/AddHabitPopButton';

// modals
import AddHabitPopFormModal from '../../modals/AddHabitPopFormModal';

// constants
import {habitCategoryList} from '../../constants/habitConstants'

import './index.css'



const ProtectedLayout = () => {
    const [isAddHabitPopFormModalOpen, setIsAddHabitPopFormModalOpen] = useState(false)
    const [allHabitsDataVersion, setAllHabitsDataVersion] = useState(0)
    const [formDetails, setFormDetails] = useState({
        formName: "Add",
        formData: {
            id: null,
            habitName: "",
            habitCategory: habitCategoryList[6],
        }
    }) 
      
    //context
    
    const refreshHabitsData = () => {
        setAllHabitsDataVersion(prevState => prevState + 1);
    }

    // handel set isAddHabitPopFormModalOpen context
    const handelSetIsAddHabitPopFormModalOpen = (value) => {
        setIsAddHabitPopFormModalOpen(value)
    }

    const handleSetFormDetails = (value) => {
        setFormDetails(value)
    }
    
    return (

        <AddHabitModalContext.Provider value= 
         { 
            {
                isAddHabitModalOpen: isAddHabitPopFormModalOpen,
                setIsAddHabitModalOpen: handelSetIsAddHabitPopFormModalOpen,

                allHabitsDataVersion,
                refreshHabitsData,

                formDetails,
                setFormDetails: handleSetFormDetails
            }
         } >


             <div>

                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/grid" component={GridPage} />
                    <Route exact path="/trends" component={TrendPage} />
                    <Route exact path="/profile" component={ProfilePage} />
                </Switch>


                <AddHabitPopButton />
                {
                    isAddHabitPopFormModalOpen && <AddHabitPopFormModal />
                }
                
            
            </div> 

        </AddHabitModalContext.Provider>

    )
}

export default ProtectedLayout