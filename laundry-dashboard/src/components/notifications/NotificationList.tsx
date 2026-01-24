import { Search } from 'lucide-react';
import { NotificationItem } from './NotificationItem';
import { useState } from 'react';

const notifications = [
    {
        id: '1',
        type: 'order_request' as const,
        title: 'New Order Request',
        priority: 'high' as const,
        message: 'New order #ORD-1240 has been placed by Sarah Williams for Wash & Fold service',
        orderId: '#ORD-1240',
        customer: 'Sarah Williams',
        timeAgo: '12 hours ago',
        isUnread: true
    },
    {
        id: '2',
        type: 'payment_received' as const,
        title: 'Payment Received',
        priority: 'medium' as const,
        message: 'Payment of $45.00 received for order #ORD-1235 from Jane Smith',
        orderId: '#ORD-1235',
        customer: 'Jane Smith',
        amount: '$45.00',
        timeAgo: '13 hours ago',
        isUnread: true
    },
    {
        id: '3',
        type: 'payment_received' as const,
        title: 'Payment Received',
        priority: 'medium' as const,
        message: 'Payment of $25.00 received for order #ORD-1234 from John Doe',
        orderId: '#ORD-1234',
        customer: 'John Doe',
        amount: '$25.00',
        timeAgo: '1 days ago',
        isUnread: true
    },
    {
        id: '4',
        type: 'order_cancelled' as const,
        title: 'Order Cancelled',
        priority: 'high' as const,
        message: 'Order #ORD-1230 cancelled due to unavailability of requested service',
        orderId: '#ORD-1230',
        customer: 'Robert Lee',
        timeAgo: '1 days ago',
        isUnread: false
    },
    {
        id: '5',
        type: 'refund_processed' as const,
        title: 'Refund Processed',
        priority: 'medium' as const,
        message: 'Refund of $15.00 sent for cancelled order #ORD-1230',
        orderId: '#ORD-1230',
        customer: 'Robert Lee',
        amount: '$15.00',
        timeAgo: '1 days ago',
        isUnread: false
    },
    {
        id: '6',
        type: 'order_in_progress' as const,
        title: 'Order In Progress',
        priority: 'low' as const,
        message: 'Order #ORD-1240 pickup completed - now processing at facility',
        orderId: '#ORD-1240',
        customer: 'Sarah Williams',
        timeAgo: '12 hours ago',
        isUnread: true
    }
];

export function NotificationList() {
    const tabs = [
        { id: 'all', label: 'All', count: 15 },
        { id: 'unread', label: 'Unread', count: 5 },
        { id: 'order_requests', label: 'Order Requests', count: 3 },
        { id: 'in_progress', label: 'In Progress', count: 3 },
        { id: 'completed', label: 'Completed', count: 2 },
        { id: 'cancelled', label: 'Cancelled', count: 2 },
        { id: 'payments', label: 'Payments', count: 5 },
    ];

    const [activeTab, setActiveTab] = useState('all');

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-wrap gap-4 items-center">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`text-sm font-medium pb-1 border-b-2 transition-colors flex items-center gap-1 ${activeTab === tab.id
                                ? 'text-blue-600 border-blue-600'
                                : 'text-slate-500 border-transparent hover:text-slate-700'
                                }`}
                        >
                            {tab.label}
                            <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full ml-1">({tab.count})</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search notifications by order ID, customer, or message..."
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm"
                    />
                </div>
            </div>

            <div className="space-y-4">
                {notifications.map((notification) => (
                    <NotificationItem key={notification.id} {...notification} />
                ))}
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-8">
                <p className="text-sm text-slate-500">Showing {notifications.length} of 15 notifications</p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Previous</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-600/20">1</button>
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">2</button>
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Next</button>
                </div>
            </div>
        </div>
    );
}
