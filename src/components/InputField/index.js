
import './index.css';

const InputField = props => {
    const { eachFieldData } = props;
    const {id, label, type, placeholder} = eachFieldData;

    return (
        <div className="input-field-container">
            <label className="input-field-label" htmlFor={id}>
                {label}
            </label>
            <input
                className="input-field"
                id={id}
                type={type}
                placeholder={placeholder}
            />
        </div>
    )
}

export default InputField;