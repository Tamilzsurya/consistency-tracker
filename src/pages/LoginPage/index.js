import { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import google from '../../assets/google.svg';
import footerlogo from '../../assets/footerlogo.svg';
import apple from '../../assets/apple.svg';

import './index.css';

class LoginPage extends Component {
    state = {
        email: '',
        password: '',
    }

    renderEmailField = () => {
        return (
            <>
                <label htmlFor="EMAIL" className="form-label">EMAIL</label>
                <input id="EMAIL" className="form-input" type="email" placeholder="name@example.com" />
            </>
        );
    }

    renderPasswordField = () => {
        return (
            <>
                <div className="password-label-container">
                    <label htmlFor="PASSWORD" className="form-label">PASSWORD</label>
                    <a href="#" className="forgot-password-link">FORGOT?</a>
                </div>
                <input id="PASSWORD" className="form-input" type="password" placeholder="••••••••" />
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

    render() {
        return (
            <div className="login-page-container">
                <main className="login-page-content">
                    <div className="login-welcome-message-container">
                        <img src={logo} alt="Logo" className="login-page-logo" />
                        <h1 className="login-page-heading">Consistency</h1>
                        <p className="login-page-description">Your Progress is waiting for you!</p>
                    </div>

                    <div className="login-options-container">
                        <form className="login-form">

                            <div className="form-input-container">{this.renderEmailField()}</div>
                            <div className="form-input-container">{this.renderPasswordField()}</div>
                            <button type="submit" className="login-button">Sign In</button>
                        </form>
                        <div className="signup-social-container">
                            <p className="signup-text">New here? <Link to="/register" className="signup-link">Start your grid</Link></p>
                            <div className="social-login-container">

                                <div className="social-login-options">
                                    {this.renderGoogleLoginButton()}
                                    {this.renderAppleLoginButton()}
                                </div>
                            </div>
                        </div>

                    </div>

                </main>

                <footer className="login-footer-logo-content">
                    <img src={footerlogo} alt="Footer Logo" className="login-content-footer-logo" />
                    <p className="login-content-footer-text">RESUME THE STREAK</p>
                </footer>

            </div>
        )
    }
}


export default LoginPage;