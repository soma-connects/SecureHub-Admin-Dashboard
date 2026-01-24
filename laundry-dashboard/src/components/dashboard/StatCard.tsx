import type { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface StatCardProps {
    label: string;
    value: string;
    trend: string;
    trendDirection: 'up' | 'down';
    icon: LucideIcon;
    iconColor?: string;
    iconBgColor?: string;
}

export function StatCard({ label, value, trend, trendDirection, icon: Icon, iconColor, iconBgColor }: StatCardProps) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-slate-500 text-sm font-medium mb-1">{label}</p>
                    <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
                </div>
                <div className={clsx("p-3 rounded-xl", iconBgColor || "bg-blue-100")}>
                    <Icon className={clsx("w-6 h-6", iconColor || "text-blue-600")} />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <span className={clsx(
                    "text-sm font-medium",
                    trendDirection === 'up' ? "text-emerald-500" : "text-rose-500"
                )}>
                    {trend}
                </span>
                <span className="text-slate-400 text-sm">from last period</span>
            </div>
        </div>
    );
}
