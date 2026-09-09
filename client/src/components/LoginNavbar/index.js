import {Link} from 'react-router-dom';

import BrandLogo from '../BrandLogo'

import './index.css';

const LoginNavbar = () => {

    return (
        <nav className="login-navbar">
            <Link to="/" className="brand-logo-link">
                <BrandLogo />
            </Link>
            <Link to="/login" className="login-link">
                SIGN IN
            </Link>
        </nav>
    )
}

export default LoginNavbar;