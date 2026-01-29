import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



interface OrdersChartProps {
    data?: any[];
}

export function OrdersChart({ data }: OrdersChartProps) {
    const chartData = data || [];
    return (
        <div className="glass-card p-6 rounded-2xl border border-slate-800 h-full">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-200">Weekly Orders</h3>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
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
                            cursor={{ fill: '#1e293b' }}
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                borderRadius: '12px',
                                border: '1px solid #1e293b',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.5)',
                                color: '#f1f5f9'
                            }}
                        />
                        <Bar
                            dataKey="orders"
                            fill="#8b5cf6"
                            radius={[6, 6, 0, 0]}
                            barSize={32}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
