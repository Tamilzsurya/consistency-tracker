import { Component } from 'react';

// components
import InputField from '../InputField';
import RegLoaderBtn from '../RegLoaderBtn'

import { registerUser } from '../../services/authService';

// utils
import { validateInputField, validateRegisterForm } from '../../utils/validation/authValidation';

import './index.css'



class RegisterForm extends Component {
    state = {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',

        errors: {},

        submitErrMessage: '',
        successMessage: '',

        isbtnLoading: false
    }




    // input change handlers to update state for each input field
    changeUsernameInputValue = (userName) => {
        this.setState({userName})
    }

    changeEmailInputValue = (email) => {
        this.setState({email})
    }

    changePasswordInputValue = (password) => {
        this.setState({password})
    }

    changeConfirmPasswordInputValue = (confirmPassword) => {
        this.setState({confirmPassword})
    }


    // blur input handler to validate individual fields on blur
    blurInput = (id, value) => {

        const { userName, email, password, confirmPassword } = this.state

        const formData = {
            userName,
            email,
            password,
            confirmPassword
        }

        const errorMessage = validateInputField( id, value, formData)

        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                [id]: errorMessage
            }
        }))
    }


    // form submit handler
    onSubmitUserRegister = async (event) => {
        event.preventDefault()

        const { userName, email, password, confirmPassword } = this.state

        // form data object to validate the entire form
        const formData = {
            userName,
            email,
            password,
            confirmPassword
        }


        // Validate entire form
        const errors = validateRegisterForm(formData)
        if (Object.keys(errors).length > 0) {

            this.setState({
                errors,
                submitErrMessage: ''
            })

            return
        }

        // If no errors, proceed with form submission
        this.setState({
            isbtnLoading: true,
            errors: {},
            submitErrMessage: '',
            successMessage: ''
        })

        // Call the registerUser function from authService.js to send the form data to the backend
        try {

            const data = await registerUser(formData)

            this.setState({
                isbtnLoading: false,
                successMessage: data.message
            })

        } catch (error) {

            this.setState({
                isbtnLoading: false,
                submitErrMessage: error.message
            })

        }
    }

    render() {
        const { userName, email, password, confirmPassword, errors, submitErrMessage, successMessage, isbtnLoading } = this.state

        const inputFieldsData = [
            { id: "userName", label: "Full Name", type: "text", placeholder: "John Doe",  changeInputValue: this.changeUsernameInputValue, value: userName },
            { id: "email", label: "Email", type: "email", placeholder: "hello@example.com", changeInputValue: this.changeEmailInputValue, value: email },
            { id: "password", label: "Password", type: "password", placeholder: "••••••••", changeInputValue: this.changePasswordInputValue, value: password },
            { id: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "••••••••",  changeInputValue: this.changeConfirmPasswordInputValue, value: confirmPassword },
        ];

        return(
            <form className="register-page-form" onSubmit={ this.onSubmitUserRegister}>
                    {
                        inputFieldsData.map(eachField => (
                        <InputField
                            key={eachField.id}
                            eachFieldData={eachField}
                            blurErrMessage= {errors[eachField.id]}
                            blurInput={this.blurInput}
                            
                        />
                        ))
                    }
                    
                    {/* // Submit button and loader visibility based on isbtnLoading state */}
                    {
                        isbtnLoading ? (
                            <RegLoaderBtn className="register-page-form-button" />
                        ) : (
                            <button  className="register-page-form-button" type="submit">Create My Grid</button>
                        )
                    }
                        
                    {/* // Display success or error messages after form submission */}
                    {successMessage && (<p className="form-success-msg">{successMessage}</p>)}
                    {submitErrMessage && (<p className="form-err-msg">{submitErrMessage}</p>)}
                    
                    <p className="register-page-form-description">Your journey starts in less than 30 seconds.</p>
            </form>
        )
    }
}

export default RegisterForm