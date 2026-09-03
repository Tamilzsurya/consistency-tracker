
import Loader from 'react-loader-spinner'

import './index.css'

const RegLoaderBtn = props => {
    const { className } = props

    return (
        <div id="reg-loader-container" className={`${className}`}>
           <Loader type="Oval" className="loader-btn" color="#ffffff" height={20} width={20} />
        </div>
    )
}

export default RegLoaderBtn