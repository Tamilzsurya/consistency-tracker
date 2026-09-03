
import './index.css';

const InputField = props => {
    const { eachFieldData, blurErrMessage, blurInput } = props;
    const {id, label, type, placeholder, changeInputValue, value} = eachFieldData;
    const onChangeInputValue = event => changeInputValue(event.target.value);
    const onBlurInput = event => blurInput(id, event.target.value);

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
                onChange={onChangeInputValue}
                onBlur = {onBlurInput}
                value={value}
            />
            {blurErrMessage && (
                <p className='form-err-msg'>
                    {blurErrMessage}
                </p>
            )}
        </div>
    )
}

export default InputField;