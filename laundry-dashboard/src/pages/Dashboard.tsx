import { Layout } from '../components/layout/Layout';
import { StatCard } from '../components/dashboard/StatCard';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { OrdersChart } from '../components/dashboard/OrdersChart';
import { DollarSign, ShoppingBag, Users, Clock } from 'lucide-react';
import { useDateRange } from '../context/DateRangeContext';
import { DateRangePicker } from '../components/common/DateRangePicker';
import { RecentOrders } from '../components/dashboard/RecentOrders';
import { ServiceDistribution } from '../components/dashboard/ServiceDistribution';
import { useEffect, useState } from 'react';

function Dashboard() {
    const { dateRange } = useDateRange();
    const [stats, setStats] = useState({
        totalRevenue: '$0',
        totalOrders: 0,
        activeCustomers: 0,
        pendingOrders: 0,
        revenueChart: [],
        ordersChart: [],
        recentOrders: [],
        serviceDistribution: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const query = new URLSearchParams({
                    startDate: dateRange.start.toISOString(),
                    endDate: dateRange.end.toISOString()
                });
                // Assuming backend is proxying or we call supabase directly. 
                // Since I implemented /api/analytics in backend, I should call that.
                // But frontend runs on 5173 and backend on 3001. I need to ensure CORS or proxy.
                // For now assuming localhost:3001
                const response = await fetch(`http://localhost:3001/api/analytics/stats?${query}`);
                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [dateRange]);

    return (
        <Layout>
            <div className="mb-8">
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-100">Command Center</h2>
                        <p className="text-slate-400 text-sm">System Overview</p>
                    </div>
                    <DateRangePicker />
                </div>

                {/* KPI Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        label="Total Revenue"
                        value={stats.totalRevenue}
                        trend="+20.1%" // Calculation would need historical data comparison
                        trendDirection="up"
                        icon={DollarSign}
                        iconColor="text-emerald-400"
                        iconBgColor="bg-emerald-500/10"
                    />
                    <StatCard
                        label="Total Orders"
                        value={stats.totalOrders.toString()}
                        trend="+15.3%"
                        trendDirection="up"
                        icon={ShoppingBag}
                        iconColor="text-blue-400"
                        iconBgColor="bg-blue-500/10"
                    />
                    <StatCard
                        label="Active Customers"
                        value={stats.activeCustomers.toString()}
                        trend="+12.5%"
                        trendDirection="up"
                        icon={Users}
                        iconColor="text-violet-400"
                        iconBgColor="bg-violet-500/10"
                    />
                    <StatCard
                        label="Pending Orders"
                        value={stats.pendingOrders.toString()}
                        trend={stats.pendingOrders > 10 ? "High Load" : "Normal"}
                        trendDirection={stats.pendingOrders > 10 ? "down" : "up"}
                        icon={Clock}
                        iconColor="text-amber-400"
                        iconBgColor="bg-amber-500/10"
                    />
                </div>

                {/* Microservices Health Grid - HIDDEN
                <div className="mb-8">
                    <h3 className="text-slate-200 font-semibold mb-4 text-lg">Microservices Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <ServiceHealthCard
                            name="Auth Service"
                            status="online"
                            uptime="99.99%"
                            replicas={5}
                            latency="45ms"
                        />
                        <ServiceHealthCard
                            name="Order Service"
                            status="online"
                            uptime="99.95%"
                            replicas={3}
                            latency="120ms"
                        />
                        <ServiceHealthCard
                            name="Payment Gateway"
                            status="degraded"
                            uptime="98.50%"
                            replicas={2}
                            latency="850ms"
                        />
                        <ServiceHealthCard
                            name="Notification Svc"
                            status="online"
                            uptime="99.99%"
                            replicas={4}
                            latency="25ms"
                        />
                    </div>
                </div>
                */}

                {/* Observability Section Removed - No real backend support */}

                {/* Bottom Section: Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        {loading ? (
                            <div className="h-[350px] glass-panel rounded-2xl animate-pulse bg-slate-800/50" />
                        ) : (
                            <RevenueChart data={stats.revenueChart} />
                        )}
                    </div>
                    <div>
                        {loading ? (
                            <div className="h-[350px] glass-panel rounded-2xl animate-pulse bg-slate-800/50" />
                        ) : (
                            <OrdersChart data={stats.ordersChart} />
                        )}
                    </div>
                </div>

                {/* New Section: Recent Orders & Service Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 h-[400px]">
                        {loading ? (
                            <div className="h-full glass-panel rounded-2xl animate-pulse bg-slate-800/50" />
                        ) : (
                            <RecentOrders orders={stats.recentOrders} />
                        )}
                    </div>
                    <div className="h-[400px]">
                        {loading ? (
                            <div className="h-full glass-panel rounded-2xl animate-pulse bg-slate-800/50" />
                        ) : (
                            <ServiceDistribution data={stats.serviceDistribution} />
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
