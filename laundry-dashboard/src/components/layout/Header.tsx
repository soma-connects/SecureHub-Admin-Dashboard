import { DateRangePicker } from '../common/DateRangePicker';
import { useLocation } from 'react-router-dom';
import { useDateRange } from '../../context/DateRangeContext';

export function Header() {
    const location = useLocation();
    const isDashboard = location.pathname === '/';
    const { setDateRange } = useDateRange();

    return (
        <header className="fixed top-0 right-0 left-64 h-20 glass-panel border-b border-slate-800 flex items-center justify-between px-8 z-40 transition-all duration-300">
            <div></div>

            <div className="flex items-center gap-6">
                {isDashboard && (
                    <div className="relative hidden md:block">
                        <DateRangePicker onChange={setDateRange} />
                    </div>
                )}
            </div>
        </header>
    );
}
