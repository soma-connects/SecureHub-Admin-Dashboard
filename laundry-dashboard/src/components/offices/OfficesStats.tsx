export function OfficesStats() {
    const stats = [
        { label: 'Total Offices', value: '5', subtext: 'Across all locations', color: 'text-blue-600' },
        { label: 'Open Locations', value: '4', subtext: 'Currently operational', color: 'text-emerald-600' },
        { label: 'Closed Locations', value: '1', subtext: 'Temporarily closed', color: 'text-orange-600' },
        { label: 'Total Orders', value: '3616', subtext: 'All locations', color: 'text-purple-600' },
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
