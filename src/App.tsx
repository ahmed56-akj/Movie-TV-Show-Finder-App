import { useState } from 'react';
import { FinanceProvider } from './context/FinanceContext';
import { useFinance } from './context/finance-context';
import { formatCurrency } from './utils/formatters';
import AuthPage, { type AuthUser } from './components/AuthPage';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';
import BudgetTracker from './components/BudgetTracker';

import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

function DashboardContent({ user, onLogout }: { user: AuthUser; onLogout: () => void }) {
  const { transactions, addTransaction, deleteTransaction, totalBalance, totalIncome, totalExpense } = useFinance();

  const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100) : 0;

  return (
    <div className="flex bg-slate-950 min-h-screen text-slate-100 font-sans">
      <Sidebar onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar userName={user.name} />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
          {/* Welcome Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Welcome back, {user.name}! 👋</h1>
              <p className="text-sm text-slate-400 mt-1">Here is your financial overview and monthly analytics.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-xl">
                Active Session
              </span>
            </div>
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Total Balance" 
              amount={formatCurrency(totalBalance)} 
              icon={Wallet} 
              trend="+12.5%" 
              trendUp={true} 
            />
            <StatCard 
              title="Monthly Income" 
              amount={formatCurrency(totalIncome)} 
              icon={TrendingUp} 
              trend="+4.2%" 
              trendUp={true} 
            />
            <StatCard 
              title="Total Expenses" 
              amount={formatCurrency(totalExpense)} 
              icon={TrendingDown} 
              trend="-2.1%" 
              trendUp={false} 
            />
            <StatCard 
              title="Savings Rate" 
              amount={`${savingsRate}%`} 
              icon={PiggyBank} 
              trend="+5.0%" 
              trendUp={true} 
            />
          </div>

          {/* Charts & Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ExpenseChart />
                <BudgetTracker />
              </div>
              <TransactionList transactions={transactions} onDelete={deleteTransaction} />
            </div>

            <div className="space-y-6">
              <TransactionForm onAddTransaction={addTransaction} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedSession = localStorage.getItem('finflow_session');
    return savedSession ? JSON.parse(savedSession) as AuthUser : null;
  });

  const handleAuthenticated = (authenticatedUser: AuthUser) => {
    localStorage.setItem('finflow_session', JSON.stringify(authenticatedUser));
    setUser(authenticatedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('finflow_session');
    setUser(null);
  };

  if (!user) {
    return <AuthPage onAuthenticated={handleAuthenticated} />;
  }

  return (
    <FinanceProvider>
      <DashboardContent user={user} onLogout={handleLogout} />
    </FinanceProvider>
  );
}