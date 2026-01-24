import { Users, UserCheck, Crown, type LucideProps } from 'lucide-react';

export function CustomerStats() {
    const stats = [
        { label: 'Total Customers', value: '8', change: '+12.5% from last month', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', isPositive: true },
        { label: 'Active Customers', value: '5', change: '+8.3% from last month', icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-100', isPositive: true },
        { label: 'VIP Customers', value: '2', change: 'Premium tier', icon: Crown, color: 'text-purple-600', bg: 'bg-purple-100', isPositive: null },
        { label: 'Avg. Orders/Customer', value: '17.5', change: '+5.2% from last month', icon: users_avg_icon, color: 'text-orange-600', bg: 'bg-orange-100', isPositive: true },
    ];

    // Helper to avoid import error for custom/complex icon if needed, or reuse Users
    function users_avg_icon(props: LucideProps) {
        return <Users {...props} />
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                        </div>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                    </div>

                    <span className={`text-xs font-medium ${stat.isPositive === true ? 'text-emerald-600' : stat.isPositive === false ? 'text-rose-600' : 'text-purple-600'}`}>
                        {stat.change}
                    </span>
                </div>
            ))}
        </div>
    );
}
