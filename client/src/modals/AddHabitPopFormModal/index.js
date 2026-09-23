import { useState, useContext } from 'react';
import Cookies from 'js-cookie'

//context
import AddHabitModalContext from '../../contexts/AddHabitModalContext'


// components
import AddHabitPupupFromSuccessView from '../../components/AddHabitPupupFromSuccessView'

import AddHabitPopupForm from '../../components/AddHabitPopupForm'


import './index.css'




const AddHabitPopFormModal = () => {
    const [showAddHabitPopupForm, setShowAddHabitPopupForm] = useState(true);    
   

    return(
        <div className="add-habit-pop-modal-container">

            {
                showAddHabitPopupForm ? 
                <AddHabitPopupForm setShowAddHabitPopupForm={setShowAddHabitPopupForm} /> : 
                <AddHabitPupupFromSuccessView setShowAddHabitPopupForm={setShowAddHabitPopupForm} />
            }
            

        </div>
    )
}

export default AddHabitPopFormModal