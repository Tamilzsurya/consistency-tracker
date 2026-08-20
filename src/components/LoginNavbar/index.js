import {Link} from 'react-router-dom';

import BrandLogo from '../BrandLogo'

import './index.css';

const LoginNavbar = () => {
    console.log('LoginNavbar rendered');

    return (
        <nav className="login-navbar">
            <Link to="/" className="brand-logo-link">
                <BrandLogo />
            </Link>
            <Link to="/login" className="login-link">
                LOGIN
            </Link>
        </nav>
    )
}

export default LoginNavbar;