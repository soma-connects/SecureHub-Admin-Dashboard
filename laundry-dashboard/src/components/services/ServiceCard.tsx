import { Edit2, Trash2, CheckCircle } from 'lucide-react';

interface ServiceCardProps {
    id: string;
    name: string;
    category: string; // 'Standard' | 'Premium' | 'Specialty'
    categoryColor: string; // bg-blue-100 text-blue-700
    description: string;
    price: string;
    turnaround: string;
    totalOrders: number;
    createdDate: string;
    onEdit: () => void;
    onDelete: () => void;
}

export function ServiceCard({
    id,
    name,
    category,
    categoryColor,
    description,
    price,
    turnaround,
    totalOrders,
    createdDate,
    onEdit,
    onDelete
}: ServiceCardProps) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <h3 className="font-bold text-slate-900 text-lg">{name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColor}`}>
                        {category}
                    </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle className="w-5 h-5" />
                </div>
            </div>

            <p className="text-sm text-slate-500 mb-6 min-h-[40px]">{description}</p>

            <div className="grid grid-cols-3 gap-4 mb-8 border-t border-b border-slate-50 py-4">
                <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Price</p>
                    <p className="text-sm font-semibold text-slate-900">{price}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Turnaround</p>
                    <p className="text-sm font-semibold text-slate-900">{turnaround}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Total Orders</p>
                    <p className="text-sm font-semibold text-slate-900">{totalOrders}</p>
                </div>
            </div>

            <div className="flex gap-3 mb-6">
                <button
                    onClick={onEdit}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit</span>
                </button>
                <button
                    onClick={onDelete}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                </button>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Service ID: {id}</span>
                <span>Created: {createdDate}</span>
            </div>
        </div>
    );
}
