import styled, { keyframes } from 'styled-components';

export const FlexWrapper = styled.div`
    display: flex;
    border-bottom: 1px solid #e9e9e9;
`;

export const TableWrapper = styled.div`
    display: block;
    padding: 20px;
    background-color: #fff;
`;

export const TableCellColumn = styled.div`
    padding: 10px;  
    width: 150px;
    display: table-cell;
    background: #e7edf2;
    font-size: 14px;
    text-transform: uppercase;
    cursor: pointer;
    text-align: center;
`;

export const TableCellColumnSortable = styled.div`
    padding: 5px 10px;
    width: 150px;
    display: table-cell;
    background: #ced5db;
    margin: 0 10px;
    font-size: 14px;
    text-transform: uppercase;
    text-decoration: underline;
    font-weight: 600;
`;

export const TableCellColumnWrapper = styled.div`
    display: flex;
    padding-top: 10px;
    justify-content: space-evenly;
    width: 100%;
    font-weight: 600;
`;

export const EmptyColumn = styled.div`
    width: 100px;
    display: table-cell;
    flex: 1;
`;

export const TableSingleCell = styled.div`
    flex: 1 1 0;
    display: table-cell;
    background: #fff;
    font-size: 14px;
    margin: 0 10px;
    text-align: center;
`;

const expandAnimation = keyframes`
    0% {
        transform: scale(0.95);
    }
    70% {
        transform: scale(1);
    }

    100% {
        transform: scale(0.95);
    }
`;

export const TableRowWrapper = styled.div`
    display: flex;
    padding: 22px 0;
    justify-content: space-evenly;
    width: 100%;
    transition: all 0.1s ease-out;
    &:hover {
        box-shadow: 0px 1px 20px 1px rgba(0, 0, 0, 0.1);
        transform: scale(1.05);
        border-radius: 5px;
        border-bottom: none;
    }
    cursor: pointer
`;

export const EditCell = styled.div`
    width: 100px;
`;

export const ActionCell = styled.div`
    text-align: right;
    padding-right: 10px;
`;

export const TableIconWrapper = styled.div`
    padding-left: 10px;
    display: inline-block;
    margin-top: 2px;
`;