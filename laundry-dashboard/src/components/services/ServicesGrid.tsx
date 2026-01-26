import { Search } from 'lucide-react';
import { ServiceCard } from './ServiceCard';
import { useState, useEffect } from 'react';
import { ServiceModal } from './ServiceModal';
import type { Service } from '../../types';

export function ServicesGrid() {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/services');
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error('Failed to fetch services:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setIsModalOpen(true);
    };

    if (isLoading) {
        return <div className="p-8 text-center text-slate-500">Loading services...</div>;
    }

    return (
        <div>
            <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search services by name, description, or category..."
                        className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 shadow-sm text-slate-200 placeholder:text-slate-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        {...service}
                        onEdit={() => handleEdit(service)}
                        onDelete={() => { }}
                    />
                ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-t border-slate-800 pt-6">
                <p className="text-sm text-slate-500">Showing {services.length} of {services.length} services</p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-slate-700 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800">Previous</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-600/20">1</button>
                    <button className="px-4 py-2 border border-slate-700 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800">2</button>
                    <button className="px-4 py-2 border border-slate-700 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800">Next</button>
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
