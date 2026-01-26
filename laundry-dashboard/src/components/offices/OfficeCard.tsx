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
        <div className="glass-card rounded-2xl p-6 border border-slate-800">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-slate-200 text-lg mb-1">{name}</h3>
                    <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${isOpen ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                            {isOpen && <CheckCircle className="w-3 h-3" />}
                            {isOpen ? 'Open' : 'Closed'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-slate-500 mt-0.5" />
                    <p className="text-sm text-slate-300">{address}, {city}, {state} {zip}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <p className="text-sm text-slate-300">{phone}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <p className="text-sm text-slate-300">{email}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <p className="text-sm text-slate-300">{hours}</p>
                </div>
            </div>

            <div className="flex justify-between items-center py-4 border-t border-b border-slate-800 mb-6">
                <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Manager</p>
                    <p className="text-sm font-semibold text-slate-200">{manager}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Total Orders</p>
                    <p className="text-sm font-semibold text-slate-200">{totalOrders}</p>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <button
                    onClick={onViewMap}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                    <Map className="w-4 h-4" />
                    <span>View Map</span>
                </button>
                <div className="flex gap-3">
                    <button
                        onClick={onEdit}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-700 rounded-lg text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors"
                    >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                    </button>
                    <button
                        onClick={onDelete}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/10 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                    </button>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
                <span>ID: {id}</span>
                <span>Created: 2025-01-12</span>
            </div>
        </div>
    );
}
