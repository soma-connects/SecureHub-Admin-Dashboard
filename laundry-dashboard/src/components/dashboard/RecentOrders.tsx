export function RecentOrders() {
    const orders = [
        { id: '#ORD-001', customer: 'Sarah Johnson', services: 'Dry Cleaning', total: '$45.00', status: 'Processing' },
        { id: '#ORD-002', customer: 'Michael Chen', services: 'Wash & Fold', total: '$22.50', status: 'Completed' },
        { id: '#ORD-003', customer: 'Emma Wilson', services: 'Ironing', total: '$15.00', status: 'Pending' },
        { id: '#ORD-004', customer: 'James Brown', services: 'Dry Cleaning', total: '$60.00', status: 'Processing' },
        { id: '#ORD-005', customer: 'Sofia Garcia', services: 'Wash & Fold', total: '$35.00', status: 'Completed' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-emerald-100 text-emerald-700';
            case 'Processing': return 'bg-blue-100 text-blue-700';
            case 'Pending': return 'bg-amber-100 text-amber-700';
            case 'Cancelled': return 'bg-rose-100 text-rose-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Order ID</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Customer</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Services</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Total</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-slate-900">{order.id}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">{order.customer}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">{order.services}</td>
                                <td className="px-6 py-4 text-sm font-semibold text-slate-900">{order.total}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
