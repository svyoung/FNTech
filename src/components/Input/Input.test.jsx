import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
    it('should render Input component', () => {
        const onChange = jest.fn();
        render(<Input text="test text" inputType="text" onChange={onChange} error={false} errorMessage={"an error message"}/>);
        expect(screen.getByLabelText('input-field')).toBeVisible();
        expect(screen.queryByText("an error message")).toBeNull();
    });

    it('should render Input on error mode', () => {
        const onChange = jest.fn();
        const { getByText } = render(<Input text="test text" inputType="text" onChange={onChange} error={true} errorMessage={"an error message"} />);
        expect(getByText("an error message")).toBeVisible();
    });

    it('should should call Input onChange', () => {
        const onChange = jest.fn();
        render(<Input text="test text" inputType="text" onChange={onChange} error={false} errorMessage={"an error message"} />);
        const inputField = screen.getByLabelText('input-field');
        fireEvent.change(inputField, { target: { value: 'a value' } });
        expect(onChange).toHaveBeenCalled();
    });

    it('should should call Input onChange on error mode', () => {
        const onChange = jest.fn();
        render(<Input text="test text" inputType="text" onChange={onChange} error={true} errorMessage={"an error message"} />);
        const inputField = screen.getByLabelText('input-field');
        fireEvent.change(inputField, { target: { value: 'a value' } });
        expect(onChange).toHaveBeenCalled();
    });
})