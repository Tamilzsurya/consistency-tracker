import { useState } from 'react'

import { MdMarkEmailRead } from "react-icons/md";
import { MdArrowForward } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";

import logo from '../../assets/logo.svg'
import BrandLogo from '../../components/BrandLogo'
import RegLoaderBtn from '../../components/RegLoaderBtn'
import OtpFields from '../../components/OtpFields'
import InitialBtn from '../../components/InitialBtn'

import './index.css'

const responseConstants = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE'
}
 
const VerifyOtpPage = () => {

    const [otp, setOtp] = useState('');
    const [ currentStageBtn, setCurrentStageBtn] = useState(responseConstants.initial);

    const onSubmitOtp = (otp) => {
        console.log(otp);

        if(otp.length === 6) {
            setCurrentStageBtn(responseConstants.success);
            setOtp(otp);
        }else {
            setCurrentStageBtn(responseConstants.initial);
        }

    }

    const renderCurrentStageBtn = (currentStageBtn) => {
        switch(currentStageBtn) {
            case responseConstants.initial:
                return <InitialBtn className = "verify-otp-page-verify-button" content = {` Verify & Continue`} icon = "MdArrowForward" />;
            case responseConstants.loading:
                return <RegLoaderBtn className = "verify-otp-page-verify-button" />;
            case responseConstants.success:
                return <button className="verify-otp-page-verify-button" type="submit">
                                Verify & Continue <MdArrowForward />
                            </button>;
            default:
                return null;
        }
    }

    return (
            <div className = "verify-otp-page-bg-container">

                {/* Header Section */}
                <header className="verify-otp-page-header">
                    <h1 className = "verify-otp-page-header-heading">Consistency</h1>
                </header>

                {/* Main Section */}
                <main className ="verify-otp-page-main">
                        {/* Main content Section */}
                        <section className = "verify-otp-page-main-header-section">
                            <div className = "verify-otp-page-mail-icon-container">
                                <MdMarkEmailRead className = "verify-otp-page-mail-icon" />
                            </div>
                            <h1 className = "verify-otp-page-main-heading">Verify your email</h1>
                            <p className = "verify-otp-page-main-description">We've sent a 6-digit code to your email. Enter it below to continue.</p>
                        </section>

                        {/* Main Form Section */}
                        <form className = "verify-otp-page-form" >

                            <OtpFields length={6} onSubmitOtp={onSubmitOtp} />
                            {/* render current stage button based on the response state */
                                renderCurrentStageBtn(currentStageBtn)
                            }

                        </form>

                        {/* Main Resend otp Section */}
                        <section className="verify-otp-page-resend-otp-section">
                            <p className="verify-otp-page-resend-otp-description">Didn't receive the code? <button className="verify-otp-page-resend-otp-button">Resend</button> (0:30)</p>
                            <button className="verify-otp-page-change-email-button">
                                <MdOutlineModeEdit className="verify-otp-page-change-email-icon" /> Change Email
                            </button>
                        </section> 
                </main>
            </div>
        )
}

export default VerifyOtpPage