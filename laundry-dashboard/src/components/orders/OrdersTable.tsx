import { useState, useEffect, useRef } from 'react';
import { MoreVertical, Eye, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderDetailsModal } from './OrderDetailsModal';
import type { Order } from '../../data/mockOrders';

interface OrdersTableProps {
    orders: Order[];
    onRefresh: () => void;
}

export function OrdersTable({ orders, onRefresh }: OrdersTableProps) {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdownId(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleViewOrder = (order: Order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
        setOpenDropdownId(null);
    };

    const toggleDropdown = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setOpenDropdownId(openDropdownId === id ? null : id);
    };


    const handleAction = async (orderId: string, action: 'status' | 'delete', value?: string) => {
        try {
            if (action === 'delete') {
                if (!confirm('Are you sure you want to delete this order?')) return;

                const response = await fetch(`http://localhost:3001/api/orders/${orderId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) throw new Error('Failed to delete order');
            } else if (action === 'status' && value) {
                const response = await fetch(`http://localhost:3001/api/orders/${orderId}/status`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: value }),
                });

                if (!response.ok) throw new Error('Failed to update status');
            }

            setOpenDropdownId(null);
            onRefresh();
        } catch (error) {
            console.error('Action failed:', error);
            alert('Action failed. Please try again.');
        }
    };

    return (
        <>
            <div className="glass-card rounded-xl border border-slate-800 overflow-hidden pb-20"> {/* pb-20 for dropdown space */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        {/* ... table header ... */}
                        <thead>
                            <tr className="bg-slate-900/50 border-b border-slate-800">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Order ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Customer</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Service</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Pickup Date</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Delivery Date</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Payment</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 text-sm font-semibold text-blue-400">{order.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-slate-200">{order.customer.name}</span>
                                            <span className="text-xs text-slate-500">{order.customer.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-slate-200">{order.service.name}</span>
                                            <span className="text-xs text-slate-500">{order.service.items} items</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-400">{order.date.pickup}</td>
                                    <td className="px-6 py-4 text-sm text-slate-400">{order.date.delivery}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-200">{order.amount}</td>
                                    <td className="px-6 py-4">
                                        <OrderStatusBadge status={order.status} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.payment === 'Paid'
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            : order.payment === 'Refunded'
                                                ? 'bg-slate-800 text-slate-400 border border-slate-700'
                                                : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                            }`}>
                                            {order.payment}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right relative">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleViewOrder(order)}
                                                className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                                                title="View Details"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <div className="relative">
                                                <button
                                                    onClick={(e) => toggleDropdown(e, order.id)}
                                                    className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-all"
                                                >
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>

                                                {openDropdownId === order.id && (
                                                    <div
                                                        ref={dropdownRef}
                                                        className="absolute right-0 top-full mt-1 w-48 bg-slate-900 rounded-xl shadow-lg border border-slate-700 z-10 py-1"
                                                    >
                                                        {order.status === 'Pending' && (
                                                            <button
                                                                className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                                                                onClick={() => handleAction(order.id, 'status', 'Processing')}
                                                            >
                                                                <CheckCircle className="w-4 h-4 text-blue-500" />
                                                                Start Processing
                                                            </button>
                                                        )}
                                                        {order.status === 'Processing' && (
                                                            <button
                                                                className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                                                                onClick={() => handleAction(order.id, 'status', 'Ready')}
                                                            >
                                                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                                                Mark as Ready
                                                            </button>
                                                        )}
                                                        {order.status === 'Ready' && (
                                                            <button
                                                                className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                                                                onClick={() => handleAction(order.id, 'status', 'Completed')}
                                                            >
                                                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                                                Complete Order
                                                            </button>
                                                        )}
                                                        {['Pending', 'Processing', 'Ready'].includes(order.status) && (
                                                            <button
                                                                className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                                                                onClick={() => handleAction(order.id, 'status', 'Cancelled')}
                                                            >
                                                                <XCircle className="w-4 h-4 text-amber-500" />
                                                                Cancel Order
                                                            </button>
                                                        )}
                                                        {(order.status === 'Completed' || order.status === 'Cancelled') && (
                                                            <button
                                                                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-2"
                                                                onClick={() => handleAction(order.id, 'delete')}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                                Delete Order
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <p className="text-sm text-slate-500">Showing <span className="font-medium text-slate-200">1-{orders.length}</span> of <span className="font-medium text-slate-200">{orders.length}</span> orders</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm font-medium text-slate-400 border border-slate-700 rounded hover:bg-slate-800 disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 shadow-sm shadow-blue-600/20">1</button>
                        <button className="px-3 py-1 text-sm font-medium text-slate-400 border border-slate-700 rounded hover:bg-slate-800">2</button>
                        <span className="px-2 text-slate-600">...</span>
                        <button className="px-3 py-1 text-sm font-medium text-slate-400 border border-slate-700 rounded hover:bg-slate-800">Next</button>
                    </div>
                </div>
            </div>

            <OrderDetailsModal
                order={selectedOrder}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
