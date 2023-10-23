import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import TableCell from './TableCell';

describe('TableCell', () => {
    it('should render Table Cell component', () => {
        const { getByText } = render(<TableCell sortable={false}>Cell text</TableCell>);
        expect(getByText(/Cell text/i)).toBeVisible();
    });

    it('should render Table Cell sortable', () => {
        const { getByText, container } = render(<TableCell sortable={true}>Cell text</TableCell>);  
        expect(container.querySelector('.down-icon')).toBeVisible();  
        act(() => {
            fireEvent.click(getByText(/Cell text/i));
        });
        expect(container.querySelector('.up-icon')).toBeVisible();
    });
})