import { User, Building, Mail, Save, Moon, Sun } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';
import { useState } from 'react';

export function GeneralSettings() {
    const { theme, setTheme } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: 'Admin User',
        email: 'admin@laundryhub.com',
        bio: 'System Administrator for LaundryHub Microservices.',
        companyName: 'LaundryHub Inc.',
        contactEmail: 'support@laundryhub.com'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        alert('Settings saved successfully!');
    };

    return (
        <div className="space-y-6">
            <div className="glass-card p-6 rounded-xl border border-slate-800">
                <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
                    <Sun className="w-5 h-5 text-amber-400" />
                    Appearance
                </h3>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setTheme('light')}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${theme === 'light'
                            ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                            : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800'
                            }`}
                    >
                        <Sun className="w-4 h-4" />
                        <span className="font-medium">Light</span>
                    </button>
                    <button
                        onClick={() => setTheme('dark')}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${theme === 'dark'
                            ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                            : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800'
                            }`}
                    >
                        <Moon className="w-4 h-4" />
                        <span className="font-medium">Dark</span>
                    </button>
                </div>
            </div>

            <div className="glass-card p-6 rounded-xl border border-slate-800">
                <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-400" />
                    Profile Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-400 mb-1">Bio</label>
                        <textarea
                            rows={3}
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>
                </div>
            </div>

            <div className="glass-card p-6 rounded-xl border border-slate-800">
                <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
                    <Building className="w-5 h-5 text-purple-400" />
                    Company Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Contact Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="email"
                                name="contactEmail"
                                value={formData.contactEmail}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Save className="w-4 h-4" />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
}
