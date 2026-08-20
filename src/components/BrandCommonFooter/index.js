import { Link } from 'react-router-dom';

import './index.css';

const brandCommonFooterLinks = [
    { id: 'privacy', text: 'Privacy', url: '/privacy' },
    { id: 'terms', text: 'Terms', url: '/terms' },
    { id: 'support', text: 'Support', url: '/support' }
]; 

const BrandCommonFooter = () => {
    return (
        <footer className="brand-common-footer">
            <h1 className="brand-common-footer-title">Consistency</h1>

            <ul className="brand-common-footer-links">
                {brandCommonFooterLinks.map(link => (
                    <li className="brand-common-footer-link" key={link.id}>
                        <Link className="brand-common-footer-link-text" to={link.url}>
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>

            <p className="brand-common-footer-link-text">&copy; 2026 Consistency Grid. Engineering Focus.</p>
        </footer>
    )
}

export default BrandCommonFooter;