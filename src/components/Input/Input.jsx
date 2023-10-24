import React, { useState, useRef, useEffect } from "react";
import { InputField, InputFieldError, ErrorMessage } from "../Input/InputStyles";

const Input = ({ text, inputType, onChange, placeholder, disabled = false, error, errorMessage }) => {
    return (
        <>
            <div style={{ flex: "1" }}>
            {error ?
                <>
                    <InputFieldError type={inputType} onChange={(e) => onChange(e.target.value)} value={text} placeholder={placeholder || ""} aria-label="input-field"/>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                </>   
                :
                <InputField type={inputType} onChange={(e) => onChange(e.target.value)} value={text} placeholder={placeholder || ""} aria-label="input-field" disabled={disabled} />
            }
            </div>
            
            
        </>
    );
}
export default Input;