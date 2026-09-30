import { withRouter } from 'react-router-dom';

import Cookies from 'js-cookie'


// icons
import { MdOutlineBadge } from "react-icons/md";
import { PiShieldCheckeredFill } from "react-icons/pi";
import { MdLogout } from "react-icons/md";

import {getFormatedMonthAndYear} from "../../utils/dateAndTime/dateOperations"


import './index.css'

const ProfileSuccessView = props => {
    const {userDetails} = props
    const {full_name: fullName, email, created_at: createdAt} = userDetails
    const formatedDate = getFormatedMonthAndYear(createdAt)


    // handlers
    const handleLogout = () => {
        const { history } = props

        Cookies.remove('jwt_token');
        history.replace('/login')

    }



    // UI Render
    const renderPersonalInformationSection = () => {
        const personalInfo = [
            {
                id: 1,
                title: 'Full Name',
                value: fullName
            },
            {
                id: 2,
                title: 'Email Address',
                value: email
            },
            {
                id: 3,
                title: 'Member Since',
                value: formatedDate
            }
        ]

        return (
            <section className="profile-success-view-personal-information-section">
                {/* header */}
                <div className="profile-success-view-personal-information-section-header-container">
                    <div className="profile-success-view-personal-information-section-header-content-container">
                        <MdOutlineBadge className="profile-success-view-personal-information-section-header-content-icon" />
                        <h1 className="profile-success-view-personal-information-section-header-content-title">Personal Information</h1>
                    </div>
                </div>

                {/* content */}
                <div className="profile-success-view-personal-information-section-content-container">
                     
                    <ul className="profile-success-view-personal-information-section-content-ul-container">
                        {
                            personalInfo.map(personalInfoItem => (
                                <li className="profile-success-view-personal-information-section-content-ul-item-container" key={personalInfoItem.id}>
                                    <p className="profile-success-view-personal-information-section-content-ul-item-title">{personalInfoItem.title}</p>
                                    <p className="profile-success-view-personal-information-section-content-ul-item-value">{personalInfoItem.value}</p>
                                </li>
                            ))
                        }
                    </ul>
                     
                </div>
            </section>
        )
    }
    const renderAccountAndSecuritySection = () => {

        return (
            <section className="profile-success-view-personal-information-section">
                {/* header */}
                <div className="profile-success-view-personal-information-section-header-container">
                    <div className="profile-success-view-personal-information-section-header-content-container">
                        <PiShieldCheckeredFill className="profile-success-view-personal-information-section-header-content-icon" />
                        <h1 className="profile-success-view-personal-information-section-header-content-title">Account & Security</h1>
                    </div>
                </div>

                <div className="profile-success-view-account-and-security-section-content-container">

                    <div className="profile-success-view-account-and-security-section-content-title-container">
                        <h2 className="profile-success-view-account-and-security-section-content-title">Sign Out</h2>
                        <p className="profile-success-view-account-and-security-section-content-description">Sign out of your active session on this device.</p>
                    </div>


                    <button type="button" onClick={handleLogout} className="profile-success-view-account-and-security-section-content-sign-out-button">
                        <MdLogout className="profile-success-view-account-and-security-section-content-sign-out-button-icon" />
                        <p className="profile-success-view-account-and-security-section-content-sign-out-button-text">Sign Out</p>
                    </button>
                </div>
            </section>
        )
    }

    return (
        <div className="profile-success-view-bg-container">
            < div className="profile-success-view-content-container">
                <p className='profile-success-view-content-sub-title'>ACCOUNT & SETTINGS</p>
                <h1 className='profile-success-view-content-title'>Profile</h1>
                <p className='profile-success-view-content-description'>Manage your account & settings</p>
            </div>

            {renderPersonalInformationSection()}
            {renderAccountAndSecuritySection()}
        </div>
    )
}


export default withRouter(ProfileSuccessView)