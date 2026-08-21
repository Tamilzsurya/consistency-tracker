import {Link} from 'react-router-dom';


import logo from '../../assets/logo.svg';

import './index.css';

const BrandLogo = () => {
    return (
        <Link to="/" className="brand-logo-link">
            <div className="brand-logo">
                <img className="brand-logo-img" src={logo} alt="Brand Logo" />
                <p className="brand-name">Consistency</p>
            </div>
        </Link>
    )
}

export default BrandLogo;