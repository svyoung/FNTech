import React, { useEffect, useState } from 'react';
import {
    TableRowWrapper,
    EditCell,
    ActionCell,
    FlexWrapper
} from './TableStyles';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';
import Modal from '../Modal/Modal';
import TaxAddEdit from '../TaxType/TaxAddEdit';

const TableRow = ({ children, data, onEdit, onDelete, onClose }) => {
    const [hoverActive, setHoverActive] = useState(false);
    const [modalDeleteActive, setModalDeleteActive] = useState(false);
    const [modalEditActive, setModalEditActive] = useState(false);
    const [rowVisible, setRowVisible] = useState(true);

    const deleteAction = (id) => {
        onDelete(id);
        setModalEditActive(false);
        setModalDeleteActive(false);
        setRowVisible(false);
    }

    const onModalClose = () => {
        onClose && onClose();
        setModalEditActive(false);
        setModalDeleteActive(false);
    }

    const editAction = status => {
        onEdit(status);
    }

    return (
        rowVisible &&
        <FlexWrapper
            onMouseEnter={() => setHoverActive(true)}
            onMouseLeave={() => setHoverActive(false)}
            className="table-row-wrapper"
        >
            <TableRowWrapper >
                {children}
                {hoverActive &&                    
                    <EditCell>
                        <ActionCell>
                            <HiPencilAlt
                                size="20"
                                onClick={() => setModalEditActive(true) || (() => {})}
                                style={{ padding: "0 5px"}}
                                className="edit-icon"
                                aria-label="edit-icon"
                            />
                            <HiTrash 
                                size="20"
                                onClick={() => setModalDeleteActive(true)}
                                style={{ padding: "0 5px"}}
                                className="delete-icon"
                                aria-label="delete-icon"
                            />
                        </ActionCell>
                        </EditCell>
                }
            </TableRowWrapper>
            {modalDeleteActive && 
                <Modal 
                    header="Delete tax type" 
                    buttons={{primaryClick: () => deleteAction(data.id), primaryText: "Delete", secondaryClick: onModalClose, secondaryText: "Cancel", warning: true}}
                    onModalClose={onModalClose}
                >
                    {`Are you sure you want to delete ${data.name} tax type?`} 
                </Modal>
            }
            {modalEditActive &&
                <TaxAddEdit data={data} isEdit={true} onEditSubmit={editAction} onModalClose={onModalClose} />
            }
        </FlexWrapper>
    )
};

export default TableRow;