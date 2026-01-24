import { Layout } from '../components/layout/Layout';
import { StatCard } from '../components/dashboard/StatCard';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { OrdersChart } from '../components/dashboard/OrdersChart';
import { RecentOrders } from '../components/dashboard/RecentOrders';
import { DollarSign, ShoppingBag, Users, Clock, Calendar, ChevronDown } from 'lucide-react';
import { ServiceDistributionChart } from '../components/dashboard/ServiceDistributionChart';

function Dashboard() {
    return (
        <Layout>
            <div className="mb-8">
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
                        <p className="text-slate-500 text-sm">Welcome back! Here's what's happening with your laundry marketplace.</p>
                    </div>
                    <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span>Last 7 days</span>
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        label="Total Revenue"
                        value="$45,231"
                        trend="+20.1%"
                        trendDirection="up"
                        icon={DollarSign}
                        iconColor="text-emerald-600"
                        iconBgColor="bg-emerald-100"
                    />
                    <StatCard
                        label="Total Orders"
                        value="1,234"
                        trend="+15.3%"
                        trendDirection="up"
                        icon={ShoppingBag}
                        iconColor="text-blue-600"
                        iconBgColor="bg-blue-100"
                    />
                    <StatCard
                        label="Active Customers"
                        value="892"
                        trend="+12.5%"
                        trendDirection="up"
                        icon={Users}
                        iconColor="text-violet-600"
                        iconBgColor="bg-violet-100"
                    />
                    <StatCard
                        label="Pending Orders"
                        value="23"
                        trend="-4.2%"
                        trendDirection="down"
                        icon={Clock}
                        iconColor="text-amber-600"
                        iconBgColor="bg-amber-100"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                    <RevenueChart />
                </div>
                <div>
                    <OrdersChart />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RecentOrders />
                </div>
                <div>
                    <ServiceDistributionChart />
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
