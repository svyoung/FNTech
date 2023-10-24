import React, { useCallback, useEffect, useState } from 'react';
import TableHeader from '../Table/TableHeader';
import {
    TableSingleCell,
    TableWrapper,
} from '../Table/TableStyles';
import "./table_styles.css";
import { FlexWrapper } from '../GlobalStyles';
import TableRow from '../Table/TableRow';
import { columns } from '../../storage/data';
import { format } from 'date-fns';
import { getData, sortTaxType, deleteTaxType } from "../../util/utils";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AddTaxTypeWrapper, AddTaxTypeSpan, NoResultsWrapper } from './TaxTypeStyles';
import TaxAddEdit from './TaxAddEdit';
import Alert from '../Alert/Alert';
import ReactPaginate from 'react-paginate';

const TaxTypeList = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [taxData, setTaxData] = useState({});
    const [sortOrder, setSortOrder] = useState("-");
    const [addModalActive, setAddModalActive] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const itemsPerPage = 5;

    const fetchTaxData = useCallback(async () => {
        const data = await getData({ pageNum: currentPage+1, perPage: itemsPerPage});
        setTaxData(data);
    });

    useEffect(() => {
        fetchTaxData();
    }, [currentPage]);

    useEffect(() => {
        setTotalPages(Math.ceil(taxData?.total / itemsPerPage));
    }, [taxData]);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const subset = taxData?.data?.slice(startIndex, endIndex);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const onSort = async (fieldname) => {
        const sortResults = await sortTaxType(fieldname, sortOrder, currentPage + 1, itemsPerPage);
        setTaxData(sortResults);
        if (sortOrder === "+") {
            setSortOrder("-");
        } else {
            setSortOrder("+");
        }
    }

    const onDelete = async (id) => {
        await deleteTaxType(id);
        fetchTaxData();
    }

    const onAdd = status => {
        if (status === "success") {
            setAlertVisible(true);
            setAlertType("success");
            setAlertMessage("Successfully added tax type!")
        } else if (status === "error") {
            setAlertVisible(true);
            setAlertType("danger");
            setAlertMessage("Sorry, something went wrong. Please try again later.")
        }
    }

    const onEdit = status => {
        if (status === "success") {
            setAlertVisible(true);
            setAlertType("success");
            setAlertMessage("Successfully edited tax type!")
        } else if (status === "error") {
            setAlertVisible(true);
            setAlertType("danger");
            setAlertMessage("Sorry, something went wrong. Please try again later.")
        }
    }

    const onClose = () => {
        setAddModalActive(false);
    }

    return (
        <>
            <TableWrapper>
                {alertVisible && <Alert type={alertType} onClose={() => setAlertVisible(false)}>{alertMessage}</Alert>}
                <FlexWrapper>
                    <AddTaxTypeWrapper onClick={() => setAddModalActive(true)} aria-label="add-tax-type">
                        <AiOutlinePlusCircle size={15} />&nbsp;<AddTaxTypeSpan>Tax Type
                        </AddTaxTypeSpan>
                    </AddTaxTypeWrapper>
                    <AddTaxTypeSpan>{taxData?.total} Tax Types found</AddTaxTypeSpan>
                </FlexWrapper>
                <FlexWrapper>
                    <TableHeader columns={columns} onSort={onSort} />
                </FlexWrapper>
                <div>
                {taxData?.data?.length > 0 ?
                    <>
                    {taxData?.data?.map(type =>
                        <TableRow
                            onEdit={onEdit}
                            onDelete={onDelete}
                            data={type}
                            key={type.onEdit}
                            onClose={onClose}
                        >
                            <TableSingleCell>{type.id}</TableSingleCell>
                            <TableSingleCell>{format(new Date(type.created * 1000), 'yyyy/M/d H:M:S')}</TableSingleCell>
                            <TableSingleCell>{type.name}</TableSingleCell>
                            <TableSingleCell>{type.rate}</TableSingleCell>
                            <TableSingleCell>{type.tax_id}</TableSingleCell>
                        </TableRow>
                    )}
                    <div className="pagination">
                        <ReactPaginate
                            pageCount={totalPages}
                            onPageChange={handlePageChange}
                            forcePage={currentPage}
                            previousLabel={'<'}
                            nextLabel={'>'}
                        />
                    </div>
                    </>
                    :
                    <NoResultsWrapper>No results found</NoResultsWrapper>
                }
                </div>
                {addModalActive && <TaxAddEdit isEdit={false} onAddSubmit={onAdd} onModalClose={onClose} />}
            </TableWrapper>
        </>
    )
};

export default TaxTypeList;