import React, { useCallback, useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import Input from '../Input/Input';
import { LabelField } from './TaxAddEditStyles';
import { FlexWrapper } from '../GlobalStyles';
import { addTaxType, editTaxType } from '../../util/utils';

let initValidationError = {
    name: "",
    taxId: "",
    rate: ""
}

const TaxAddEdit = ({ data, isEdit = false, onAddSubmit, onEditSubmit, onModalClose }) => {
    const [actionType, setActionType] = useState(isEdit ? "Edit" : "Add");
    const [name, setName] = useState(isEdit ? data?.name : "");
    const [taxId, setTaxId] = useState(isEdit ? data?.tax_id : "");
    const [rate, setRate] = useState(isEdit ? data?.rate : 1);
    const [validated, setValidated] = useState(initValidationError);
    
    const onAddTaxType = async () => {
        /**
         * Hacky validation due to time limitation
         */
        if (name === "" || taxId === "" || rate < 1) {
            setValidated({
                name: name === "" ? "Name cannot be empty" : "",
                taxId: taxId === "" ? "Tax ID cannot be empty" : "",
                rate:  rate < 1 ? "Number must be greater than 0" : ""
            });
        } else {
            setValidated(initValidationError);
            const addResponse = await addTaxType({
                name,
                tax_id: taxId,
                rate
            });

            // checking if the response object created matches the item
            if (addResponse?.name === name && addResponse?.tax_id === taxId) {
                // success
                onAddSubmit("success");
            } else {
                // error
                onAddSubmit("error");
            }
            closeModal();
        }

    };

    const closeModal = () => {
        onModalClose && onModalClose();
    }

    const onEditTaxType = async () => {
        if (name === "" || taxId === "" || rate < 1) {
            setValidated({
                name: name === "" ? "Name cannot be empty" : "",
                taxId: taxId === "" ? "Tax ID cannot be empty" : "",
                rate:  rate < 1 ? "Number must be greater than 0" : ""
            });
        } else {
            setValidated(initValidationError);
            const editResponse = await editTaxType({
                name,
                tax_id: taxId,
                rate,
                id: data.id
            });

            // checking if the response object created matches the item
            if (editResponse?.name === name && editResponse?.tax_id === taxId) {
                // success
                onEditSubmit("success");
            } else {
                // error
                onEditSubmit("error");
            }
        }
        closeModal();
    }

    return (
            <Modal
                header={`${actionType} Tax Type`}
                onModalClose={closeModal}
                buttons={{primaryClick: (isEdit ? onEditTaxType : onAddTaxType), primaryText: (isEdit? "Edit" : "Add"), secondaryClick: closeModal, secondaryText: "Cancel", warning: false}}
            >
                <FlexWrapper style={{marginBottom: "10px", overflow: "hidden"}}>
                    <LabelField>Name*:</LabelField> 
                    <Input inputType="text" text={name} onChange={(val) => setName(val)} aria-label="name-field" error={validated?.name !== ""} errorMessage={validated?.name} />
                </FlexWrapper>
                <FlexWrapper style={{marginBottom: "10px", overflow: "hidden"}}>
                    <LabelField>Tax ID*:</LabelField> 
                    <Input inputType="text" text={taxId} onChange={(val) => setTaxId(val)} aria-label="taxid-field" error={validated?.taxId !== ""} errorMessage={validated?.taxId} />
                </FlexWrapper>
                <FlexWrapper>
                    <LabelField>Rate*:</LabelField> 
                    <Input inputType="number" onChange={(val) => setRate(val)} text={rate} aria-label="rate-label" error={validated?.rate !== ""} errorMessage={validated?.rate} />
                </FlexWrapper>
            </Modal>
    )
}

export default TaxAddEdit;