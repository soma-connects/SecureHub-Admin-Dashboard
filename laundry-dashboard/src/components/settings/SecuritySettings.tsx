import { Shield, Key, Smartphone, History } from 'lucide-react';
import { useState } from 'react';

export function SecuritySettings() {
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleUpdatePassword = () => {
        if (passwords.new !== passwords.confirm) {
            alert('Passwords do not match!');
            return;
        }
        alert('Password updated successfully!');
        setPasswords({ current: '', new: '', confirm: '' });
    };

    return (
        <div className="space-y-6">
            <div className="glass-card p-6 rounded-xl border border-slate-800">
                <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
                    <Key className="w-5 h-5 text-emerald-400" />
                    Change Password
                </h3>
                <div className="space-y-4 max-w-md">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Current Password</label>
                        <input
                            type="password"
                            name="current"
                            value={passwords.current}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">New Password</label>
                        <input
                            type="password"
                            name="new"
                            value={passwords.new}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirm"
                            value={passwords.confirm}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>
                    <button
                        onClick={handleUpdatePassword}
                        className="px-4 py-2 bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
                    >
                        Update Password
                    </button>
                </div>
            </div>

            <div className="glass-card p-6 rounded-xl border border-slate-800">
                <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    Two-Factor Authentication
                </h3>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-slate-300 font-medium">Enable 2FA</p>
                        <p className="text-slate-500 text-sm">Add an extra layer of security to your account.</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-700">
                        <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-slate-400 transition" />
                    </button>
                </div>
            </div>

            <div className="glass-card p-6 rounded-xl border border-slate-800">
                <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
                    <History className="w-5 h-5 text-amber-400" />
                    Login History
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-900/50">
                            <tr>
                                <th className="px-4 py-3">Device</th>
                                <th className="px-4 py-3">Location</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            <tr>
                                <td className="px-4 py-3 text-slate-300 flex items-center gap-2">
                                    <Smartphone className="w-4 h-4 text-slate-500" />
                                    Chrome on Windows
                                </td>
                                <td className="px-4 py-3 text-slate-400">New York, USA</td>
                                <td className="px-4 py-3 text-slate-400">Today, 10:42 AM</td>
                                <td className="px-4 py-3 text-emerald-400">Active Now</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 text-slate-300 flex items-center gap-2">
                                    <Smartphone className="w-4 h-4 text-slate-500" />
                                    Safari on iPhone
                                </td>
                                <td className="px-4 py-3 text-slate-400">New York, USA</td>
                                <td className="px-4 py-3 text-slate-400">Yesterday, 8:15 PM</td>
                                <td className="px-4 py-3 text-slate-500">Logged Out</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
