import { MoreVertical, Eye } from 'lucide-react';
import { OrderStatusBadge } from './OrderStatusBadge';
import type { Order } from '../../data/mockOrders';

interface OrdersTableProps {
    orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Order ID</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Customer</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Service</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Pickup Date</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Delivery Date</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Payment</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-semibold text-blue-600">{order.id}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-900">{order.customer.name}</span>
                                        <span className="text-xs text-slate-500">{order.customer.email}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-slate-900">{order.service.name}</span>
                                        <span className="text-xs text-slate-500">{order.service.items} items</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">{order.date.pickup}</td>
                                <td className="px-6 py-4 text-sm text-slate-500">{order.date.delivery}</td>
                                <td className="px-6 py-4 text-sm font-semibold text-slate-900">{order.amount}</td>
                                <td className="px-6 py-4">
                                    <OrderStatusBadge status={order.status} />
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.payment === 'Paid'
                                        ? 'bg-emerald-50 text-emerald-700'
                                        : order.payment === 'Refunded'
                                            ? 'bg-slate-100 text-slate-600'
                                            : 'bg-amber-50 text-amber-700'
                                        }`}>
                                        {order.payment}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                <p className="text-sm text-slate-500">Showing <span className="font-medium text-slate-900">1-{orders.length}</span> of <span className="font-medium text-slate-900">{orders.length}</span> orders</p>
                <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm font-medium text-slate-600 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
                    <button className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 shadow-sm shadow-blue-600/20">1</button>
                    <button className="px-3 py-1 text-sm font-medium text-slate-600 border border-slate-200 rounded hover:bg-slate-50">2</button>
                    <span className="px-2 text-slate-400">...</span>
                    <button className="px-3 py-1 text-sm font-medium text-slate-600 border border-slate-200 rounded hover:bg-slate-50">Next</button>
                </div>
            </div>
        </div>
    );
}
