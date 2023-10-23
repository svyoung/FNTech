import React, { useCallback, useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import Input from '../Input/Input';
import { LabelField } from './TaxAddEditStyles';
import { FlexWrapper } from '../GlobalStyles';
import { addTaxType } from '../../util/utils';

let initValidationError = {
    name: "",
    taxId: "",
    rate: ""
}

const TaxAddEdit = ({ data, isEdit = false, onAddSubmit }) => {
    const [name, setName] = useState("");
    const [taxId, setTaxId] = useState("");
    const [rate, setRate] = useState(1);
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
        }
    };

    const onEditTaxType = () => {
        // TODO
    }

    return (
            <Modal
                header="Add Tax Type"
                onModalClose={onAddSubmit}
                buttons={{primaryClick: onAddTaxType, primaryText: "Add", secondaryClick: onAddSubmit, secondaryText: "Cancel", warning: false}}
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