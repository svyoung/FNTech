import styled from 'styled-components';

export const ModalWrapper = styled.div`
    position: fixed;
    min-width: 400px;
    max-width: 600px;
    top: 30%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    box-shadow: 0 0 20px 1px rgb(0, 0, 0, 0.2);
    border-radius: 10px;
`;

export const ModalBody = styled.div`
    position: relative;
    padding: 20px;
`;

export const ModalContent = styled.div`
    padding: 20px 0;
    font-size: 14px;
`;

export const ModalCloseButton = styled.button`
    background: none;
    outline: 0;
    border: 0;
    display: inline-block;
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer
`;

export const ModalHeader = styled.div`
    font-size: 18px;
    text-align: left;
    font-weight: 700;
`;

export const ModalActionWrapper = styled.div`
    display: flex;
    margin-top: 10px;
`

export const ModalActionButtonPrimary = styled.button`
    outline: 0;
    border: 0;
    display: inline-block;
    background: #2787db;
    padding: 7px 20px;
    color: #fff;
    font-weight: 800;
    font-size: 16px;
    border-radius: 7px;
    margin-left: auto;
    cursor: pointer;
`;

export const ModalActionButtonSecondary = styled.button`
    outline: 0;
    border: 0;
    display: inline-block;
    background: #aaa;
    padding: 7px 20px;
    color: #fff;
    font-weight: 800;
    font-size: 16px;
    border-radius: 7px;
    cursor: pointer;
`;

export const ModalActionButtonWarning = styled.button`
    outline: 0;
    border: 0;
    display: inline-block;
    background: #ff4949;
    padding: 7px 20px;
    color: #fff;
    font-weight: 800;
    font-size: 16px;
    border-radius: 7px;
    cursor: pointer;
    margin-left: auto;
`;