import { MoreVertical, Mail, Phone, MapPin, Eye, Filter, Download, Search, ShoppingBag } from 'lucide-react';

const customers = [
    {
        id: 'CUST-001',
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 234 567 8900',
        address: '123 Main St, New York, NY 10001',
        orders: 15,
        spent: '$375.00',
        lastOrder: '2026-01-18',
        status: 'Active',
        initials: 'JD',
        color: 'bg-blue-50 text-blue-600'
    },
    {
        id: 'CUST-002',
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        phone: '+1 234 567 8901',
        address: '456 Oak Ave, Brooklyn, NY 11201',
        orders: 23,
        spent: '$645.00',
        lastOrder: '2026-01-17',
        status: 'Active',
        initials: 'JS',
        color: 'bg-emerald-50 text-emerald-600'
    },
    {
        id: 'CUST-003',
        name: 'Mike Johnson',
        email: 'mike.j@email.com',
        phone: '+1 234 567 8902',
        address: '789 Pine Rd, Queens, NY 11354',
        orders: 8,
        spent: '$180.00',
        lastOrder: '2026-01-16',
        status: 'Active',
        initials: 'MJ',
        color: 'bg-cyan-50 text-cyan-600'
    },
    {
        id: 'CUST-004',
        name: 'Sarah Williams',
        email: 'sarah.w@email.com',
        phone: '+1 234 567 8903',
        address: '321 Elm St, Manhattan, NY 10013',
        orders: 31,
        spent: '$890.00',
        lastOrder: '2026-01-18',
        status: 'Vip',
        initials: 'SW',
        color: 'bg-purple-50 text-purple-600'
    },
    {
        id: 'CUST-005',
        name: 'Tom Brown',
        email: 'tom.brown@email.com',
        phone: '+1 234 567 8904',
        address: '654 Maple Dr, Bronx, NY 10451',
        orders: 5,
        spent: '$125.00',
        lastOrder: '2025-12-20',
        status: 'Inactive',
        initials: 'TB',
        color: 'bg-slate-50 text-slate-600'
    },
    {
        id: 'CUST-006',
        name: 'Emily Davis',
        email: 'emily.d@email.com',
        phone: '+1 234 567 8905',
        address: '987 Cedar Ln, Staten Island, NY 10301',
        orders: 12,
        spent: '$320.00',
        lastOrder: '2026-01-15',
        status: 'Active',
        initials: 'ED',
        color: 'bg-orange-50 text-orange-600'
    },
    {
        id: 'CUST-007',
        name: 'David Wilson',
        email: 'david.w@email.com',
        phone: '+1 234 567 8906',
        address: '147 Birch Ave, Manhattan, NY 10014',
        orders: 19,
        spent: '$475.00',
        lastOrder: '2026-01-17',
        status: 'Active',
        initials: 'DW',
        color: 'bg-indigo-50 text-indigo-600'
    },
    {
        id: 'CUST-008',
        name: 'Lisa Anderson',
        email: 'lisa.a@email.com',
        phone: '+1 234 567 8907',
        address: '258 Spruce St, Brooklyn, NY 11202',
        orders: 27,
        spent: '$735.00',
        lastOrder: '2026-01-18',
        status: 'Vip',
        initials: 'LA',
        color: 'bg-pink-50 text-pink-600'
    }
];

export function CustomersTable() {
    return (
        <div>
            <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by customer name, email, or ID..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-600 placeholder:text-slate-400"
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors bg-white">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors bg-white">
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Address</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Total Orders</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Total Spent</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Last Order</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${customer.color}`}>
                                                {customer.initials}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-slate-900 truncate">{customer.name}</p>
                                                <p className="text-xs text-slate-500 font-mono truncate">{customer.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                                <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                                <span className="truncate max-w-[150px]">{customer.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                                <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                                <span className="truncate">{customer.phone}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-start gap-2 text-xs text-slate-600 max-w-[200px]">
                                            <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                                            <span className="line-clamp-2">{customer.address}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg py-1 px-3 w-fit mx-auto border border-slate-100">
                                            <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
                                            {customer.orders}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="text-sm font-semibold text-slate-900">{customer.spent}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-slate-600 font-medium">{customer.lastOrder}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${customer.status === 'Active' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                                            customer.status === 'Vip' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                                                'bg-slate-100 text-slate-600 border-slate-200'
                                            }`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="text-slate-400 hover:text-blue-600 transition-colors p-1.5 rounded-lg hover:bg-blue-50" title="View Details">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-50" title="More Options">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-sm text-slate-500">Showing 8 of 8 customers</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">Previous</button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-600/20 transition-colors">1</button>
                        <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">2</button>
                        <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
