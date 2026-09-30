import { useState, useEffect, type ReactNode } from 'react';
import { FinanceContext } from './finance-context';

export type Transaction = {
  id: number;
  text: string;
  amount: number;
  category: string;
  date: string;
};

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('finflow_transactions');
      return saved ? JSON.parse(saved) as Transaction[] : [
      { id: 1, text: 'Monthly Salary', amount: 120000, category: 'Salary', date: '2026-09-01' },
      { id: 2, text: 'Grocery Shopping', amount: -12500, category: 'Food', date: '2026-09-05' },
      { id: 3, text: 'Electricity Bill', amount: -7500, category: 'Utilities', date: '2026-09-10' },
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('finflow_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((current) => [transaction, ...current]);
  };

  const deleteTransaction = (id: number) => {
    setTransactions((current) => current.filter((tx) => tx.id !== id));
  };

  // Calculations
  const totalBalance = transactions.reduce((acc, item) => acc + item.amount, 0);
  const totalIncome = transactions
    .filter((item) => item.amount > 0)
    .reduce((acc, item) => acc + item.amount, 0);
  const totalExpense = transactions
    .filter((item) => item.amount < 0)
    .reduce((acc, item) => acc + Math.abs(item.amount), 0);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        totalBalance,
        totalIncome,
        totalExpense,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

