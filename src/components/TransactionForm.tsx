import { useState, type FormEvent } from 'react';
import { PlusCircle } from 'lucide-react';
import type { Transaction } from '../context/FinanceContext';

export default function TransactionForm({ onAddTransaction }: { onAddTransaction: (transaction: Transaction) => void }) {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [type, setType] = useState('expense');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numericAmount = Number(amount);
    if (!text.trim() || !amount || !Number.isFinite(numericAmount) || numericAmount <= 0) return;

    const newTransaction = {
      id: Date.now(),
      text,
      amount: type === 'expense' ? -numericAmount : numericAmount,
      category,
      date: new Date().toISOString().split('T')[0],
    };

    onAddTransaction(newTransaction);
    setText('');
    setAmount('');
  };

  return (
    <div className="bg-slate-800 border border-slate-700/60 rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-bold text-slate-100 mb-4">Add New Transaction</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${type === 'expense' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-700 text-slate-400'}`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${type === 'income' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-700 text-slate-400'}`}
          >
            Income
          </button>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. Grocery, Salary..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Amount (PKR)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Food">Food & Drinks</option>
            <option value="Rent">Rent & Housing</option>
            <option value="Utilities">Utilities & Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Salary">Salary & Income</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
        >
          <PlusCircle className="w-5 h-5" /> Add Transaction
        </button>
      </form>
    </div>
  );
}