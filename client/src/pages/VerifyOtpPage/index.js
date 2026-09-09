import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'

// icons
import { MdMarkEmailRead } from "react-icons/md";
import { MdArrowForward } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";

// components
import logo from '../../assets/logo.svg'
import BrandLogo from '../../components/BrandLogo'
import RegLoaderBtn from '../../components/RegLoaderBtn'
import OtpFields from '../../components/OtpFields'
import InitialBtn from '../../components/InitialBtn'

import { validateOtpForm } from '../../utils/validation/authValidation'
import { verifyOtp } from '../../services/authService'

import './index.css'

const responseConstants = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE'
}
 
const VerifyOtpPage = props => {

    const [otp, setOtp] = useState('');
    const [ apiResponse, setApiResponse] = useState( { 
        error: "", 
        currentStageBtn: responseConstants.initial,
        submitErrorMsg: "",
        submitSuccessMsg: ""
     } );
     
   
    const verificationToken = sessionStorage.getItem('verificationToken');

    // submit otp and verify
    const onSubmitOtp = async event =>{
        event.preventDefault()

        const verificationToken = sessionStorage.getItem('verificationToken');
        const formData = { otp, verificationToken };

        // validate otp
        const error = validateOtpForm( formData );
        if(error) {
            setApiResponse({...apiResponse, error, currentStageBtn: responseConstants.initial});
            return;
        }

        // clear all error messages and set loading state
        setApiResponse({ 
        error: "", 
        currentStageBtn: responseConstants.loading,
        submitErrorMsg: "",
        submitSuccessMsg: ""
     })

     // call verify otp api
     try{
    
        const data = await verifyOtp(formData);

        // set the JWT token to the cookie storage
        const { jwtToken, message } = data
        Cookies.set("jwt_token", jwtToken, {expires: 30})
        
        console.log(`jwtToken: ${jwtToken}`);

        // Redirect to the home page
        const { history } = props
        history.replace("/")

        // remove the verification token from the session storage
        sessionStorage.removeItem('verificationToken');
       
        // set success message
        setApiResponse({...apiResponse, submitSuccessMsg: message, currentStageBtn: responseConstants.success});

     }catch(error) {
        
        setApiResponse({...apiResponse, submitErrorMsg: error.message, currentStageBtn: responseConstants.success});
     }


    }


    // get otp from otp fields
    const onGetOtp = (otp) => {
        console.log(otp);

        if(otp.length === 6) {
           
            setApiResponse({...apiResponse, currentStageBtn: responseConstants.success});
            setOtp(otp);
        }else {
            
            setApiResponse({...apiResponse, currentStageBtn: responseConstants.initial});
        }

    }

    // render current stage button
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

    const moveToLoginPage = () => {
        const { history } = props
        history.replace("/login")
    }

    // redirect to login page if verification token is not present
    if(!verificationToken) {
        return <Redirect to="/login" />
    }
    
    // render verify otp page if verification token is present
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
                        <form className = "verify-otp-page-form" onSubmit= { onSubmitOtp } >

                            <OtpFields length={6} onGetOtp={onGetOtp} />
                            { apiResponse.error && <p className="otp-form-err-msg">{apiResponse.error}</p> }

                            {/* render current stage button based on the response state */
                                renderCurrentStageBtn(apiResponse.currentStageBtn)
                            }


                            
                            { apiResponse.submitErrorMsg && <p className="otp-form-err-msg">{apiResponse.submitErrorMsg}</p> }
                            { apiResponse.submitSuccessMsg && <p className="otp-form-success-msg">{apiResponse.submitSuccessMsg}</p> }

                        </form>

                        {/* Main Resend otp Section */}
                        <section className="verify-otp-page-resend-otp-section">
                            <p className="verify-otp-page-resend-otp-description">Didn't receive the code? <button className="verify-otp-page-resend-otp-button">Resend</button> (0:30)</p>
                            <button className="verify-otp-page-change-email-button" onClick={ moveToLoginPage }>
                                <MdOutlineModeEdit className="verify-otp-page-change-email-icon" /> Change Email
                            </button>
                        </section> 
                </main>
            </div>
        )
}

export default VerifyOtpPage