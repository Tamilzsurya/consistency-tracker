import {Link, withRouter} from 'react-router-dom';

import BrandLogo from '../BrandLogo'

import './index.css';

const LoginNavbar = props => {

    const { history } = props;
    const redirectToLoginPage = () => history.replace("/login");
   

    return (
        <nav className="login-navbar">
            <Link to="/" className="brand-logo-link">
                <BrandLogo />
            </Link>
            
            <button className="login-link" onClick = { redirectToLoginPage } >SIGN IN</button>
        </nav>
    )
}

export default withRouter(LoginNavbar);