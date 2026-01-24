import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { OrdersTable } from '../components/orders/OrdersTable';
import { OrdersFilter } from '../components/orders/OrdersFilter';
import { Filter, Download } from 'lucide-react';
import { mockOrders } from '../data/mockOrders';
import { clsx } from 'clsx';

function Orders() {
    const [activeTab, setActiveTab] = useState('All Orders');

    const tabs = [
        { name: 'All Orders', count: mockOrders.length },
        { name: 'Pending', count: mockOrders.filter(o => o.status === 'Pending').length },
        { name: 'Processing', count: mockOrders.filter(o => o.status === 'Processing').length },
        { name: 'Completed', count: mockOrders.filter(o => o.status === 'Completed').length },
    ];

    const filteredOrders = activeTab === 'All Orders'
        ? mockOrders
        : mockOrders.filter(order => order.status === activeTab);

    return (
        <Layout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Orders Management</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage and track all laundry service orders</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-8 border-b border-slate-200 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={clsx(
                            "pb-3 text-sm font-medium transition-all relative",
                            activeTab === tab.name
                                ? "text-cyan-700"
                                : "text-slate-500 hover:text-slate-700"
                        )}
                    >
                        {tab.name}
                        <span className={clsx(
                            "ml-2 text-xs py-0.5 px-2 rounded-full",
                            activeTab === tab.name
                                ? "bg-cyan-50 text-cyan-700"
                                : "bg-slate-100 text-slate-500"
                        )}>
                            {tab.count}
                        </span>
                        {activeTab === tab.name && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-700 rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>

            <div className="mb-6">
                <OrdersFilter />
            </div>

            <OrdersTable orders={filteredOrders} />
        </Layout>
    );
}

export default Orders;
