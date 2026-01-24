import { ChevronDown, Calendar } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export function Header() {
    const location = useLocation();
    const isDashboard = location.pathname === '/';

    return (
        <header className="fixed top-0 right-0 left-64 h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-40 transition-all duration-300">
            <div></div>

            <div className="flex items-center gap-6">
                {isDashboard && (
                    <div className="relative hidden md:block">
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-100 transition-colors">
                            <Calendar className="w-4 h-4 text-slate-500" />
                            <span>Last 7 days</span>
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
