import { useState, useEffect, useRef } from 'react'
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

import { validateOtpForm, validateResendOtp } from '../../utils/validation/authValidation'
import { verifyOtp, resendOtp } from '../../services/authService'

import './index.css'

const responseConstants = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE'
}

const buttonStatus = {
    disabled: 'DISABLED',
    ready: 'READY',
    loading: 'LOADING'
}
 
const VerifyOtpPage = props => {

    const [otp, setOtp] = useState('');
    const [ apiResponse, setApiResponse] = useState( { 
        error: "", 
        currentStageBtn: buttonStatus.disabled,
        submitErrorMsg: "",
        submitSuccessMsg: ""
    } );
    const [resendOtpDuration, setResendOtpDuration] = useState(30);
    const timerIdRef = useRef(null);
     
   
    const verificationToken = sessionStorage.getItem('verificationToken');
    const { history } = props


    // reset resend otp duration when component mounts
    useEffect(() =>{

       resetResendOtpDuration();

        return () => clearInterval(timerIdRef.current)
    },  []);


    // reset resend otp duration
    const resetResendOtpDuration = () => {
        setResendOtpDuration(30);

        if(timerIdRef.current) {
            clearInterval(timerIdRef.current);
        }
    
        timerIdRef.current = setInterval( () =>{
            

                setResendOtpDuration(prevState => {
                    if(prevState > 0){
                        return prevState - 1;
                    }
                })
            
        },  1000 )
    }


    // clear timer when resend otp duration is 0
    if(resendOtpDuration === 0) {
        clearInterval(timerIdRef.current);
    }

    const onClickResendOtp = async () => {

        resetResendOtpDuration();

        // call resend otp api
        const formData = { verificationToken }

        // validate the verificationToken is present or not
        const error = validateResendOtp(formData)
        
        if(error) {
            setApiResponse(prevState => ({...prevState, error, currentStageBtn: buttonStatus.disabled}) )
            return;
        }

        // If there is not error then clear all error message and set the loading button
        setApiResponse(
            { 
                error: "", 
                currentStageBtn: buttonStatus.loading,
                submitErrorMsg: "",
                submitSuccessMsg: ""
            }
        )

        // call the resend otp api
        try{
            const data = await resendOtp(formData)
            

            setApiResponse( prevState => ({ ...prevState, submitSuccessMsg: data.message, currentStageBtn: buttonStatus.disabled }) )
        }catch(error){
            setApiResponse( prevState => ({ ...prevState, submitErrorMsg: error.message, currentStageBtn: buttonStatus.disabled }) )
        }

    }








    // submit otp and verify
    const onSubmitOtp = async event =>{
        event.preventDefault()

        const formData = { otp, verificationToken };

        // validate otp
        const error = validateOtpForm( formData );
        if(error) {
            setApiResponse(prevState => ( {...prevState, error, currentStageBtn: buttonStatus.disabled})  );
            return;
        }

        // clear all error messages and set loading state
        setApiResponse({ 
        error: "", 
        currentStageBtn: buttonStatus.loading,
        submitErrorMsg: "",
        submitSuccessMsg: ""
     })

     // call verify otp api
     try{
    
        const data = await verifyOtp(formData);

        // set the JWT token to the cookie storage
        const { jwtToken, message } = data
        Cookies.set("jwt_token", jwtToken, {expires: 7})
        
        
        // set success message
        setApiResponse(prevState => ({...prevState, submitSuccessMsg: message, currentStageBtn: buttonStatus.ready}) );


        // remove the verification token from the session storage
        sessionStorage.removeItem('verificationToken');


        // Redirect to the home page
        history.replace("/")


     }catch(error) {
        
        setApiResponse(prevState => ({...prevState, submitErrorMsg: error.message, currentStageBtn: buttonStatus.disabled}) );
     }


    }

    // get otp from otp fields
    const onGetOtp = (otp) => {
        
        if(otp.length === 6) {
           
            setApiResponse(prevState => ( {...prevState, currentStageBtn: buttonStatus.ready})  );
            setOtp(otp);
        }else {
            
            setApiResponse(prevState => ( {...prevState, currentStageBtn: buttonStatus.disabled})  );
        }

    }

    // render current stage button
    const renderCurrentStageBtn = (currentStageBtn) => {
        switch(currentStageBtn) {
            case buttonStatus.disabled:
                return <InitialBtn className = "verify-otp-page-verify-button" content = {` Verify & Continue`}  />;
            case buttonStatus.loading:
                return <RegLoaderBtn className = "verify-otp-page-verify-button" />;
            case buttonStatus.ready:
                return <button className="verify-otp-page-verify-button" type="submit">
                                Verify & Continue <MdArrowForward />
                            </button>;
            default:
                return null;
        }
    }








    // redirect to login page when change email button is clicked
    const moveToLoginPage = () => {
        sessionStorage.removeItem('verificationToken');
        
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
                            <p className="verify-otp-page-resend-otp-description">Didn't receive the code? <button disabled={ resendOtpDuration !== 0 } onClick={onClickResendOtp} className="verify-otp-page-resend-otp-button">Resend</button> (0:{resendOtpDuration > 9 ? resendOtpDuration : `0${resendOtpDuration}`})</p>
                            <button type='button' className="verify-otp-page-change-email-button" onClick={ moveToLoginPage }>
                                <MdOutlineModeEdit className="verify-otp-page-change-email-icon"  /> Change Email
                            </button>
                        </section> 
                </main>
            </div>
        )
}

export default VerifyOtpPage