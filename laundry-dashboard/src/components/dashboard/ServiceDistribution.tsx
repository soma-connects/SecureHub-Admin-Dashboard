import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ServiceDistributionProps {
    data: {
        name: string;
        value: number;
        color?: string;
    }[];
}

const COLORS = ['#06b6d4', '#8b5cf6', '#3b82f6', '#f59e0b', '#ec4899'];

export function ServiceDistribution({ data }: ServiceDistributionProps) {
    const chartData = data && data.length > 0 ? data : [
        { name: 'Wash & Fold', value: 400 },
        { name: 'Dry Cleaning', value: 300 },
        { name: 'Iron Only', value: 200 },
        { name: 'Express', value: 100 }
    ];

    return (
        <div className="glass-panel p-6 rounded-2xl h-full flex flex-col">
            <h3 className="text-lg font-bold text-slate-100 mb-6">Service Distribution</h3>
            <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {chartData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                borderRadius: '12px',
                                border: '1px solid #1e293b',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.5)',
                                color: '#f1f5f9'
                            }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            formatter={(value) => <span style={{ color: '#cbd5e1' }}>{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
