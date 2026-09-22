


import { FaHome } from "react-icons/fa";



// components
import LoginNavbar from '../../components/LoginNavbar'
import BrandCommonFooter from '../../components/BrandCommonFooter'

import './index.css'


const NotFoundPage = props => {

    const redirectToHomePage = () => {
        const { history } = props
        history.replace("/")
    }

    return (
        <div>
            <LoginNavbar />
            <div className="not-found-page-content-bg-container">
                
                <div className="not-found-page-content-container">
                    <h1 className="not-found-page-content-title">404</h1>
                    <h1 className="not-found-page-content-sub-title">Looks like you took a wrong turn.</h1>
                     <p className="not-found-page-content-description">The page you're looking for doesn't exist or may have moved. Your consistency is still right where left it. Please go back to the home.</p>
                    <button type="button" className="not-found-page-content-button" onClick={redirectToHomePage}><FaHome className="not-found-page-content-button-icon" /> Go to Home</button>
                </div>
            </div>
            <BrandCommonFooter />
        </div>
    )

}


export default NotFoundPage