import styled from 'styled-components';

export const InputWrapper = styled.div`
    min-width: 25%;
    display: inline-block
    padding: 4px;
`;

export const InputField = styled.input`
    border: .5px solid #ccc;
    outline: 0;
    padding: 10px;
    border-radius: 5px;
    display: inline-block;
    width: 100%;
    width: -moz-available;          
    width: -webkit-fill-available; 
    width: fill-available;
`;

export const InputFieldError = styled.input`
    border: .5px solid red;
    outline: 0;
    padding: 10px;
    border-radius: 5px;
    display: block;
    width: 100%;
    width: -moz-available;          
    width: -webkit-fill-available; 
    width: fill-available;
`;

export const ErrorMessage = styled.span`
    display: inline-block;
    color: red;
    font-size: 11px;
`

