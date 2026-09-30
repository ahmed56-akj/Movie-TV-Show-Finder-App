import { useFinance } from '../context/finance-context';

export default function BudgetTracker() {
  const { transactions } = useFinance();
  const budgets = [
    { category: 'Food & Groceries', match: 'Food', limit: 20000 },
    { category: 'Rent & Housing', match: 'Rent', limit: 40000 },
    { category: 'Utilities', match: 'Utilities', limit: 10000 },
  ];

  return (
    <div className="bg-slate-800 border border-slate-700/60 rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-bold text-slate-100 mb-4">Monthly Budget Goals</h3>
      <div className="space-y-4">
        {budgets.map((b) => {
          const spent = transactions
            .filter((transaction) => transaction.amount < 0 && transaction.category === b.match)
            .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
          const percentage = Math.min(Math.round((spent / b.limit) * 100), 100);
          const isWarning = percentage >= 85;
          return (
            <div key={b.match}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-300">{b.category}</span>
                <span className="text-slate-400">Rs. {spent} / {b.limit}</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-700">
                <div 
                  className={`h-2.5 rounded-full transition-all duration-500 ${isWarning ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}