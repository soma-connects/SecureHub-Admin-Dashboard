import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



interface RevenueChartProps {
    data?: any[];
}

export function RevenueChart({ data }: RevenueChartProps) {
    // Default valid mock data if loading/empty
    const chartData = data && data.length > 0 ? data : [
        { name: 'Mon', value: 0 },
        { name: 'Tue', value: 0 },
    ];
    return (
        <div className="glass-card p-6 rounded-2xl border border-slate-800 h-full">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-200">Revenue Overview</h3>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                borderRadius: '12px',
                                border: '1px solid #1e293b',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.5)',
                                color: '#f1f5f9'
                            }}
                            itemStyle={{ color: '#22d3ee' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#06b6d4"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
