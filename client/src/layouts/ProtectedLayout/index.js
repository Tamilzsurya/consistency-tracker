import {Route, Switch} from 'react-router-dom'




// pages
import HomePage from '../../pages/HomePage';
import GridPage from '../../pages/GridPage';
import TrendPage from '../../pages/TrendPage';
import ProfilePage from '../../pages/ProfilePage';

// components
import AddHabitPopButton from '../../components/AddHabitPopButton';

import './index.css'



const ProtectedLayout = () => {

    return (
        <div>

            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/grid" component={GridPage} />
                <Route exact path="/trends" component={TrendPage} />
                <Route exact path="/profile" component={ProfilePage} />
            </Switch>


            <AddHabitPopButton />
            

        </div>
    )
}

export default ProtectedLayout