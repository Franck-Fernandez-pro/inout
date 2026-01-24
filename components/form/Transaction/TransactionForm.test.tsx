import { Doc } from '@/convex';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { TransactionForm } from './TransactionForm';

// Mock the Button component to avoid Clerk dependencies
jest.mock('@/components', () => ({
  Button: ({
    title,
    onPress,
    testID,
  }: {
    title: string;
    onPress: () => void;
    testID?: string;
  }) => {
    const { TouchableOpacity, Text } = require('react-native');
    return (
      <TouchableOpacity testID={testID} onPress={onPress}>
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  },
}));

// Mock the constants
jest.mock('./TransactionForm.constant', () => ({
  TAGS: ['Besoin', 'Plaisir', 'Investissement'],
  TYPES: ['IN', 'OUT'],
}));

describe('TransactionForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Display all elements correctly', () => {
    it('should display all labels and fields correctly', () => {
      const { getByText, getByTestId } = render(
        <TransactionForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      );

      // Check labels
      expect(getByText('Titre')).toBeTruthy();
      expect(getByText('Tags')).toBeTruthy();
      expect(getByText('Montant (€/$)')).toBeTruthy();
      expect(getByText('Type')).toBeTruthy();

      // Check input fields
      expect(getByTestId('title-input')).toBeTruthy();
      expect(getByTestId('amount-input')).toBeTruthy();

      // Check tag options
      expect(getByText('Besoin')).toBeTruthy();
      expect(getByText('Plaisir')).toBeTruthy();
      expect(getByText('Investissement')).toBeTruthy();

      // Check type options
      expect(getByText('IN')).toBeTruthy();
      expect(getByText('OUT')).toBeTruthy();

      // Check buttons
      expect(getByText('Annuler')).toBeTruthy();
      expect(getByText('Valider')).toBeTruthy();
    });
  });

  describe('Form initialization with initialValues', () => {
    const initialValues: Partial<Doc<'transactions'>> = {
      title: 'Test Transaction',
      tags: 'Plaisir',
      amount: '100.50',
      type: 'OUT',
    };

    it('should initialize form with provided values', () => {
      const { getByTestId } = render(
        <TransactionForm
          initialValues={initialValues}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      // Check that text inputs are initialized
      const titleInput = getByTestId('title-input');
      const amountInput = getByTestId('amount-input');

      expect(titleInput.props.value).toBe('Test Transaction');
      expect(amountInput.props.value).toBe('100.50');
    });

    it('should select correct default options', () => {
      const { getByTestId } = render(
        <TransactionForm
          initialValues={initialValues}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      // Check that correct options are selected
      expect(getByTestId('tag-plaisir')).toBeTruthy();
      expect(getByTestId('type-out')).toBeTruthy();
    });
  });

  describe('Button functionality', () => {
    it('should call onCancel when Cancel button is pressed', () => {
      const { getByTestId } = render(
        <TransactionForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      );

      const cancelButton = getByTestId('cancel-button');
      fireEvent.press(cancelButton);

      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it('should call onSubmit with form data when Submit is pressed', () => {
      const { getByTestId } = render(
        <TransactionForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      );

      // Fill the form
      const titleInput = getByTestId('title-input');
      const amountInput = getByTestId('amount-input');

      fireEvent.changeText(titleInput, 'Test Title');
      fireEvent.changeText(amountInput, '50.00');

      const submitButton = getByTestId('submit-button');
      fireEvent.press(submitButton);

      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Test Title',
        tags: 'Besoin',
        amount: '50.00',
        type: 'IN',
      });
    });
  });

  describe('Selector interactions', () => {
    it('should change tag selection when clicked', () => {
      const { getByTestId } = render(
        <TransactionForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      );

      // Click on "Plaisir"
      const plaisirOption = getByTestId('tag-plaisir');
      fireEvent.press(plaisirOption);

      // Submit and verify "Plaisir" is selected
      const submitButton = getByTestId('submit-button');
      fireEvent.press(submitButton);

      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: '',
        tags: 'Plaisir',
        amount: '',
        type: 'IN',
      });
    });

    it('should change type selection when clicked', () => {
      const { getByTestId } = render(
        <TransactionForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      );

      // Click on "OUT"
      const outOption = getByTestId('type-out');
      fireEvent.press(outOption);

      // Submit and verify "OUT" is selected
      const submitButton = getByTestId('submit-button');
      fireEvent.press(submitButton);

      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: '',
        tags: 'Besoin',
        amount: '',
        type: 'OUT',
      });
    });
  });

  describe('Complete form validation', () => {
    it('should submit all data correctly after modifications', () => {
      const { getByTestId } = render(
        <TransactionForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      );

      // Fill all fields
      fireEvent.changeText(getByTestId('title-input'), 'Restaurant Purchase');
      fireEvent.changeText(getByTestId('amount-input'), '25.99');
      fireEvent.press(getByTestId('tag-plaisir'));
      fireEvent.press(getByTestId('type-out'));

      // Submit
      fireEvent.press(getByTestId('submit-button'));

      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Restaurant Purchase',
        tags: 'Plaisir',
        amount: '25.99',
        type: 'OUT',
      });
    });
  });
});
