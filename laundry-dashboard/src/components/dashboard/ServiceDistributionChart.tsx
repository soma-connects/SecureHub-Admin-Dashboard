import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { name: 'Wash & Fold', value: 400, color: '#0ea5e9' }, // sky-500
    { name: 'Dry Cleaning', value: 300, color: '#06b6d4' }, // cyan-500
    { name: 'Iron Only', value: 200, color: '#f59e0b' }, // amber-500
    { name: 'Express Service', value: 100, color: '#6ae2d6' }, // custom teal-ish
];

export function ServiceDistributionChart() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
            <div className="mb-2">
                <h3 className="text-lg font-bold text-slate-900">Service Distribution</h3>
            </div>

            <div className="flex items-center justify-between flex-1 min-h-[250px]">
                {/* Chart Section */}
                <div className="w-[180px] h-[180px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Centered Total or Label if needed, or just empty center */}
                </div>

                {/* Custom Legend Section */}
                <div className="flex-1 pl-4">
                    <div className="flex flex-col gap-4">
                        {data.map((item, index) => (
                            <div key={index} className="flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-3 h-3 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                                        {item.name}
                                    </span>
                                </div>
                                <span className="text-sm font-bold text-slate-900">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
