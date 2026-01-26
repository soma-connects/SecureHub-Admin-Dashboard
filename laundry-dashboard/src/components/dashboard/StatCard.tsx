import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
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
        <div className="glass-card rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
                <div className={clsx("p-3 rounded-xl bg-opacity-20", iconBgColor)}>
                    <Icon className={clsx("w-6 h-6", iconColor)} />
                </div>
                {trend && (
                    <div className={clsx(
                        "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg border",
                        trendDirection === 'up'
                            ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                            : "text-rose-400 bg-rose-500/10 border-rose-500/20"
                    )}>
                        {trendDirection === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {trend}
                    </div>
                )}
            </div>
            <div>
                <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
                <h3 className="text-2xl font-bold text-slate-100">{value}</h3>
            </div>
        </div>
    );
}
