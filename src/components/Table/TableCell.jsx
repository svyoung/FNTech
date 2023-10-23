import React, { useEffect, useState } from 'react';
import {
    TableCellColumn,
    TableIconWrapper,
} from './TableStyles';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';

const TableCell = ({ children, sortable }) => {
    const [sortUp, setSortUp] = useState(false);

    return (
        <>
            <TableCellColumn onClick={() => setSortUp(!sortUp)}>
                {children}
                {sortable ? sortUp ? 
                            <TableIconWrapper className="up-icon">
                                <BiSolidUpArrow />
                            </TableIconWrapper> : 
                            <TableIconWrapper className="down-icon">
                                <BiSolidDownArrow />
                            </TableIconWrapper>
                    : ''}
            </TableCellColumn>
        </>
    )
};

export default TableCell;