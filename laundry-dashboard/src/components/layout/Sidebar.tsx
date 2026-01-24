import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Settings,
    MapPin,
    Bell,
    Shirt
} from 'lucide-react';
import { clsx } from 'clsx';
import { Link, useLocation } from 'react-router-dom';

export function Sidebar() {
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: ShoppingBag, label: 'Orders', path: '/orders' },
        { icon: Users, label: 'Customers', path: '/customers' },
        { icon: Shirt, label: 'Services', path: '/services' },
        { icon: MapPin, label: 'Offices', path: '/offices' },
        { icon: Bell, label: 'Notifications', path: '/notifications' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 z-50 transition-all duration-300">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-cyan-700 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-700/20">
                        <Shirt className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">LaundryHub</h1>
                        <p className="text-xs text-slate-500 font-medium">Admin Panel</p>
                    </div>
                </div>

                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                    isActive
                                        ? "bg-cyan-700 text-white shadow-md shadow-cyan-700/20"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <item.icon className={clsx("w-5 h-5", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600")} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-slate-50">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 mb-4">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold text-sm">
                        AD
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-semibold text-slate-900 truncate">Admin User</p>
                        <p className="text-xs text-slate-500 truncate">admin@laundryhub.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
