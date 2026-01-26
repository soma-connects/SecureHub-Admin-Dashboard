import { Search } from 'lucide-react';
import { NotificationItem } from './NotificationItem';
import { useState, useMemo } from 'react';

interface NotificationListProps {
    notifications: any[];
}

export function NotificationList({ notifications }: NotificationListProps) {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = [
        { id: 'all', label: 'All' },
        { id: 'unread', label: 'Unread' },
        { id: 'order_request', label: 'Order Requests' },
        { id: 'in_progress', label: 'In Progress' },
        { id: 'completed', label: 'Completed' },
        { id: 'cancelled', label: 'Cancelled' },
        { id: 'payment_received', label: 'Payments' },
    ];

    const filteredNotifications = useMemo(() => {
        return notifications.filter(notification => {
            // Tab filter
            if (activeTab === 'unread' && !notification.isUnread) return false;
            if (activeTab !== 'all' && activeTab !== 'unread' && notification.type !== activeTab) return false;

            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                return (
                    notification.orderId?.toLowerCase().includes(query) ||
                    notification.customer?.toLowerCase().includes(query) ||
                    notification.message?.toLowerCase().includes(query)
                );
            }

            return true;
        });
    }, [notifications, activeTab, searchQuery]);

    // Calculate counts for tabs
    const counts = useMemo(() => {
        const acc: Record<string, number> = {};
        tabs.forEach(tab => acc[tab.id] = 0);

        notifications.forEach(n => {
            acc['all']++;
            if (n.isUnread) acc['unread']++;
            if (acc[n.type] !== undefined) acc[n.type]++;
        });
        return acc;
    }, [notifications]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-wrap gap-4 items-center">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`text-sm font-medium pb-1 border-b-2 transition-colors flex items-center gap-1 ${activeTab === tab.id
                                ? 'text-cyan-400 border-cyan-400'
                                : 'text-slate-400 border-transparent hover:text-slate-200'
                                }`}
                        >
                            {tab.label}
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ml-1 ${activeTab === tab.id ? 'bg-cyan-400/10 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                                ({counts[tab.id] || 0})
                            </span>
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 shadow-sm placeholder-slate-500"
                    />
                </div>
            </div>

            <div className="space-y-4">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                        <NotificationItem key={notification.id} {...notification} />
                    ))
                ) : (
                    <div className="text-center py-12 text-slate-400">
                        No notifications found matching your criteria.
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-800 pt-6 mt-8">
                <p className="text-sm text-slate-400">Showing {filteredNotifications.length} of {notifications.length} notifications</p>
                {/* Pagination (Visual only for now as we have full list) */}
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors" disabled>Previous</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-600/20">1</button>
                    <button className="px-4 py-2 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors">Next</button>
                </div>
            </div>
        </div>
    );
}
