import { useState, useRef, useEffect } from "react";

import './index.css'

const OtpFields = ({ length, onGetOtp }) => {

    const [otpValues, setOtpValues] = useState( new Array(length).fill('') );

    const inputRefs = useRef([])

    useEffect(() => {
        console.log(otpValues);
        if( inputRefs.current[0]){
            inputRefs.current[0].focus();
        }

    }, []);

    const handleOtpChange = ( event, index ) =>{
        const value = event.target.value;
        // allow only numbers
        if( isNaN(value) ) return;
        // do not allow the space
        if( value === " " ) return;

        const newOtpValues = [...otpValues];

        // allow only one digit in each input field
        newOtpValues[index] = value.substring(value.length - 1);
        setOtpValues(newOtpValues);

        // onsubmitotp
        
        const compinedOtp = newOtpValues.join('');
        
        onGetOtp(compinedOtp);
        console.log(compinedOtp);

        // Move focus to the next input field if the current field is filled
        if( value && index < length - 1 ){
            inputRefs.current[index + 1].focus();
        }
    }
    const handleOtpClick = ( index ) => {
        inputRefs.current[index].setSelectionRange(1,1);
    }
    const handleOtpKeyDown = (event, index) => {
       
        // Move focus to the backward input field if the current field is empty and backspace is pressed
        if( event.key === 'Backspace' && !otpValues[index] && index > 0){
            inputRefs.current[index - 1].focus();
        }

        // Move focus to the next input field if the current field is filled and right arrow is pressed
        if( event.key === 'ArrowRight' && otpValues[index] && index < length - 1){
            inputRefs.current[index + 1].focus();
        }

        // Move focus to the backward input field if the current field is filled and left arrow is pressed
        if( event.key === 'ArrowLeft' && otpValues[index] && index >= 0){
            
            // Move the cursor to 1st position of the first input field
            if( index === 0 ){
                event.preventDefault();
                    setTimeout(() => {
                    inputRefs.current[index].setSelectionRange(1,1);
                }, 0);
            }else{
                //Move focus to the backward input field if the current field is filled and left arrow is pressed
                inputRefs.current[index - 1].focus();
                setTimeout(() => {
                    inputRefs.current[index - 1].setSelectionRange(1,1);
                }, 0);
            }
        }

    } 

   

    return (
        <div className = "otp-fields-container"> 
            
            {otpValues.map((eachOtpValue, index) => (
                <input 
                    key = {index}
                    type = "text" 
                    className = "otp-field"
                    ref = { element => (inputRefs.current[index] = element)  }
                    value = {eachOtpValue}
                    onChange = { event => handleOtpChange(event, index) }
                    onClick = { event => handleOtpClick(index) }
                    onKeyDown = { event => handleOtpKeyDown(event, index) }
                />
            ))}
        
        </div>
    )
};

export default OtpFields;