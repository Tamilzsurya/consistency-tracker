
import logo from '../../assets/logo.svg';

import './index.css';

const BrandLogo = () => {
    return (
        <div className="brand-logo">
            <img className="brand-logo-img" src={logo} alt="Brand Logo" />
            <p className="brand-name">Consistency</p>
        </div>
    )
}

export default BrandLogo;