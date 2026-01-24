import { clsx } from 'clsx';

export type OrderStatus = 'Pending' | 'Processing' | 'Completed' | 'Cancelled' | 'Ready';

interface OrderStatusBadgeProps {
    status: OrderStatus | string;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
    const styles = {
        Pending: 'bg-amber-100 text-amber-700 border-amber-200',
        Processing: 'bg-blue-100 text-blue-700 border-blue-200',
        Completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        Cancelled: 'bg-rose-100 text-rose-700 border-rose-200',
        Ready: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    };

    const statusKey = status as keyof typeof styles;
    const className = styles[statusKey] || 'bg-slate-100 text-slate-700 border-slate-200';

    return (
        <span className={clsx(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
            className
        )}>
            {status}
        </span>
    );
}
