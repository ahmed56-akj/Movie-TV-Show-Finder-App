import { LayoutDashboard, Receipt, PieChart, Target, Settings, LogOut } from 'lucide-react';

export default function Sidebar({ onLogout }: { onLogout: () => void }) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Receipt, label: 'Transactions', active: false },
    { icon: PieChart, label: 'Analytics', active: false },
    { icon: Target, label: 'Budgets', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between hidden md:flex h-screen sticky top-0">
      <div className="p-6">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Menu</div>
        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  item.active 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-slate-800">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}