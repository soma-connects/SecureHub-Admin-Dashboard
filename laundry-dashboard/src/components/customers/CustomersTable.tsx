import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Eye, Filter, Download, Search, ShoppingBag, Trash2, Ban } from 'lucide-react';
import type { Customer } from '../../types';
import { CustomerDetailsModal } from './CustomerDetailsModal';

export function CustomersTable() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const fetchCustomers = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/customers');
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error('Failed to fetch customers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleSuspend = async (id: string, currentStatus: string, name: string) => {
        const newStatus = currentStatus === 'Inactive' ? 'Active' : 'Inactive';
        const action = currentStatus === 'Inactive' ? 'activate' : 'suspend';

        if (!confirm(`Are you sure you want to ${action} customer "${name}"?`)) return;

        try {
            const response = await fetch(`http://localhost:3001/api/customers/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) throw new Error(`Failed to ${action} customer`);

            fetchCustomers();
        } catch (error) {
            console.error('Status update failed:', error);
            alert(`Failed to ${action} customer. Please try again.`);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete customer "${name}"? This cannot be undone.`)) return;

        try {
            const response = await fetch(`http://localhost:3001/api/customers/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete customer');

            fetchCustomers();
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete customer. Please try again.');
        }
    };

    const handleViewDetails = (id: string) => {
        setSelectedCustomerId(id);
        setIsDetailsOpen(true);
    };

    if (isLoading) {
        return <div className="p-8 text-center text-slate-500">Loading customers...</div>;
    }
    return (
        <div>
            <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center glass-card p-4 rounded-xl border border-slate-800">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by customer name, email, or ID..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-200 placeholder:text-slate-500"
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-700 rounded-lg text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors bg-slate-900/50">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-700 rounded-lg text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors bg-slate-900/50">
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-900/50 border-b border-slate-800">
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Address</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">Total Orders</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">Total Spent</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Last Order</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 bg-opacity-20 ${(customer.color || 'bg-slate-100 text-slate-600').replace('text', 'text').replace('bg', 'bg').replace('-100', '-500/20').replace('-600', '-400')}`}>
                                                {customer.initials}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-slate-200 truncate">{customer.name}</p>
                                                <p className="text-xs text-slate-500 font-mono truncate">{customer.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                <Mail className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                                                <span className="truncate max-w-[150px]">{customer.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                <Phone className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                                                <span className="truncate">{customer.phone}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-start gap-2 text-xs text-slate-400 max-w-[200px]">
                                            <MapPin className="w-3.5 h-3.5 text-slate-500 mt-0.5 flex-shrink-0" />
                                            <span className="line-clamp-2">{customer.address}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-300 bg-slate-800/50 rounded-lg py-1 px-3 w-fit mx-auto border border-slate-700">
                                            <ShoppingBag className="w-3.5 h-3.5 text-slate-500" />
                                            {customer.orders}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="text-sm font-semibold text-emerald-400">{customer.spent}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-slate-400 font-medium">{customer.lastOrder}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${customer.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                            customer.status === 'Vip' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                                'bg-slate-800 text-slate-400 border-slate-700'
                                            }`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                className="text-slate-400 hover:text-blue-400 transition-colors p-1.5 rounded-lg hover:bg-blue-500/10"
                                                title="View Details"
                                                onClick={() => handleViewDetails(customer.id)}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                className={`${customer.status === 'Inactive' ? 'text-amber-400 hover:text-emerald-400 hover:bg-emerald-500/10' : 'text-slate-400 hover:text-amber-400 hover:bg-amber-500/10'} transition-colors p-1.5 rounded-lg`}
                                                title={customer.status === 'Inactive' ? "Activate Customer" : "Suspend Customer"}
                                                onClick={() => handleSuspend(customer.id, customer.status, customer.name)}
                                            >
                                                <Ban className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="text-slate-400 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10"
                                                title="Delete Customer"
                                                onClick={() => handleDelete(customer.id, customer.name)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* ... pagination ... */}
                <div className="px-6 py-4 border-t border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <p className="text-sm text-slate-500">Showing {customers.length} customers</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-slate-700 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">Previous</button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-600/20 transition-colors">1</button>
                        <button className="px-4 py-2 border border-slate-700 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">Next</button>
                    </div>
                </div>
            </div>

            <CustomerDetailsModal
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
                customerId={selectedCustomerId}
            />
        </div>
    );
}
