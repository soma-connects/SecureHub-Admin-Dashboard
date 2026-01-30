import { useEffect, useState } from 'react';
import { X, Mail, Phone, MapPin, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../lib/api';

interface CustomerDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    customerId: string | null;
}

interface CustomerDetails {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    orders: number;
    spent: string;
    lastOrder: string;
    status: string;
    initials: string;
    color: string;
    recentOrders: {
        id: string;
        date: string;
        amount: string;
        status: string;
        service: string;
    }[];
}

export function CustomerDetailsModal({ isOpen, onClose, customerId }: CustomerDetailsModalProps) {
    const [customer, setCustomer] = useState<CustomerDetails | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && customerId) {
            fetchCustomerDetails();
        } else {
            setCustomer(null);
        }
    }, [isOpen, customerId]);

    const fetchCustomerDetails = async () => {
        if (!customerId) return;
        setLoading(true);
        try {
            const data = await api.get(`/customers/${customerId}`);
            setCustomer(data);
        } catch (error) {
            console.error('Failed to fetch customer details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
                        <h2 className="text-xl font-bold text-slate-100">Customer Details</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            </div>
                        ) : customer ? (
                            <div className="space-y-8">
                                {/* Profile Header */}
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold ${customer.color.replace('text', 'text').replace('bg', 'bg').replace('-100', '-500/20').replace('-600', '-400')}`}>
                                        {customer.initials}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-2xl font-bold text-slate-100 mb-1">{customer.name}</h3>
                                                <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`}>
                                                        {customer.status}
                                                    </span>
                                                    <span>•</span>
                                                    <span>ID: {customer.id}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-slate-400">Total Spent</div>
                                                <div className="text-xl font-bold text-emerald-400">{customer.spent}</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-800">
                                                <Mail className="w-5 h-5 text-blue-400" />
                                                <div className="overflow-hidden">
                                                    <p className="text-xs text-slate-500">Email Address</p>
                                                    <p className="text-sm text-slate-200 truncate">{customer.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-800">
                                                <Phone className="w-5 h-5 text-purple-400" />
                                                <div>
                                                    <p className="text-xs text-slate-500">Phone Number</p>
                                                    <p className="text-sm text-slate-200">{customer.phone}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-800 md:col-span-2">
                                                <MapPin className="w-5 h-5 text-amber-500" />
                                                <div>
                                                    <p className="text-xs text-slate-500">Address</p>
                                                    <p className="text-sm text-slate-200">{customer.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order History */}
                                <div>
                                    <h4 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                                        <Package className="w-5 h-5 text-blue-400" />
                                        Order History
                                    </h4>
                                    <div className="border border-slate-800 rounded-xl overflow-hidden">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-slate-900 border-b border-slate-800">
                                                <tr>
                                                    <th className="px-4 py-3 font-medium text-slate-400">Order ID</th>
                                                    <th className="px-4 py-3 font-medium text-slate-400">Date</th>
                                                    <th className="px-4 py-3 font-medium text-slate-400">Service</th>
                                                    <th className="px-4 py-3 font-medium text-slate-400">Amount</th>
                                                    <th className="px-4 py-3 font-medium text-slate-400">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-800 bg-slate-800/20">
                                                {customer.recentOrders.length > 0 ? (
                                                    customer.recentOrders.map((order) => (
                                                        <tr key={order.id} className="hover:bg-slate-800/50">
                                                            <td className="px-4 py-3 font-medium text-slate-200">{order.id}</td>
                                                            <td className="px-4 py-3 text-slate-400">{order.date}</td>
                                                            <td className="px-4 py-3 text-slate-300">{order.service}</td>
                                                            <td className="px-4 py-3 font-medium text-slate-200">{order.amount}</td>
                                                            <td className="px-4 py-3">
                                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border
                                                                    ${order.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                                        order.status === 'Processing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                                            order.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                                                'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                                                                    {order.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                                                            No orders found for this customer.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-slate-500 py-12">Customer not found.</div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
