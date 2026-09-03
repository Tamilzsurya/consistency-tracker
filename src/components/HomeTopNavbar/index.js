import { useState } from 'react';

import BrandLogo from '../BrandLogo';

import { MdNotificationsNone } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";

import userProfileAvatar from '../../assets/images/user-profile-avatar.jpg';

import './index.css';

const HomeTopNavbar = () => (
    <div className="top-navbar">
        <div className="top-navbar-brand-logo">
            <BrandLogo />
        </div>

        <div className="top-navbar-left-section">
            <h1 className="top-navbar-title">Today's Flow</h1>
            <p className="top-navbar-subtitle">85% COMPLETE</p>
        </div>

        <div className="top-navbar-right-section">
            <MdNotificationsNone className="top-navbar-icon" />
            <MdOutlineSettings className="top-navbar-icon" />
            <img className="user-profile-avatar" src={userProfileAvatar} alt="User Profile" />
        </div>
    </div>
);

export default HomeTopNavbar;