import { Doc } from '@/convex';
import { Id } from '@/convex/_generated/dataModel';
import { render } from '@/test/test-utils';
import React from 'react';

import { TransactionCard } from './TransactionCard';

const makeTransaction = (
  overrides: Omit<Partial<Doc<'transactions'>>, '_id'> & { _id: string }
): Doc<'transactions'> => {
  const { _id, ...rest } = overrides;
  return {
    _id: _id as Id<'transactions'>,
    _creationTime: 0,
    title: 'Transaction',
    amount: '100',
    type: 'IN' as const,
    userId: 'user1',
    ...rest,
  };
};


const MOCK_IN = makeTransaction({
  _id: '1',
  title: 'Salary',
  tags: 'Besoin',
  amount: '2500',
  type: 'IN',
});

const MOCK_OUT = makeTransaction({
  _id: '2',
  title: 'Restaurant',
  tags: 'Plaisir',
  amount: '45.5',
  type: 'OUT',
});

describe('TransactionCard', () => {
  describe('Title and type', () => {
    it('should display "Revenus" title for type IN', () => {
      const { getByText } = render(
        <TransactionCard transactions={[MOCK_IN]} type="IN" />
      );

      expect(getByText('Revenus')).toBeTruthy();
    });

    it('should display "Dépenses" title for type OUT', () => {
      const { getByText } = render(
        <TransactionCard transactions={[MOCK_OUT]} type="OUT" />
      );

      expect(getByText('Dépenses')).toBeTruthy();
    });
  });

  describe('Transaction list', () => {
    it('should display transaction title, tags and formatted amount', () => {
      const { getByText } = render(
        <TransactionCard transactions={[MOCK_IN]} type="IN" />
      );

      expect(getByText('Salary')).toBeTruthy();
      expect(getByText('Besoin')).toBeTruthy();
      expect(getByText(/2[\s\u202f]?500/)).toBeTruthy();
    });

    it('should display multiple transactions', () => {
      const second = makeTransaction({
        _id: '3',
        title: 'Bonus',
        tags: 'Investissement',
        amount: '500',
        type: 'IN',
      });

      const { getByText } = render(
        <TransactionCard transactions={[MOCK_IN, second]} type="IN" />
      );

      expect(getByText('Salary')).toBeTruthy();
      expect(getByText('Bonus')).toBeTruthy();
    });

    it('should display "+" prefix for IN type amounts', () => {
      const { getByText } = render(
        <TransactionCard transactions={[MOCK_IN]} type="IN" />
      );

      expect(getByText(/^\+/)).toBeTruthy();
    });

    it('should display "-" prefix for OUT type amounts', () => {
      const { getByText } = render(
        <TransactionCard transactions={[MOCK_OUT]} type="OUT" />
      );

      expect(getByText(/^-/)).toBeTruthy();
    });
  });

  describe('Empty state', () => {
    it('should display "Aucune transaction" when transactions array is empty', () => {
      const { getByText } = render(
        <TransactionCard transactions={[]} type="IN" />
      );

      expect(getByText('Aucune transaction')).toBeTruthy();
    });
  });

  describe('Optional tags', () => {
    it('should not display badge when tags is undefined', () => {
      const noTags = makeTransaction({
        _id: '4',
        title: 'No tag item',
        tags: undefined,
        amount: '100',
        type: 'IN',
      });

      const { queryByText, getByText } = render(
        <TransactionCard transactions={[noTags]} type="IN" />
      );

      expect(getByText('No tag item')).toBeTruthy();
      expect(queryByText('Besoin')).toBeNull();
      expect(queryByText('Plaisir')).toBeNull();
      expect(queryByText('Investissement')).toBeNull();
    });

    it('should display badge when tags is defined', () => {
      const { getByText } = render(
        <TransactionCard transactions={[MOCK_IN]} type="IN" />
      );

      expect(getByText('Besoin')).toBeTruthy();
    });
  });
});
