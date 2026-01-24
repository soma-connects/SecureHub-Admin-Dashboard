import { Layout } from '../components/layout/Layout';
import { NotificationStats } from '../components/notifications/NotificationStats';
import { NotificationList } from '../components/notifications/NotificationList';
import { CheckCheck, Trash2 } from 'lucide-react';

function Notifications() {
    return (
        <Layout>
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
                        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">5 unread</span>
                    </div>
                    <p className="text-slate-500 text-sm mt-1">Stay updated with order and payment activities</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
                        <CheckCheck className="w-4 h-4" />
                        <span>Mark all as read</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
                        <Trash2 className="w-4 h-4" />
                        <span>Clear read</span>
                    </button>
                </div>
            </div>

            <NotificationStats />
            <NotificationList />

        </Layout>
    );
}

export default Notifications;
