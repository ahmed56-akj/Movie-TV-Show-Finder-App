import { createContext, useContext } from 'react';
import type { Transaction } from './FinanceContext';

export type FinanceContextValue = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: number) => void;
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
};

export const FinanceContext = createContext<FinanceContextValue | undefined>(undefined);

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used inside FinanceProvider');
  }
  return context;
}
