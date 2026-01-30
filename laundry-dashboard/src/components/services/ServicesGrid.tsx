import { Search, Plus } from 'lucide-react';
import { ServiceCard } from './ServiceCard';
import { useState, useEffect } from 'react';
import { ServiceModal } from './ServiceModal';
import type { Service } from '../../types';
import { api } from '../../lib/api';


export function ServicesGrid() {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const data = await api.get('/services');
            setServices(data);
        } catch (error) {
            console.error('Failed to fetch services:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingService(null);
        setIsModalOpen(true);
    };

    const handleSave = async (data: any) => {
        try {
            if (editingService) {
                await api.put(`/services/${editingService.id}`, data);
            } else {
                await api.post('/services', data);
            }
            fetchServices();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving service:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;
        try {
            await api.delete(`/services/${id}`);
            fetchServices();
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 shadow-sm text-slate-200 placeholder:text-slate-500"
                    />
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20 whitespace-nowrap"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Service</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredServices.map((service) => (
                    <ServiceCard
                        key={service.id}
                        {...service}
                        onEdit={() => handleEdit(service)}
                        onDelete={() => handleDelete(service.id)}
                    />
                ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-t border-slate-800 pt-6">
                <p className="text-sm text-slate-500">Showing {filteredServices.length} of {services.length} services</p>
                {/* Pagination placeholder */}
            </div>

            <ServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                service={editingService}
                onSave={handleSave}
            />
        </div>
    );
}
