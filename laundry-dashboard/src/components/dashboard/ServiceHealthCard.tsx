import { Activity, Server, Clock } from 'lucide-react';
import { clsx } from 'clsx';

interface ServiceHealthCardProps {
    name: string;
    status: 'online' | 'degraded' | 'offline';
    uptime: string;
    replicas: number;
    latency: string;
}

export function ServiceHealthCard({ name, status, uptime, replicas, latency }: ServiceHealthCardProps) {
    const statusColors = {
        online: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        degraded: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        offline: "bg-rose-500/10 text-rose-400 border-rose-500/20"
    };

    const statusDot = {
        online: "bg-emerald-500",
        degraded: "bg-amber-500",
        offline: "bg-rose-500"
    };

    return (
        <div className="glass-card rounded-xl p-4 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-800/50">
                        <Server className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-200 text-sm">{name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className={clsx("w-1.5 h-1.5 rounded-full animate-pulse", statusDot[status])} />
                            <span className={clsx("text-xs font-medium capitalize",
                                status === 'online' ? "text-emerald-400" :
                                    status === 'degraded' ? "text-amber-400" : "text-rose-400"
                            )}>
                                {status}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={clsx("px-2 py-1 rounded text-xs border uppercase font-bold tracking-wider", statusColors[status])}>
                    {status}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="bg-slate-900/40 p-2 rounded-lg border border-slate-800/50">
                    <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                        <Clock className="w-3 h-3" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Uptime</span>
                    </div>
                    <span className="text-sm font-mono text-slate-300">{uptime}</span>
                </div>
                <div className="bg-slate-900/40 p-2 rounded-lg border border-slate-800/50">
                    <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                        <Activity className="w-3 h-3" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Latency</span>
                    </div>
                    <span className="text-sm font-mono text-slate-300">{latency}</span>
                </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/50 pt-3">
                <span>Active Replicas</span>
                <span className="text-slate-300 font-mono">{replicas}/5</span>
            </div>
        </div>
    );
}
