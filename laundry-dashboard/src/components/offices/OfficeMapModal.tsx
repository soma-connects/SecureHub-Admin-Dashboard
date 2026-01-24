import { X, MapPin, Clock, Phone, Mail } from 'lucide-react';

interface OfficeMapModalProps {
    isOpen: boolean;
    onClose: () => void;
    office: any; // In real app, use proper type
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

                {/* Mock Map View */}
                <div className="h-64 bg-slate-50 relative border-b border-slate-100">
                    <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 pointer-events-none opacity-10">
                        {Array.from({ length: 72 }).map((_, i) => (
                            <div key={i} className="border border-slate-300"></div>
                        ))}
                    </div>

                    {/* Map Center Pin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 animate-bounce">
                            <MapPin className="text-white w-6 h-6" />
                        </div>
                        <div className="w-4 h-2 bg-black/20 rounded-full blur-sm mt-1"></div>
                    </div>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-md border border-slate-100 text-center">
                        <p className="text-xs font-bold text-slate-900">{office.name}</p>
                        <p className="text-[10px] text-slate-500">{office.address}</p>
                        <p className="text-[10px] text-blue-500 mt-0.5">Lat: {office.lat} Lng: {office.lng}</p>
                    </div>
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
