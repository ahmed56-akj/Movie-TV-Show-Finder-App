import { Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import type { Transaction } from '../context/FinanceContext';

type TransactionListProps = {
  transactions: Transaction[];
  onDelete: (id: number) => void;
};

export default function TransactionList({ transactions, onDelete }: TransactionListProps) {
  return (
    <div className="bg-slate-800 border border-slate-700/60 rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-bold text-slate-100 mb-4">Recent Transactions</h3>
      {transactions.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-6">No transactions recorded yet.</p>
      ) : (
        <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3.5 bg-slate-900/60 border border-slate-700/50 rounded-xl hover:border-slate-600 transition">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${tx.amount > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {tx.amount > 0 ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">{tx.text}</h4>
                  <span className="text-xs text-slate-400">{tx.category} • {tx.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-sm font-bold ${tx.amount > 0 ? 'text-emerald-400' : 'text-slate-100'}`}>
                  {tx.amount > 0 ? `+Rs. ${tx.amount}` : `-Rs. ${Math.abs(tx.amount)}`}
                </span>
                <button 
                  onClick={() => onDelete(tx.id)}
                  className="text-slate-500 hover:text-rose-400 transition p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}