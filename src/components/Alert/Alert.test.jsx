import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Alert from './Alert';



describe('Alert', () => {
    it('should render Alert component', () => {
        const { getByText } = render(<Alert>An alert message</Alert>);
        expect(getByText("An alert message")).toBeVisible();
    });

    it('should toggle Alert visibility', () => {
        const { getByRole } = render(<Alert>An alert message</Alert>);
        fireEvent.click(getByRole('button'));
        expect(screen.queryByText("An alert message")).toBeNull();
    });

    it('should remove component after 10 seconds', async () => {
        const user = userEvent.setup({ delay: null });
        jest.useFakeTimers();

        render(<Alert>An alert message</Alert>);
        act(() => {
            jest.runAllTimers();
        });
        expect(screen.queryByText("An alert message")).toBeNull();
        jest.useRealTimers();
    });

    it('should close out component', () => {
        const onClose = jest.fn();
        const { getByRole } = render(<Alert onClose={onClose}>An alert message</Alert>);
        fireEvent.click(getByRole('button'));
        expect(onClose).toHaveBeenCalled();
    });
})