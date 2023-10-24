import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import TableRow from './TableRow';

describe('TableRow', () => {
    it('should render Table Row component', () => {
        const onDelete = jest.fn();
        const { getByText, container } = render(<TableRow onDelete={onDelete} data={[]}><span>a child node</span></TableRow>);
        expect(getByText("a child node")).toBeVisible();
        expect(container.querySelector('.edit-icon')).toBeNull();
        expect(container.querySelector('.delete-icon')).toBeNull();
    });

    it('should render action icons on hover', () => {
        const onDelete = jest.fn();
        const { container } = render(<TableRow onDelete={onDelete} data={[]}><span>a child node</span></TableRow>);
        fireEvent.mouseOver(container.querySelector('.table-row-wrapper'));
        expect(container.querySelector('.edit-icon')).toBeVisible();
        expect(container.querySelector('.delete-icon')).toBeVisible();
        fireEvent.mouseOut(container.querySelector('.table-row-wrapper'));
        expect(container.querySelector('.edit-icon')).toBeNull();
        expect(container.querySelector('.delete-icon')).toBeNull();
    });

    it('should call delete', () => {
        const onDelete = jest.fn();
        const { container } = render(<TableRow onDelete={onDelete} data={{id: 1, name: "test type"}}><span>a child node</span></TableRow>);
        fireEvent.mouseOver(container.querySelector('.table-row-wrapper'));
        fireEvent.click(container.querySelector('.delete-icon'));
        fireEvent.click(container.querySelector('.primary-button'));
        expect(onDelete).toHaveBeenCalled();
    });

    it('should call edit', async () => {
        const data = {
            id: 44,
            name: "example",
            tax_id: "example",
            rate: 334
        }
        const onDelete = jest.fn();
        const onEdit = jest.fn();
        const { container, getByLabelText, getAllByLabelText } = render(<TableRow data={data} onDelete={onDelete} onEdit={onEdit}><span>a child node</span></TableRow>);
        fireEvent.mouseOver(container.querySelector('.table-row-wrapper'));
        fireEvent.click(container.querySelector('.edit-icon'));

        const nameField = getAllByLabelText('input-field')[0];
        const taxIdField = getAllByLabelText('input-field')[1];
        const rateField = getAllByLabelText('input-field')[2];
        fireEvent.change(nameField, { target: { value: 'AAA' } });
        fireEvent.change(taxIdField, { target: { value: 'AAA' } });
        fireEvent.change(rateField, { target: { value: 4 }});
        fireEvent.click(getByLabelText('primary-button'));
        await waitFor(() => {
            expect(onEdit).toHaveBeenCalled();
        });
    });

    it('should close Modal', () => {
        const onDelete = jest.fn();
        const onEdit = jest.fn();
        const onClose = jest.fn();
        const { container } = render(<TableRow onClose={onClose} onDelete={onDelete} onEdit={onEdit} data={{id: 1, name: "test type"}}><span>a child node</span></TableRow>);
        fireEvent.mouseOver(container.querySelector('.table-row-wrapper'));
        fireEvent.click(container.querySelector('.delete-icon'));
        fireEvent.click(container.querySelector('.secondary-button'));
        expect(container.querySelector('.secondary-button')).toBeNull;
        expect(onClose).toHaveBeenCalled();
    });
})