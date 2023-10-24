import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import TaxAddEdit from './TaxAddEdit';
import { taxDataMock } from '../../mocks/dataMock';
import { getData } from "../../util/utils";

describe('Tax Add/Edit', () => {

    it('should render component', () => {
        const { getAllByRole } = render(<TaxAddEdit />);
        // 2 text inputs
        expect(getAllByRole('textbox').length).toBe(2);
        // 1 number input
        expect(getAllByRole('spinbutton').length).toBe(1);
    });

    it('should validate input fields on Add - name', () => {
        const { getByText, getByLabelText, getAllByLabelText } = render(<TaxAddEdit />);
        const nameField = getAllByLabelText('input-field')[1];
        fireEvent.change(nameField, { target: { value: 'a value' } });
        const addButton = getByLabelText('primary-button');
        fireEvent.click(addButton);
        expect(getByText("Name cannot be empty")).toBeVisible();
    });

    it('should validate input fields on Add - tax ID', () => {
        const { getByText, getByLabelText, getAllByLabelText } = render(<TaxAddEdit />);
        const nameField = getAllByLabelText('input-field')[0];
        fireEvent.change(nameField, { target: { value: 'a value' } });
        const addButton = getByLabelText('primary-button');
        fireEvent.click(addButton);
        expect(getByText("Tax ID cannot be empty")).toBeVisible();
    });

    it('should validate input fields on Add - rate', () => {
        const { getByText, getByLabelText, getAllByLabelText } = render(<TaxAddEdit />);
        const nameField = getAllByLabelText('input-field')[2];
        fireEvent.change(nameField, { target: { value: '0' } });
        const addButton = getByLabelText('primary-button');
        fireEvent.click(addButton);
        expect(getByText("Number must be greater than 0")).toBeVisible();
    });

    it('should add new tax type', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({ name: "AAA", tax_id: "AAA" })
        }));
        const onAddSubmit = jest.fn();
        const { getByText, getByLabelText, getAllByLabelText } = render(<TaxAddEdit onAddSubmit={onAddSubmit} />);
        const nameField = getAllByLabelText('input-field')[0];
        const taxIdField = getAllByLabelText('input-field')[1];
        const rateField = getAllByLabelText('input-field')[2];
        fireEvent.change(nameField, { target: { value: 'AAA' } });
        fireEvent.change(taxIdField, { target: { value: 'AAA' } });
        fireEvent.change(rateField, { target: { value: 4 }});
        const addButton = getByText('Add');
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(onAddSubmit).toHaveBeenCalled();
        });
    });

    it('should fail to add new tax type', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({})
        }));
        const onAddSubmit = jest.fn();
        const { getByText, getByLabelText, getAllByLabelText } = render(<TaxAddEdit onAddSubmit={onAddSubmit} />);
        const nameField = getAllByLabelText('input-field')[0];
        const taxIdField = getAllByLabelText('input-field')[1];
        const rateField = getAllByLabelText('input-field')[2];
        fireEvent.change(nameField, { target: { value: 'AAA' } });
        fireEvent.change(taxIdField, { target: { value: 'AAA' } });
        fireEvent.change(rateField, { target: { value: 4 }});
        const addButton = getByText('Add');
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(onAddSubmit).toHaveBeenCalled();
        });
    });

    it('should edit tax type', async () => {
        const data = {
            id: 44,
            name: "example",
            tax_id: "example",
            rate: 334
        }
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({ name: "AAA", tax_id: "AAA" })
        }));
        const onEditSubmit = jest.fn();
        const { getByText, getAllByLabelText } = render(<TaxAddEdit isEdit={true} data={data} onEditSubmit={onEditSubmit} />);
        const nameField = getAllByLabelText('input-field')[0];
        const taxIdField = getAllByLabelText('input-field')[1];
        const rateField = getAllByLabelText('input-field')[2];
        fireEvent.change(nameField, { target: { value: 'AAA' } });
        fireEvent.change(taxIdField, { target: { value: 'AAA' } });
        fireEvent.change(rateField, { target: { value: 4 }});
        const editButton = getByText('Edit');
        fireEvent.click(editButton);

        await waitFor(() => {
            expect(onEditSubmit).toHaveBeenCalled();
        });
    });

    it('should validate input fields on Edit - name', () => {
        const data = {
            id: 44,
            name: "example",
            tax_id: "example",
            rate: 334
        }
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({ name: "AAA", tax_id: "AAA" })
        }));
        const onEditSubmit = jest.fn();
        const { getByText, getAllByLabelText, getByLabelText } = render(<TaxAddEdit isEdit={true} data={data} onEditSubmit={onEditSubmit} />);
        const nameField = getAllByLabelText('input-field')[0];
        fireEvent.change(nameField, { target: { value: '' } });
        const addButton = getByLabelText('primary-button');
        fireEvent.click(addButton);
        expect(getByText("Name cannot be empty")).toBeVisible();
    });

    it('should validate input fields on Edit - tax ID', () => {
        const data = {
            id: 44,
            name: "example",
            tax_id: "example",
            rate: 334
        }
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({ name: "AAA", tax_id: "AAA" })
        }));
        const onEditSubmit = jest.fn();
        const { getByText, getAllByLabelText, getByLabelText } = render(<TaxAddEdit isEdit={true} data={data} onEditSubmit={onEditSubmit} />);
        const nameField = getAllByLabelText('input-field')[1];
        fireEvent.change(nameField, { target: { value: '' } });
        const addButton = getByLabelText('primary-button');
        fireEvent.click(addButton);
        expect(getByText("Tax ID cannot be empty")).toBeVisible();
    });

    it('should validate input fields on Edit - rate', () => {
        const data = {
            id: 44,
            name: "example",
            tax_id: "example",
            rate: 334
        }
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({ name: "AAA", tax_id: "AAA" })
        }));
        const onEditSubmit = jest.fn();
        const { getByText, getAllByLabelText, getByLabelText } = render(<TaxAddEdit isEdit={true} data={data} onEditSubmit={onEditSubmit} />);
        const nameField = getAllByLabelText('input-field')[2];
        fireEvent.change(nameField, { target: { value: '0' } });
        const addButton = getByLabelText('primary-button');
        fireEvent.click(addButton);
        expect(getByText("Number must be greater than 0")).toBeVisible();
    });
});