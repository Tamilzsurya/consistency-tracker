
import Loader from 'react-loader-spinner'

import './index.css';

const PopupLoadingModal = props => {
    return (
        <div className="popup-loading-bg-container">
            <div className="popup-loading-content-container">
                <div className="popup-loading-content-loader-container">
                   <Loader className="habit-loading-view-container-loader" type="Oval" color="#3525CD" height={60} width={60} />  
                </div>
                <p className="popup-loading-content-para">Loading...</p>
            </div>
        </div>
    )
}

export default PopupLoadingModal