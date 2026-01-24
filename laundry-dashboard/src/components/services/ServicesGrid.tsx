import { Search } from 'lucide-react';
import { ServiceCard } from './ServiceCard';
import { useState } from 'react';
import { ServiceModal } from './ServiceModal';

const services = [
    {
        id: 'SRV-001',
        name: 'Wash & Fold',
        category: 'Standard',
        categoryColor: 'bg-blue-100 text-blue-700',
        price: '$2.50 per lb',
        turnaround: '24-48 hours',
        totalOrders: 456,
        createdDate: '2025-01-10',
        description: 'Professional washing, drying, and folding service for everyday clothing',
        status: 'Active'
    },
    {
        id: 'SRV-002',
        name: 'Dry Cleaning',
        category: 'Premium',
        categoryColor: 'bg-purple-100 text-purple-700',
        price: '$8.00 per item',
        turnaround: '48-72 hours',
        totalOrders: 289,
        createdDate: '2025-01-10',
        description: 'Premium dry cleaning for delicate fabrics and formal wear',
        status: 'Active'
    },
    {
        id: 'SRV-005',
        name: 'Iron Only',
        category: 'Standard',
        categoryColor: 'bg-blue-100 text-blue-700',
        price: '$1.50 per lb',
        turnaround: '24 hours',
        totalOrders: 523,
        createdDate: '2025-01-10',
        description: 'Professional ironing and pressing service',
        status: 'Active'
    },
    {
        id: 'SRV-007',
        name: 'Alterations',
        category: 'Specialty',
        categoryColor: 'bg-rose-100 text-rose-700',
        price: '$15.00 per item',
        turnaround: '5-7 days',
        totalOrders: 34,
        createdDate: '2025-01-08',
        description: 'Clothing alterations and repair services',
        status: 'Active'
    },
    {
        id: 'SRV-008',
        name: 'Stain Removal',
        category: 'Premium',
        categoryColor: 'bg-purple-100 text-purple-700',
        price: '$10.00 per item',
        turnaround: '48-72 hours',
        totalOrders: 92,
        createdDate: '2025-01-18',
        description: 'Advanced stain treatment for tough stains',
        status: 'Active'
    }
];

export function ServicesGrid() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<any>(null);

    const handleEdit = (service: any) => {
        setEditingService(service);
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search services by name, description, or category..."
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        {...service}
                        onEdit={() => handleEdit(service)}
                        onDelete={() => { }}
                    />
                ))}
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                <p className="text-sm text-slate-500">Showing {services.length} of {services.length} services</p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Previous</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-600/20">1</button>
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">2</button>
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Next</button>
                </div>
            </div>

            <ServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                service={editingService}
            />
        </div>
    );
}
