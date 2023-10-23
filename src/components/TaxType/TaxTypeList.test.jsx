import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import TaxTypeList from './TaxTypeList';
import { taxDataMock } from '../../mocks/dataMock';
import { getData } from "../../util/utils";

jest.mock('../../util/utils');

describe('Tax Type List', () => {
    beforeEach(() => {
        getData.mockResolvedValue(taxDataMock);
    })

    it('should render component', () => {
        const { getByText } = render(<TaxTypeList />);
        expect(getByText(/Tax Types Found/i)).toBeVisible();
        expect(getByText(/Tax ID/i)).toBeVisible();
        expect(getByText(/Created Date/i)).toBeVisible();
    });

    it('should display tax types', async () => {
        await act(() => {
            render(<TaxTypeList />);
        })
        expect(await screen.getAllByText(/Sales/i)).toBeTruthy();
        expect(await screen.getAllByText(/Grat/i)).toBeTruthy();
    });

    it('should delete', async () => {
        await act(() => {
            render(<TaxTypeList />);     
        });
        fireEvent.mouseOver(screen.getByText(/Sales/i));
        fireEvent.click(screen.getByLabelText('delete-icon'));
        fireEvent.click(screen.getByLabelText('primary-button'))
        expect(screen.queryByText(/Sales/i)).toBeNull();
    });

    it('should fail to add', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({ name: "AAA", tax_id: "AAA" })
        }));
        await act(() => {
            render(<TaxTypeList />);     
        });
        const addTaxTypeButton = screen.getByLabelText("add-tax-type");
        fireEvent.click(addTaxTypeButton);
        const nameField = screen.getAllByLabelText('input-field')[0];
        fireEvent.change(nameField, { target: { value: 'BBB' } });
        const taxIdField = screen.getAllByLabelText('input-field')[1];
        fireEvent.change(taxIdField, { target: { value: 'BBB' } });
        const rateField = screen.getAllByLabelText('input-field')[2];
        fireEvent.change(rateField, { target: { value: '3' } });

        const addButton = screen.getByLabelText('primary-button');
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(screen.getByLabelText('notification-wrapper')).toBeVisible();
        })
    });

    // it('should sort', async () => {
    //     await act(() => {
    //         render(<TaxTypeList />);
    //     })
    //     await act(() => {
    //         fireEvent.click(document.querySelector('.sortable-col'));
    //     })
    //     getData.mockResolvedValue(taxDataMock.data.reverse());
    //     screen.debug();
    //     expect(await screen.getAllByText(/Sales/i)).toBeTruthy();
    //     expect(await screen.getAllByText(/Grat/i)).toBeTruthy();
    // });
})