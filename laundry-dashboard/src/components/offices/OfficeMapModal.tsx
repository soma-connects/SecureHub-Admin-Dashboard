import { X, Clock, Phone, Mail } from 'lucide-react';
import type { Office } from '../../types';

interface OfficeMapModalProps {
    isOpen: boolean;
    onClose: () => void;
    office: Office | null; // In real app, use proper type
}

export function OfficeMapModal({ isOpen, onClose, office }: OfficeMapModalProps) {
    if (!isOpen || !office) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">{office.name}</h2>
                        <p className="text-sm text-slate-500">{office.address}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Google Map Embed */}
                <div className="h-64 bg-slate-100 relative border-b border-slate-200">
                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        title="Office Location"
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        src={`https://maps.google.com/maps?q=${office.lat},${office.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                        className="w-full h-full"
                    ></iframe>
                </div>

                <div className="p-6 grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <Phone className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">Phone</p>
                            <p className="text-sm font-semibold text-slate-900">{office.phone}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                            <Clock className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">Hours</p>
                            <p className="text-sm font-semibold text-slate-900">{office.hours}</p>
                        </div>
                    </div>
                    <div className="col-span-2 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-4 h-4 text-violet-600" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">Email</p>
                            <p className="text-sm font-semibold text-slate-900">{office.email}</p>
                        </div>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 mt-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${office.isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                        <span className="text-sm font-medium text-slate-900">Status: {office.isOpen ? 'Open' : 'Closed'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
