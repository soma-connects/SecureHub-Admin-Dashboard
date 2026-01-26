import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { time: '10:00', rps: 400, errors: 2 },
    { time: '10:05', rps: 300, errors: 4 },
    { time: '10:10', rps: 550, errors: 1 },
    { time: '10:15', rps: 450, errors: 5 },
    { time: '10:20', rps: 600, errors: 3 },
    { time: '10:25', rps: 700, errors: 8 },
    { time: '10:30', rps: 500, errors: 2 },
];

export function SystemMetrics() {
    return (
        <div className="glass-panel p-6 rounded-2xl h-full flex flex-col">
            <h3 className="text-slate-200 font-semibold mb-6 flex items-center gap-2 flex-shrink-0">
                <span className="w-2 h-2 bg-violet-500 rounded-full" />
                System Throughput (RPS)
            </h3>
            <div className="flex-1 min-h-0 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorRps" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="time"
                            stroke="#64748b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#64748b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                border: '1px solid #1e293b',
                                borderRadius: '8px',
                                color: '#f1f5f9'
                            }}
                            itemStyle={{ color: '#8b5cf6' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="rps"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorRps)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
