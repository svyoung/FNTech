import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AlertWrapper } from "./AlertStyles";
import { CloseButton } from "../GlobalStyles";

const Alert = ({ children, type, onClose }) => {
    const [visible, setVisible] = useState(true);
    const onCloseAction = () => {
        if (visible === true) {
            setVisible(false);
        }
        onClose && onClose();
    };

    useEffect(() => {
        let visibleTimer = setTimeout(() => 
            {
                onCloseAction();
            }, 10000);
        return () => {
            clearTimeout(visibleTimer);
        };
    }, []);

    return (
        <>
            {visible && <AlertWrapper color={type} aria-label="notification-wrapper">
                    <span>{children}</span>
                    <CloseButton
                        onClick={onCloseAction}
                    >
                        <AiOutlineClose size={20} color="gray" />
                    </CloseButton>
                </AlertWrapper>
            }
        </>
    );
}

export default Alert;