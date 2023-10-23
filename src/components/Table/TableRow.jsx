import React, { useEffect, useState } from 'react';
import {
    TableRowWrapper,
    EditCell,
    ActionCell
} from './TableStyles';
import { FlexWrapper } from '../GlobalStyles';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';
import Modal from '../Modal/Modal';

const TableRow = ({ children, data, onEdit, onDelete }) => {
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
        setModalEditActive(false);
        setModalDeleteActive(false);
    }

    const editAction = (id) => {
        // TODO
        onEdit();
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
                <Modal 
                header="Edit tax type" 
                buttons={{primaryClick: () => editAction(data.id), primaryText: "Edit", secondaryClick: onModalClose, secondaryText: "Cancel", warning: false}}
                onModalClose={onModalClose}
            >
                Edit this tax type TBD
            </Modal>
            }
        </FlexWrapper>
    )
};

export default TableRow;