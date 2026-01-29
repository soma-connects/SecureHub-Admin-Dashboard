import { useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Order {
    id: string;
    customer?: {
        name: string;
    };
    service?: {
        name: string;
    };
    amount: string;
    status: string;
    created_at: string;
}

interface RecentOrdersProps {
    orders: Order[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
    const navigate = useNavigate();

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Completed': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
            case 'Processing': return <RefreshCw className="w-4 h-4 text-blue-400" />;
            case 'Pending': return <Clock className="w-4 h-4 text-amber-400" />;
            case 'Cancelled': return <XCircle className="w-4 h-4 text-red-400" />;
            default: return <Package className="w-4 h-4 text-slate-400" />;
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Processing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'Pending': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'Cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        }
    };

    return (
        <div className="glass-panel p-6 rounded-2xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-100">Recent Orders</h3>
                <button
                    onClick={() => navigate('/orders')}
                    className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                    View all
                </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {orders && orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-800 hover:border-slate-700 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-blue-500/30 transition-colors">
                                    <Package className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-200 text-sm">{order.id}</h4>
                                    <p className="text-xs text-slate-400 mt-0.5">
                                        {order.customer?.name} • <span className="text-slate-500">{formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-slate-200">{order.service?.name}</p>
                                    <p className="text-xs text-slate-400 font-mono">{order.amount}</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center gap-1.5 ${getStatusStyle(order.status)}`}>
                                    {getStatusIcon(order.status)}
                                    {order.status}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-[200px] text-slate-500">
                        <Package className="w-8 h-8 mb-2 opacity-50" />
                        <p>No recent orders</p>
                    </div>
                )}
            </div>
        </div>
    );
}
