import type { LucideIcon } from 'lucide-react';

type StatCardProps = {
  title: string;
  amount: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
};

export default function StatCard({ title, amount, icon: Icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-slate-800 border border-slate-700/60 rounded-2xl p-5 flex flex-col justify-between shadow-lg hover:border-slate-600 transition">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-400">{title}</span>
        <div className="p-2.5 rounded-xl bg-slate-700/50 text-emerald-400">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-slate-100">{amount}</h3>
        {trend && (
          <p className={`text-xs mt-1 font-medium flex items-center gap-1 ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
            <span>{trend}</span> vs last month
          </p>
        )}
      </div>
    </div>
  );
}