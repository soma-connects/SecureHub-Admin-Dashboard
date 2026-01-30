import { useState, useEffect } from 'react';
import { api } from '../../lib/api';

export function OfficesStats() {
    const [stats, setStats] = useState({
        totalOffices: 0,
        openLocations: 0,
        closedLocations: 0,
        totalOrders: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await api.get('/offices/stats');
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch office stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statItems = [
        { label: 'Total Offices', value: (stats?.totalOffices || 0).toString(), subtext: 'Across all locations', color: 'text-blue-600' },
        { label: 'Open Locations', value: (stats?.openLocations || 0).toString(), subtext: 'Currently operational', color: 'text-emerald-600' },
        { label: 'Closed Locations', value: (stats?.closedLocations || 0).toString(), subtext: 'Temporarily closed', color: 'text-orange-600' },
        { label: 'Total Orders', value: (stats?.totalOrders || 0) > 0 ? (stats?.totalOrders || 0).toString() : '-', subtext: 'All locations', color: 'text-purple-600' },
    ];

    if (loading) {
        return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="glass-panel p-6 rounded-xl animate-pulse h-32 bg-slate-800/50" />
            ))}
        </div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statItems.map((stat) => (
                <div key={stat.label} className="glass-panel p-6 rounded-xl border border-slate-800">
                    <p className="text-sm text-slate-400 font-medium mb-2">{stat.label}</p>
                    <h3 className="text-3xl font-bold text-slate-200 mb-1">{stat.value}</h3>
                    <p className={`text-xs font-medium ${stat.color}`}>{stat.subtext}</p>
                </div>
            ))}
        </div>
    );
}
