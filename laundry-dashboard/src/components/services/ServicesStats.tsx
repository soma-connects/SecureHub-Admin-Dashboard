export function ServicesStats() {
    const stats = [
        { label: 'Total Services', value: '8', subtext: 'All available services', color: 'text-blue-600' },
        { label: 'Active Services', value: '7', subtext: 'Currently available', color: 'text-emerald-600' },
        { label: 'Inactive Services', value: '1', subtext: 'Temporarily disabled', color: 'text-orange-600' },
        { label: 'Total Orders', value: '1784', subtext: 'Across all services', color: 'text-purple-600' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500 font-medium mb-2">{stat.label}</p>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                    <p className={`text-xs font-medium ${stat.color}`}>{stat.subtext}</p>
                </div>
            ))}
        </div>
    );
}
