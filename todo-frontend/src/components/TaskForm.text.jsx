import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskForm from './TaskForm';

let consoleErrorMock;

beforeEach(() => {
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    consoleErrorMock.mockRestore();
});

describe('TaskForm', () => {
    test('renders the form with an input and an "Add Task" button', () => {
        const mockOnSubmit = jest.fn();
        render(<TaskForm onSubmit={mockOnSubmit} />);

        expect(screen.getByLabelText(/task/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
    });

    test('allows user to type in the task input', () => {
        const mockOnSubmit = jest.fn();
        render(<TaskForm onSubmit={mockOnSubmit} />);
        const inputElement = screen.getByLabelText(/task/i);

        fireEvent.change(inputElement, { target: { value: 'New Test Task' } });
        expect(inputElement.value).toBe('New Test Task');
    });

    test('calls onSubmit with the task text when form is submitted', () => {
        const mockOnSubmit = jest.fn();
        render(<TaskForm onSubmit={mockOnSubmit} />);
        const inputElement = screen.getByLabelText(/task/i);
        const addButton = screen.getByRole('button', { name: /add task/i });

        fireEvent.change(inputElement, { target: { value: 'Submit Test Task' } });
        fireEvent.click(addButton);

        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith('Submit Test Task');
        expect(inputElement.value).toBe('');
    });

    test('displays "Update Task" button and initial text when initialText prop is provided', () => {
        const mockOnSubmit = jest.fn();
        const initialText = 'Existing Task';
        render(<TaskForm onSubmit={mockOnSubmit} initialText={initialText} />);

        expect(screen.getByLabelText(/task/i).value).toBe(initialText);
        expect(screen.getByRole('button', { name: /update task/i })).toBeInTheDocument();
    });

    test('calls onCancel when cancel button is clicked (if onCancel is provided)', () => {
        const mockOnSubmit = jest.fn();
        const mockOnCancel = jest.fn();
        render(<TaskForm onSubmit={mockOnSubmit} initialText="Edit Task" onCancel={mockOnCancel} />);

        const cancelButton = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(cancelButton);

        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    test('does not render cancel button if onCancel prop is not provided', () => {
        const mockOnSubmit = jest.fn();
        render(<TaskForm onSubmit={mockOnSubmit} initialText="Edit Task Without Cancel" />);

        expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument();
    });
});
