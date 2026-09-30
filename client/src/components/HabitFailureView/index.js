
import consistencyGridFailureStateImg from '../../assets/images/consistency-grid-failure-state-img.jpg'

import './index.css';


const HabitFailureView = props => {
    const {tryAgainApiCall} = props
    const onTryAgain = () => {
        tryAgainApiCall();
    }

    return (
        <div className="habit-failure-view-bg-container">

            <div className="habit-failure-view-content-container">
                <img className="habit-failure-view-content-image" src={consistencyGridFailureStateImg} alt='consistency grid failure state img' />
                <h1 className='habit-failure-view-content-title'>Couldn't load your Data</h1>
                <p className = 'habit-failure-view-content-description'>We couldn't retrieve your data. Please try again.</p>
                <button type='button' className="habit-failure-view-content-button" onClick={onTryAgain}>Try Again</button>
            </div>
            
        </div>
    )
}

export default HabitFailureView