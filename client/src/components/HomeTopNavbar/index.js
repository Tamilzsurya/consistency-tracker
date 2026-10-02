import { useContext } from 'react';
import { withRouter } from 'react-router-dom';

// component
import BrandLogo from '../BrandLogo';

// icon
import { MdNotificationsNone } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";

// assets/images
import userProfileAvatar from '../../assets/images/user-profile-avatar.jpg';

import AddHabitModalContext from '../../contexts/AddHabitModalContext'

import './index.css';

const HomeTopNavbar = props => {

    const {todayCompletedTasksPercentage} = useContext(AddHabitModalContext)
    
    



    const onClickAvatarBtn = () => {
        const { history } = props

        history.push('/profile')
    }



    return (
    <nav className="top-navbar">
        <div className="top-navbar-brand-logo">
            <BrandLogo />
        </div>

        <div className="top-navbar-left-section">
            <h1 className="top-navbar-title">Today's Flow</h1>
            <p className="top-navbar-subtitle">{todayCompletedTasksPercentage}% COMPLETE</p>
        </div>

        <div className="top-navbar-right-section">
            {/* <MdNotificationsNone className="top-navbar-icon" />
            <MdOutlineSettings className="top-navbar-icon" /> */}

            <button type="button" onClick={onClickAvatarBtn} className="user-profile-avatar-container-button">
                <img className="user-profile-avatar" src={userProfileAvatar} alt="User Profile" />
            </button>
            
        </div>
    </nav>
)
};

export default withRouter(HomeTopNavbar);