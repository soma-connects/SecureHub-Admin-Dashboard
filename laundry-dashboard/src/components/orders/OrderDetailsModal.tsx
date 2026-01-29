import { X, User, ShoppingBag, Calendar, CreditCard, CheckCircle } from 'lucide-react';
import type { Order } from '../../types';
import { clsx } from 'clsx';
import { OrderStatusBadge } from './OrderStatusBadge';

interface OrderDetailsModalProps {
    order: Order | null;
    isOpen: boolean;
    onClose: () => void;
}

export function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
    if (!isOpen || !order) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-slate-100">Order Details</h2>
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-sm font-semibold rounded-full border border-blue-500/20">
                            {order.id}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[80vh]">
                    {/* Status Bar */}
                    <div className="flex items-center justify-between mb-8 p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <div>
                            <p className="text-sm text-slate-400 mb-1">Current Status</p>
                            <OrderStatusBadge status={order.status} />
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-slate-400 mb-1">Total Amount</p>
                            <p className="text-2xl font-bold text-slate-100">{order.amount}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Customer Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-100 font-semibold border-b border-slate-800 pb-2">
                                <User className="w-4 h-4 text-cyan-400" />
                                <h3>Customer Information</h3>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Name</p>
                                    <p className="text-slate-300 font-medium">{order.customer.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Email</p>
                                    <p className="text-slate-300">{order.customer.email}</p>
                                </div>
                                {order.customer.phone && (
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Phone</p>
                                        <p className="text-slate-300">{order.customer.phone}</p>
                                    </div>
                                )}
                                {order.customer.address && (
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Delivery Address</p>
                                        <p className="text-slate-300">{order.customer.address}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-100 font-semibold border-b border-slate-800 pb-2">
                                <ShoppingBag className="w-4 h-4 text-cyan-400" />
                                <h3>Service Details</h3>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Service Type</p>
                                    <p className="text-slate-300 font-medium">{order.service.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Quantity</p>
                                    <p className="text-slate-300">{order.service.items} items</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Category</p>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-400">
                                        {order.service.category || "General"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Schedule */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-100 font-semibold border-b border-slate-800 pb-2">
                                <Calendar className="w-4 h-4 text-cyan-400" />
                                <h3>Schedule</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-blue-900/10 rounded-lg border border-blue-500/20">
                                    <p className="text-xs text-blue-400 mb-1 font-medium">Pickup Date</p>
                                    <p className="text-slate-300 font-medium">{order.date.pickup}</p>
                                </div>
                                <div className="p-3 bg-emerald-900/10 rounded-lg border border-emerald-500/20">
                                    <p className="text-xs text-emerald-400 mb-1 font-medium">Delivery Date</p>
                                    <p className="text-slate-300 font-medium">{order.date.delivery}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-100 font-semibold border-b border-slate-800 pb-2">
                                <CreditCard className="w-4 h-4 text-cyan-400" />
                                <h3>Payment Status</h3>
                            </div>
                            <div>
                                <div className={clsx(
                                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium",
                                    order.payment === 'Paid' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                        order.payment === 'Refunded' ? "bg-slate-800 text-slate-400 border-slate-700" :
                                            "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                )}>
                                    <CheckCircle className="w-4 h-4" />
                                    {order.payment}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-800 bg-slate-900 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors font-medium text-sm"
                    >
                        Close
                    </button>
                    <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium text-sm shadow-sm shadow-cyan-600/20">
                        Print Invoice
                    </button>
                </div>
            </div>
        </div>
    );
}
