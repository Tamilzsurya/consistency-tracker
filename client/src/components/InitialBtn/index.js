
import './index.css'

const InitialBtn = props => {
    const { className, content, icon = "" } = props

    return (
        < div id="reg-loader-container" className={`${className}`}>
            <p className="">{content}</p>
        </div>
    )
}

export default InitialBtn