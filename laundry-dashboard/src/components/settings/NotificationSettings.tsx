import { Bell, Mail } from 'lucide-react';
import { useState } from 'react';

export function NotificationSettings() {
    const [toggles, setToggles] = useState({
        emailOrders: true,
        emailPromo: false,
        pushOrders: true,
        pushSystem: true,
    });

    const toggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="space-y-6">
            <div className="glass-card p-6 rounded-xl border border-slate-800">
                <h3 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    Email Notifications
                </h3>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-300 font-medium">Order Updates</p>
                            <p className="text-slate-500 text-sm">Receive emails about new orders and status changes.</p>
                        </div>
                        <button
                            onClick={() => toggle('emailOrders')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${toggles.emailOrders ? 'bg-blue-600' : 'bg-slate-700'}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles.emailOrders ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                    <div className="h-px bg-slate-800" />
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-300 font-medium">Marketing & Promotions</p>
                            <p className="text-slate-500 text-sm">Receive emails about new features and special offers.</p>
                        </div>
                        <button
                            onClick={() => toggle('emailPromo')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${toggles.emailPromo ? 'bg-blue-600' : 'bg-slate-700'}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles.emailPromo ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="glass-card p-6 rounded-xl border border-slate-800">
                <h3 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-pink-400" />
                    Push Notifications
                </h3>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-300 font-medium">New Orders & Tasks</p>
                            <p className="text-slate-500 text-sm">Get real-time alerts for urgent tasks.</p>
                        </div>
                        <button
                            onClick={() => toggle('pushOrders')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${toggles.pushOrders ? 'bg-blue-600' : 'bg-slate-700'}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles.pushOrders ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                    <div className="h-px bg-slate-800" />
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-300 font-medium">System Alerts</p>
                            <p className="text-slate-500 text-sm">Notifications about system maintenance and issues.</p>
                        </div>
                        <button
                            onClick={() => toggle('pushSystem')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${toggles.pushSystem ? 'bg-blue-600' : 'bg-slate-700'}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles.pushSystem ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
