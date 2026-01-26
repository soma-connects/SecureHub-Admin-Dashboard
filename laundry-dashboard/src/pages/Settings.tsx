import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { GeneralSettings } from '../components/settings/GeneralSettings';
import { SecuritySettings } from '../components/settings/SecuritySettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { User, Shield, Bell } from 'lucide-react';
import { clsx } from 'clsx';

function Settings() {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'General', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-100">Settings</h1>
                <p className="text-slate-400 text-sm mt-1">Configure your admin panel preferences</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="glass-card p-2 rounded-xl border border-slate-800 sticky top-24">
                        <nav className="space-y-1">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={clsx(
                                            "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all",
                                            isActive
                                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                                        )}
                                    >
                                        <Icon className={clsx("w-5 h-5", isActive ? "text-white" : "text-slate-500")} />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                        {activeTab === 'general' && <GeneralSettings />}
                        {activeTab === 'security' && <SecuritySettings />}
                        {activeTab === 'notifications' && <NotificationSettings />}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Settings;
