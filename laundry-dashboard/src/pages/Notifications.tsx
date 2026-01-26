import { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { NotificationStats } from '../components/notifications/NotificationStats';
import { NotificationList } from '../components/notifications/NotificationList';
import { CheckCheck, Trash2, Loader2 } from 'lucide-react';

// Use environment variable for API URL in production
const API_URL = 'http://localhost:3001/api';

function Notifications() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchNotifications = async () => {
        try {
            const response = await fetch(`${API_URL}/notifications`);
            if (response.ok) {
                const data = await response.json();
                setNotifications(data.data.notifications || []);
            }
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleMarkAllAsRead = async () => {
        setActionLoading(true);
        try {
            const response = await fetch(`${API_URL}/notifications/read-all`, {
                method: 'PATCH',
            });
            if (response.ok) {
                await fetchNotifications();
            }
        } catch (error) {
            console.error('Failed to mark all as read:', error);
        } finally {
            setActionLoading(false);
        }
    };

    const handleClearRead = async () => {
        if (!confirm('Are you sure you want to delete all read notifications?')) return;

        setActionLoading(true);
        try {
            const response = await fetch(`${API_URL}/notifications/read`, {
                method: 'DELETE',
            });
            if (response.ok) {
                await fetchNotifications();
            }
        } catch (error) {
            console.error('Failed to clear read notifications:', error);
        } finally {
            setActionLoading(false);
        }
    };

    const unreadCount = notifications.filter(n => n.isUnread).length;

    return (
        <Layout>
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-slate-100">Notifications</h1>
                        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                            {unreadCount} unread
                        </span>
                    </div>
                    <p className="text-slate-400 text-sm mt-1">Stay updated with order and payment activities</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleMarkAllAsRead}
                        disabled={actionLoading}
                        className="flex items-center gap-2 px-4 py-2 border border-slate-700 bg-slate-900/50 rounded-lg text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
                    >
                        {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCheck className="w-4 h-4" />}
                        <span>Mark all as read</span>
                    </button>
                    <button
                        onClick={handleClearRead}
                        disabled={actionLoading}
                        className="flex items-center gap-2 px-4 py-2 border border-slate-700 bg-slate-900/50 rounded-lg text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
                    >
                        {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        <span>Clear read</span>
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
            ) : (
                <>
                    <NotificationStats notifications={notifications} />
                    <NotificationList notifications={notifications} />
                </>
            )}

        </Layout>
    );
}

export default Notifications;
