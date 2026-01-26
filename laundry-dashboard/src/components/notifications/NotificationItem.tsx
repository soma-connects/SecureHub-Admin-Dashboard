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
            case 'order_request': return { icon: Box, bg: 'bg-blue-500/10', text: 'text-blue-400' };
            case 'payment_received': return { icon: CheckCircle, bg: 'bg-emerald-500/10', text: 'text-emerald-400' };
            case 'order_cancelled': return { icon: XCircle, bg: 'bg-rose-500/10', text: 'text-rose-400' };
            case 'refund_processed': return { icon: ArrowUpRight, bg: 'bg-purple-500/10', text: 'text-purple-400' };
            case 'order_in_progress': return { icon: Clock, bg: 'bg-orange-500/10', text: 'text-orange-400' };
        }
    };

    const priorityColor = {
        high: 'bg-rose-500/10 text-rose-400',
        medium: 'bg-orange-500/10 text-orange-400',
        low: 'bg-blue-500/10 text-blue-400'
    };

    const { icon: Icon, bg, text } = getIcon();

    return (
        <div className={`p-6 glass-card rounded-xl border border-slate-800 shadow-sm mb-4 relative ${isUnread ? 'border-l-4 border-l-blue-500' : ''}`}>
            {isUnread && <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-red-500"></div>}

            <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
                    <Icon className={`w-6 h-6 ${text}`} />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className={`text-base font-bold ${type === 'payment_received' ? 'text-emerald-400' : type === 'order_cancelled' ? 'text-rose-400' : 'text-blue-400'}`}>
                            {title}
                        </h3>
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${priorityColor[priority]}`}>
                            {priority}
                        </span>
                    </div>

                    <p className="text-slate-400 text-sm mb-4">{message}</p>

                    <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500">
                        <span>Order: <span className="text-blue-400">{orderId}</span></span>
                        <span>Customer: <span className="text-slate-200">{customer}</span></span>
                        {amount && <span>Amount: <span className={`font-bold ${type === 'refund_processed' ? 'text-emerald-400' : 'text-emerald-400'}`}>{amount}</span></span>}
                    </div>
                </div>

                <div className="flex flex-col items-end gap-6 pl-4">
                    <div className="flex gap-2">
                        <button className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors">
                            <Check className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                    <span className="text-xs text-slate-400 font-medium whitespace-nowrap">{timeAgo}</span>
                </div>
            </div>
        </div>
    );
}
