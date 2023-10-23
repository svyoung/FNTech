import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import TableHeader from './TableHeader';
import { columns } from '../../storage/data';

describe('TableHeader', () => {
    it('should render Table Header component', () => {
        const onSort = jest.fn();
        const { getByText } = render(<TableHeader columns={columns} onSort={onSort} />);
        expect(getByText("ID")).toBeVisible();
        expect(getByText("Created Date")).toBeVisible();
        expect(getByText("Rate")).toBeVisible();
    });

    it('should call sort function', () => {
        const onSort = jest.fn();
        const {} = render(<TableHeader columns={columns} onSort={onSort} />); 
        fireEvent.click(document.querySelector('.sortable-col'));
        expect(onSort).toHaveBeenCalled();
    });
})