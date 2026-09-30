import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useFinance } from '../context/finance-context';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart() {
  const { transactions } = useFinance();
  const expensesByCategory = transactions.reduce<Record<string, number>>((totals, transaction) => {
    if (transaction.amount < 0) {
      totals[transaction.category] = (totals[transaction.category] ?? 0) + Math.abs(transaction.amount);
    }
    return totals;
  }, {});
  const labels = Object.keys(expensesByCategory);
  const data = {
    labels: labels.length ? labels : ['No expenses'],
    datasets: [
      {
        data: labels.length ? Object.values(expensesByCategory) : [1],
        backgroundColor: ['#10B981', '#38BDF8', '#F59E0B', '#F43F5E'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#94A3B8',
          font: { size: 12 },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-slate-800 border border-slate-700/60 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
      <h3 className="text-lg font-bold text-slate-100 mb-2">Expense Breakdown</h3>
      <div className="h-64 relative flex items-center justify-center">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}