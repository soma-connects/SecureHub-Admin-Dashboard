import { Edit2, Trash2, Map, MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

interface OfficeCardProps {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
    hours: string; // e.g., "08:00 - 20:00"
    manager: string;
    totalOrders: number;
    isOpen: boolean;
    onViewMap: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export function OfficeCard({
    id,
    name,
    address,
    city,
    state,
    zip,
    phone,
    email,
    hours,
    manager,
    totalOrders,
    isOpen,
    onViewMap,
    onEdit,
    onDelete
}: OfficeCardProps) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">{name}</h3>
                    <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${isOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                            {isOpen && <CheckCircle className="w-3 h-3" />}
                            {isOpen ? 'Open' : 'Closed'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                    <p className="text-sm text-slate-600">{address}, {city}, {state} {zip}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <p className="text-sm text-slate-600">{phone}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <p className="text-sm text-slate-600">{email}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <p className="text-sm text-slate-600">{hours}</p>
                </div>
            </div>

            <div className="flex justify-between items-center py-4 border-t border-b border-slate-50 mb-6">
                <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Manager</p>
                    <p className="text-sm font-semibold text-slate-900">{manager}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Total Orders</p>
                    <p className="text-sm font-semibold text-slate-900">{totalOrders}</p>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <button
                    onClick={onViewMap}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-100 transition-colors"
                >
                    <Map className="w-4 h-4" />
                    <span>View Map</span>
                </button>
                <div className="flex gap-3">
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
            </div>

            <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center text-xs text-slate-400">
                <span>ID: {id}</span>
                <span>Created: 2025-01-12</span>
            </div>
        </div>
    );
}
