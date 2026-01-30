import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Settings,
    MapPin,
    Bell,
    Shirt,
    LogOut
} from 'lucide-react';
import { clsx } from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const location = useLocation();
    const { user, logout } = useAuth();

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
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            <aside className={clsx(
                "w-64 glass-panel border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 z-50 transition-transform duration-300 lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-violet-600/20 border border-violet-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/10">
                            <Shirt className="text-violet-400 w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-100 tracking-tight">LaundryHub</h1>
                            <p className="text-xs text-slate-400 font-medium">Microservices Admin</p>
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
                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                        isActive
                                            ? "bg-violet-600/10 text-violet-300 border border-violet-500/20 shadow-md shadow-violet-500/5"
                                            : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                                    )}
                                >
                                    {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-violet-500 rounded-r-full" />}
                                    <item.icon className={clsx("w-5 h-5", isActive ? "text-violet-400" : "text-slate-500 group-hover:text-slate-300")} />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-slate-800/50">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/30 border border-slate-700/30 mb-4">
                        <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300 font-bold text-sm">
                            {(user?.name || 'AD').substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-semibold text-slate-200 truncate">{user?.name || 'Admin User'}</p>
                            <p className="text-xs text-slate-500 truncate">{user?.email || 'admin@laundryhub.com'}</p>
                        </div>
                        <button
                            onClick={logout}
                            className="p-1.5 hover:bg-slate-700/50 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                            title="Sign Out"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
