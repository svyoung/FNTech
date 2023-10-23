import React, { useEffect, useState } from 'react';
import {
    TableCellColumnWrapper
} from './TableStyles';
import { FlexWrapper } from '../GlobalStyles';
import TableCell from './TableCell';


const TableHeader = ({ columns = [], onSort }) => {
    return (
        columns.length > 0 &&
        <FlexWrapper>
            <TableCellColumnWrapper>
                {columns.map(column =>
                column.sortable ? 
                    <div
                        className="sortable-col"
                        key={column.name}
                        onClick={() => onSort(column.name)}
                    >
                        <TableCell
                            sortable={true}
                        >
                        {column.name}
                        </TableCell>
                    </div>
                    
                :
                    <TableCell key={column.name}>
                        {column.name}
                    </TableCell>)}
            </TableCellColumnWrapper>
        </FlexWrapper>
    )
};

export default TableHeader;