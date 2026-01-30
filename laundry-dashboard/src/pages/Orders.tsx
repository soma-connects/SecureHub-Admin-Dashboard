import { useState, useEffect } from 'react';
import type { Order } from '../types';
import { Layout } from '../components/layout/Layout';
import { OrdersTable } from '../components/orders/OrdersTable';
import { OrdersFilter } from '../components/orders/OrdersFilter';
import { Filter, Download } from 'lucide-react';
import { clsx } from 'clsx';
import { api } from '../lib/api';


function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All Orders');

    const fetchOrders = async () => {
        try {
            const data = await api.get('/orders');
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            // Handle error state gracefully without mocks
            setOrders([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const tabs = [
        { name: 'All Orders', count: orders.length },
        { name: 'Pending', count: orders.filter(o => o.status === 'Pending').length },
        { name: 'Processing', count: orders.filter(o => o.status === 'Processing').length },
        { name: 'Completed', count: orders.filter(o => o.status === 'Completed').length },
    ];

    const filteredOrders = activeTab === 'All Orders'
        ? orders
        : orders.filter(order => order.status === activeTab);

    const handleExport = () => {
        const headers = ['Order ID', 'Customer Name', 'Customer Email', 'Service', 'Pickup', 'Delivery', 'Amount', 'Status', 'Payment'];
        const csvContent = [
            headers.join(','),
            ...orders.map(order => [
                order.id,
                `"${order.customer.name}"`,
                order.customer.email,
                `"${order.service.name}"`,
                order.date.pickup,
                order.date.delivery,
                order.amount.replace('$', ''),
                order.status,
                order.payment
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'orders_export.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Layout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100">Orders Management</h1>
                    <p className="text-slate-400 text-sm mt-1">Manage and track all laundry service orders</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-8 border-b border-slate-800 mb-6 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={clsx(
                            "pb-3 text-sm font-medium transition-all relative",
                            activeTab === tab.name
                                ? "text-cyan-400"
                                : "text-slate-400 hover:text-slate-200"
                        )}
                    >
                        {tab.name}
                        <span className={clsx(
                            "ml-2 text-xs py-0.5 px-2 rounded-full",
                            activeTab === tab.name
                                ? "bg-cyan-400/10 text-cyan-400"
                                : "bg-slate-800 text-slate-400"
                        )}>
                            {tab.count}
                        </span>
                        {activeTab === tab.name && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>

            <div className="mb-6">
                <OrdersFilter />
            </div>

            {isLoading ? (
                <div className="glass-panel p-8 text-center text-slate-400">Loading orders...</div>
            ) : (
                <OrdersTable orders={filteredOrders} onRefresh={fetchOrders} />
            )}
        </Layout>
    );
}

export default Orders;
