import { useEffect, useRef, useState } from 'react';
import { Terminal, Circle } from 'lucide-react';

interface LogEntry {
    id: number;
    timestamp: string;
    level: 'INFO' | 'WARN' | 'ERROR';
    service: string;
    message: string;
}

export function LiveLogStream() {
    const [logs, setLogs] = useState<LogEntry[]>([
        { id: 1, timestamp: '10:30:05', level: 'INFO', service: 'auth-service', message: 'User login successful: admin@laundryhub.com' },
        { id: 2, timestamp: '10:30:08', level: 'INFO', service: 'order-service', message: 'Processing order #ORD-2024-001' },
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newLog: LogEntry = {
                id: Date.now(),
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
                level: Math.random() > 0.9 ? 'ERROR' : Math.random() > 0.7 ? 'WARN' : 'INFO',
                service: Math.random() > 0.5 ? 'order-service' : 'payment-gateway',
                message: Math.random() > 0.5 ? 'Health check passed' : 'Syncing database replicas...'
            };
            setLogs(prev => [...prev.slice(-20), newLog]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'INFO': return 'text-emerald-400';
            case 'WARN': return 'text-amber-400';
            case 'ERROR': return 'text-rose-400';
            default: return 'text-slate-400';
        }
    };

    return (
        <div className="glass-panel rounded-2xl p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <h3 className="text-slate-200 font-semibold flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-slate-400" />
                    Live System Logs
                </h3>
                <div className="flex items-center gap-2 px-2 py-1 rounded bg-slate-900/50 border border-slate-800">
                    <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono text-emerald-400">LIVE</span>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto font-mono text-xs space-y-2 pr-2 scrollbar-thin scrollbar-thumb-slate-700 h-[280px]"
            >
                {logs.map((log) => (
                    <div key={log.id} className="grid grid-cols-12 gap-2 text-slate-400 hover:bg-slate-800/30 p-1.5 rounded transition-colors items-start">
                        <span className="col-span-2 text-slate-500 shrink-0">{log.timestamp}</span>
                        <span className={`col-span-2 font-bold shrink-0 ${getLevelColor(log.level)}`}>{log.level}</span>
                        <span className="col-span-3 text-violet-400 shrink-0 truncate">[{log.service}]</span>
                        <span className="col-span-5 text-slate-300 break-words">{log.message}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
