import { Component } from 'react';
import { Link } from 'react-router-dom';

// Importing assets
import logo from '../../assets/logo.svg';
import footerlogo from '../../assets/footerlogo.svg';

import LoginForm from '../../components/LoginForm';


import './index.css';

class LoginPage extends Component {
    state = {
        email: '',
        password: '',
    }

    

    render() {
        return (
            <div className="login-page-container">
                <main className="login-page-content">
                    {/* // Welcome Message section */}
                    <div className="login-welcome-message-container">
                        <img src={logo} alt="Logo" className="login-page-logo" />
                        <h1 className="login-page-heading">Consistency</h1>
                        <p className="login-page-description">Your Progress is waiting for you!</p>
                    </div>

                    {/* // Login Form section */}
                    <LoginForm />

                </main>

                {/* // Footer section */}
                <footer className="login-footer-logo-content">
                    <img src={footerlogo} alt="Footer Logo" className="login-content-footer-logo" />
                    <p className="login-content-footer-text">RESUME THE STREAK</p>
                </footer>

            </div>
        )
    }
}


export default LoginPage;