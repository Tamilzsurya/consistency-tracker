import { useState } from 'react'
import {Route, Switch} from 'react-router-dom'




// pages
import HomePage from '../../pages/HomePage';
import GridPage from '../../pages/GridPage';
import TrendPage from '../../pages/TrendPage';
import ProfilePage from '../../pages/ProfilePage';

// components
import AddHabitPopButton from '../../components/AddHabitPopButton';

// modals
import AddHabitPopFormModal from '../../modals/AddHabitPopFormModal';

import './index.css'



const ProtectedLayout = () => {
    const [isAddHabitPopFormModalOpen, setIsAddHabitPopFormModalOpen] = useState(false)

    return (
        <div>

            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/grid" component={GridPage} />
                <Route exact path="/trends" component={TrendPage} />
                <Route exact path="/profile" component={ProfilePage} />
            </Switch>


            <AddHabitPopButton />
            
            <AddHabitPopFormModal />
           
        </div>
    )
}

export default ProtectedLayout