import { Package, CheckCircle2, DollarSign, XCircle } from 'lucide-react';

interface NotificationStatsProps {
    notifications: any[];
}

export function NotificationStats({ notifications }: NotificationStatsProps) {
    const stats = [
        {
            label: 'Order Requests',
            value: notifications.filter(n => n.type === 'order_request').length,
            icon: Package,
            color: 'text-blue-600',
            bg: 'bg-blue-100'
        },
        {
            label: 'Completed',
            value: notifications.filter(n => n.type === 'order_completed').length,
            icon: CheckCircle2,
            color: 'text-emerald-600',
            bg: 'bg-emerald-100'
        },
        {
            label: 'Payments',
            value: notifications.filter(n => n.type === 'payment_received').length,
            icon: DollarSign,
            color: 'text-emerald-600',
            bg: 'bg-emerald-100'
        },
        {
            label: 'Cancelled',
            value: notifications.filter(n => n.type === 'order_cancelled').length,
            icon: XCircle,
            color: 'text-rose-600',
            bg: 'bg-rose-100'
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
                <div key={stat.label} className="glass-card p-6 rounded-xl border border-slate-800 shadow-sm flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} bg-opacity-20`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400 font-medium mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-slate-100">{stat.value}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}
