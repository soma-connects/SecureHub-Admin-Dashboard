import { X, Clock } from 'lucide-react';
import type { Office } from '../../types';

interface OfficeModalProps {
    isOpen: boolean;
    onClose: () => void;
    office?: Office | null;
}

export function OfficeModal({ isOpen, onClose, office }: OfficeModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold text-slate-100">
                        {office ? 'Edit Office Location' : 'Add New Office Location'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Office Name</label>
                        <input
                            type="text"
                            defaultValue={office?.name}
                            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                            placeholder="e.g., Manhattan Central Office"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Street Address</label>
                        <input
                            type="text"
                            defaultValue={office?.address}
                            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                            placeholder="e.g., 123 Main Street"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">City</label>
                            <input
                                type="text"
                                defaultValue={office?.city}
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                                placeholder="e.g., New York"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">State</label>
                            <input
                                type="text"
                                defaultValue={office?.state}
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                                placeholder="e.g., NY"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">ZIP Code</label>
                            <input
                                type="text"
                                defaultValue={office?.zip}
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                                placeholder="e.g., 10001"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Country</label>
                            <input
                                type="text"
                                defaultValue="USA"
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                                placeholder="USA"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Phone Number</label>
                            <input
                                type="text"
                                defaultValue={office?.phone}
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                                placeholder="e.g., +1 (212) 555-0100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
                            <input
                                type="email"
                                defaultValue={office?.email}
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                                placeholder="e.g., office@laundryhub.com"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Opening Hours</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                                <input
                                    type="text"
                                    defaultValue={office?.openTime || "08:00 AM"}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Closing Hours</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                                <input
                                    type="text"
                                    defaultValue={office?.closeTime || "08:00 PM"}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Manager Name</label>
                        <input
                            type="text"
                            defaultValue={office?.manager}
                            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                            placeholder="e.g., John Doe"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Latitude</label>
                            <input
                                type="text"
                                defaultValue={office?.lat}
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                                placeholder="e.g., 40.7831"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Longitude</label>
                            <input
                                type="text"
                                defaultValue={office?.lng}
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                                placeholder="e.g., -73.9712"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <input type="checkbox" id="active" className="w-4 h-4 text-blue-600 rounded border-slate-700 bg-slate-900 focus:ring-blue-500 focus:ring-offset-slate-900" defaultChecked={office?.isOpen !== false} />
                        <label htmlFor="active" className="text-sm font-medium text-slate-300">Office is currently open for business</label>
                    </div>
                </div>

                <div className="p-6 border-t border-slate-800 flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 border border-slate-700 rounded-lg text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
                        {office ? 'Update Office' : 'Create Office'}
                    </button>
                </div>
            </div>
        </div>
    );
}
