import { Package, CheckCircle2, DollarSign, XCircle } from 'lucide-react';

export function NotificationStats() {
    const stats = [
        { label: 'Order Requests', value: '3', icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Completed', value: '2', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100' },
        { label: 'Payments', value: '5', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-100' },
        { label: 'Cancelled', value: '2', icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-100' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}
