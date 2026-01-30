import { X } from 'lucide-react';
import type { Service } from '../../types';

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    service?: Service | null;
    onSave: (data: any) => void;
}

export function ServiceModal({ isOpen, onClose, service, onSave }: ServiceModalProps) {
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data: any = Object.fromEntries(formData.entries());

        // Simple checkboxes are not included in formData if unchecked, but here we default checked so it might be
        // We'll manually handle the active state if needed, but for now let's assume standard form behavior.
        // Actually, let's explicitly handle numeric conversion for price
        if (data.price) {
            data.price = parseFloat(data.price);
        }

        onSave(data);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between p-6 border-b border-slate-800">
                        <h2 className="text-xl font-bold text-slate-100">
                            {service ? 'Edit Service' : 'Add New Service'}
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Service Name</label>
                            <input
                                name="name"
                                type="text"
                                defaultValue={service?.name}
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                                placeholder="e.g. Wash & Fold"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Description</label>
                            <textarea
                                name="description"
                                rows={3}
                                defaultValue={service?.description}
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                                placeholder="Describe the service details..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Base Price ($)</label>
                                <input
                                    name="price"
                                    type="text"
                                    defaultValue={service?.price?.toString().replace(/[^0-9.]/g, '')}
                                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Price Unit</label>
                                <select
                                    name="price_unit"
                                    defaultValue={service?.price_unit || "per lb"}
                                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                                >
                                    <option value="per lb">per lb</option>
                                    <option value="per item">per item</option>
                                    <option value="per set">per set</option>
                                    <option value="per hour">per hour</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Turnaround Time</label>
                                <input
                                    name="turnaround"
                                    type="text"
                                    defaultValue={service?.turnaround}
                                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                                    placeholder="e.g. 24-48 hours"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Category</label>
                                <select
                                    name="category"
                                    defaultValue={service?.category || "Standard"}
                                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                                >
                                    <option value="Standard">Standard</option>
                                    <option value="Premium">Premium</option>
                                    <option value="Specialty">Specialty</option>
                                    <option value="Household">Household</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                            <input
                                name="active"
                                type="checkbox"
                                id="active"
                                className="w-4 h-4 text-blue-600 rounded border-slate-700 bg-slate-900 focus:ring-blue-500 focus:ring-offset-slate-900"
                                defaultChecked={service ? service.status === 'Active' : true}
                            />
                            <label htmlFor="active" className="text-sm font-medium text-slate-300">Service is active and available to customers</label>
                        </div>
                    </div>

                    <div className="p-6 border-t border-slate-800 flex gap-3 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 border border-slate-700 rounded-lg text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
                            {service ? 'Update Service' : 'Create Service'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
