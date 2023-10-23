import React, { useState } from 'react';
import { ModalWrapper, ModalCloseButton, ModalBody, ModalHeader, ModalContent, ModalActionButtonPrimary, ModalActionButtonSecondary, ModalActionWrapper, ModalActionButtonWarning } from './ModalStyles';
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ header, children, buttons, onModalClose }) => {
    const [visible, setVisible] = useState(true);

    const onClose = () => {
        setVisible(false);
    }
    return (
        <>
            {visible && 
            <>
            <ModalWrapper>
                <ModalBody>
                    <ModalCloseButton onClick={onModalClose || onClose} aria-label="close-out" className="close-out">
                        <AiOutlineClose size={18} color="gray" />
                    </ModalCloseButton>
                    <ModalHeader>{header}</ModalHeader>
                    <ModalContent>
                        {children}
                    </ModalContent>
                    <ModalActionWrapper>
                        {typeof buttons?.secondaryClick === "function" ? <ModalActionButtonSecondary className="secondary-button" onClick={buttons.secondaryClick} aria-label="secondary-button">
                            {buttons.secondaryText}
                        </ModalActionButtonSecondary>
                        : <ModalActionButtonSecondary className="secondary-button" onClick={onClose} aria-label="secondary-button">Cancel</ModalActionButtonSecondary>
                        }
                        {typeof buttons?.primaryClick === "function" ?
                            buttons.warning ? <ModalActionButtonWarning className="primary-button" onClick={buttons.primaryClick} aria-label="primary-button">{buttons.primaryText}</ModalActionButtonWarning>
                        :
                        <ModalActionButtonPrimary className="primary-button" onClick={buttons.primaryClick}aria-label="primary-button">
                            {buttons.primaryText}
                        </ModalActionButtonPrimary>: ''}
                    </ModalActionWrapper>
                </ModalBody>
            </ModalWrapper>
            </>
            }
        </>
    )
}

export default Modal;