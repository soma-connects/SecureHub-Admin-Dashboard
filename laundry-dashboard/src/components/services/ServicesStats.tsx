import { useState, useEffect } from 'react';

export function ServicesStats() {
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        inactive: 0,
        totalOrders: 0 // We might need to mock this or get from API if available
    });

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/services');
                if (response.ok) {
                    const data = await response.json();
                    // Calculate stats from the list
                    const total = data.length;
                    const active = data.filter((s: any) => s.status === 'Active').length;
                    const inactive = data.filter((s: any) => s.status === 'Inactive').length;
                    // Total orders per service might not be in the list view, or we sum them up if they are.
                    // Assuming service object has totalOrders or similar.
                    const totalOrders = data.reduce((acc: number, curr: any) => acc + (curr.total_orders || 0), 0);

                    setStats({ total, active, inactive, totalOrders });
                }
            } catch (error) {
                console.error('Failed to fetch services for stats:', error);
            }
        };

        fetchServices();
    }, []);

    const statItems = [
        { label: 'Total Services', value: stats.total.toString(), subtext: 'All available services', color: 'text-blue-600' },
        { label: 'Active Services', value: stats.active.toString(), subtext: 'Currently available', color: 'text-emerald-600' },
        { label: 'Inactive Services', value: stats.inactive.toString(), subtext: 'Temporarily disabled', color: 'text-orange-600' },
        { label: 'Total Orders', value: stats.totalOrders.toString(), subtext: 'Across all services', color: 'text-purple-600' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statItems.map((stat) => (
                <div key={stat.label} className="glass-panel p-6 rounded-xl">
                    <p className="text-sm text-slate-400 font-medium mb-2">{stat.label}</p>
                    <h3 className="text-3xl font-bold text-slate-200 mb-1">{stat.value}</h3>
                    <p className={`text-xs font-medium ${stat.color}`}>{stat.subtext}</p>
                </div>
            ))}
        </div>
    );
}
