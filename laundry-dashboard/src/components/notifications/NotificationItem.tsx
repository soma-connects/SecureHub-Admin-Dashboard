import { Box, Check, Trash2, CheckCircle, XCircle, ArrowUpRight, Clock } from 'lucide-react';

interface NotificationItemProps {
    id: string;
    type: 'order_request' | 'payment_received' | 'order_cancelled' | 'refund_processed' | 'order_in_progress';
    title: string;
    priority: 'high' | 'medium' | 'low';
    message: string;
    orderId: string;
    customer: string;
    amount?: string;
    timeAgo: string;
    isUnread: boolean;
}

export function NotificationItem({
    type,
    title,
    priority,
    message,
    orderId,
    customer,
    amount,
    timeAgo,
    isUnread
}: NotificationItemProps) {

    const getIcon = () => {
        switch (type) {
            case 'order_request': return { icon: Box, bg: 'bg-blue-100', text: 'text-blue-600' };
            case 'payment_received': return { icon: CheckCircle, bg: 'bg-emerald-100', text: 'text-emerald-600' };
            case 'order_cancelled': return { icon: XCircle, bg: 'bg-rose-100', text: 'text-rose-600' };
            case 'refund_processed': return { icon: ArrowUpRight, bg: 'bg-purple-100', text: 'text-purple-600' };
            case 'order_in_progress': return { icon: Clock, bg: 'bg-orange-100', text: 'text-orange-600' };
        }
    };

    const priorityColor = {
        high: 'bg-rose-100 text-rose-700',
        medium: 'bg-orange-100 text-orange-700',
        low: 'bg-blue-100 text-blue-700'
    };

    const { icon: Icon, bg, text } = getIcon();

    return (
        <div className={`p-6 bg-white border border-slate-100 rounded-xl shadow-sm mb-4 relative ${isUnread ? 'border-l-4 border-l-blue-500' : ''}`}>
            {isUnread && <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-red-500"></div>}

            <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
                    <Icon className={`w-6 h-6 ${text}`} />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className={`text-base font-bold ${type === 'payment_received' ? 'text-emerald-700' : type === 'order_cancelled' ? 'text-rose-700' : 'text-blue-600'}`}>
                            {title}
                        </h3>
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${priorityColor[priority]}`}>
                            {priority}
                        </span>
                    </div>

                    <p className="text-slate-600 text-sm mb-4">{message}</p>

                    <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500">
                        <span>Order: <span className="text-blue-600">{orderId}</span></span>
                        <span>Customer: <span className="text-slate-900">{customer}</span></span>
                        {amount && <span>Amount: <span className={`font-bold ${type === 'refund_processed' ? 'text-emerald-600' : 'text-emerald-600'}`}>{amount}</span></span>}
                    </div>
                </div>

                <div className="flex flex-col items-end gap-6 pl-4">
                    <div className="flex gap-2">
                        <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                            <Check className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                    <span className="text-xs text-slate-400 font-medium whitespace-nowrap">{timeAgo}</span>
                </div>
            </div>
        </div>
    );
}
