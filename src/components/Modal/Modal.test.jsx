import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
    it('should render Modal component', () => {
        const onModalClose = jest.fn();
        render(<Modal header="an example title" buttons={[]} onModalClose={onModalClose}><span>A child node</span></Modal>);
        expect(screen.getByText('A child node')).toBeVisible();
    });

    it('should render "close" or hide Modal on click out', () => {
        const { container } = render(<Modal header="an example title" buttons={[]}><span>A child node</span></Modal>);
        fireEvent.click(container.querySelector('.close-out'))
        expect(screen.queryByText("A child node")).toBeNull();
    });
});