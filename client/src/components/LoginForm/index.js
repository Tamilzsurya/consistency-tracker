import { Component } from "react";
import { Link, withRouter } from "react-router-dom";

// components
import RegLoaderBtn from '../RegLoaderBtn';

// utils
import { validateInputField, validateLoginForm } from '../../utils/validation/authValidation';
import { loginUser } from '../../services/authService';

import './index.css';

// Importing assets
import google from '../../assets/google.svg';
import apple from '../../assets/apple.svg';

class LoginForm extends Component {
    state = {
        email: '',
        password: '',

        error: {},

        isbtnLoading: false,

        submitErrMessage: '',
        successMessage: ''
    }


    // handle form submit
    handleSubmit = async (event) => {
        event.preventDefault();

        const { history } = this.props

        const { email, password } = this.state;
        const formData = { email, password };

        const errors = validateLoginForm(formData);

        // Validate entire form
        if (Object.keys(errors).length > 0) {
            this.setState({ error: errors });
            
            return;
        }

        // if no errors, clear the error messages
        this.setState({
            isbtnLoading: true,
            submitErrMessage: '',
            successMessage: '',
            error: {}
        })

        // call login api
        try{

            const data = await loginUser( formData );

            const { verificationToken } = data

            this.setState({
                isbtnLoading: false,
                submitErrMessage: '',
                successMessage: data.message,
                error: {},

                email: '',
                password: ''
            })


            sessionStorage.setItem('verificationToken', verificationToken, {} )

            history.replace('/verify-otp')


        }catch(error){

            this.setState({
                isbtnLoading: false,
                submitErrMessage: error.message,
                successMessage: '',
                error: {}
            })
        } 

    }
    
    // handle input change for email and password fields
    handleInputChange = (event) => {
        const { id, value } = event.target;
        
        this.setState({ [id]: value });
    }

    // handel blur event for email and password fields
    handleInputBlur = (event) => {
        const { id, value } = event.target;
        const {email, password} = this.state

        const formData = {email, password};

        const errorMessage = validateInputField(id, value, formData);
        
        this.setState(prevState => ({
            error: {
                ...prevState.error,
                [id]: errorMessage
            }
        }));
    }

    // Render Input Fields
    renderEmailField = () => {
        const { error } = this.state;
        const emailError = error.email;

        return (
            <>
                <label htmlFor="email" className="form-label">EMAIL</label>
                <input id="email"  className="form-input" type="email" placeholder="name@example.com" onChange={this.handleInputChange} onBlur={this.handleInputBlur} />
                {emailError && <p className="form-err-msg">{emailError}</p>}
            </>
        );
    }

    renderPasswordField = () => {
        const { error } = this.state;
        const passwordError = error.password;

        return (
            <>
                <div className="password-label-container">
                    <label htmlFor="password" className="form-label">PASSWORD</label>
                    <a href="#" className="forgot-password-link">FORGOT?</a>
                </div>
                <input id="password" className="form-input" type="password" placeholder="••••••••" onChange={this.handleInputChange} onBlur={this.handleInputBlur} />
                {passwordError && <p className="form-err-msg">{passwordError}</p>}
            </>

        )
    }

    renderGoogleLoginButton = () => {
        return (
            <button className="social-login-button">
                <div className="social-login-btn-content">
                    <img src={google} alt="Google" className="social-login-icon" />
                    <p>Google</p>
                </div>
            </button>
        )
    }

    renderAppleLoginButton = () => {
        return (
            <button className="social-login-button">
                <div className="social-login-btn-content">
                    <img src={apple} alt="Apple" className="social-login-icon" />
                    <p>Apple</p>
                </div>
            </button>
        )
    }

    // Redirect to register page when register button is clicked
    redirectToRegisterPage = () => {
        const { history } = this.props
        history.replace('/register')
    }

    render() {
        const { isbtnLoading, successMessage, submitErrMessage } = this.state


        return (
            <div className="login-options-container">
                        
                        <form className="login-form" onSubmit={this.handleSubmit}>
                            <div className="form-input-container">{this.renderEmailField()}</div>
                            <div className="form-input-container">{this.renderPasswordField()}</div>
                            
                            { // show button based on the state
                                isbtnLoading ? 
                                            (  <RegLoaderBtn className = "login-button" />) : 
                                            ( <button type="submit" className="login-button">Sign In</button> )
                            }

                            {submitErrMessage && <p className="form-err-msg">{submitErrMessage}</p>}
                            {successMessage && <p className="form-err-msg">{successMessage}</p>}
                            
                        </form>

                        {/* Social Login Options */}
                        <div className="signup-social-container">
                            <p className="signup-text">New here? <button type="button" className="signup-link-btn" onClick={ this.redirectToRegisterPage } >Start your grid</button></p>
                            <div className="social-login-container">

                                <div className="social-login-options">
                                    {this.renderGoogleLoginButton()}
                                    {this.renderAppleLoginButton()}
                                </div>
                            </div>
                        </div>

            </div>
        )
    }
}


export default withRouter(LoginForm);
