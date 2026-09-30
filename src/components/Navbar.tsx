import { Bell, Search } from 'lucide-react';

export default function Navbar({ userName }: { userName: string }) {
  const initials = userName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 text-slate-100">
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          FinFlow Tracker
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="bg-slate-800 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-slate-700 text-slate-200 placeholder-slate-400"
          />
        </div>
        <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
          <Bell className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}