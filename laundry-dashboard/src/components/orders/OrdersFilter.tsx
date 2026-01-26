import { Search } from 'lucide-react';

export function OrdersFilter() {
    return (
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
                type="text"
                placeholder="Search by order ID, customer name, or email..."
                className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm text-slate-200 placeholder:text-slate-500"
            />
        </div>
    );
}
