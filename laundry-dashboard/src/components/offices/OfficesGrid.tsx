import { Search, Plus } from 'lucide-react';
import { OfficeCard } from './OfficeCard';
import { useState, useEffect } from 'react';
import { OfficeModal } from './OfficeModal';
import { OfficeMapModal } from './OfficeMapModal';
import type { Office } from '../../types';
import { api } from '../../lib/api';


export function OfficesGrid() {
    const [offices, setOffices] = useState<Office[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [currentOffice, setCurrentOffice] = useState<Office | null>(null);

    useEffect(() => {
        const fetchOffices = async () => {
            try {
                const data = await api.get('/offices');
                setOffices(data);
            } catch (error) {
                console.error('Failed to fetch offices:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOffices();
    }, []);

    const [searchQuery, setSearchQuery] = useState('');

    const filteredOffices = offices.filter(office =>
        office.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        office.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        office.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        office.manager.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this office?')) return;

        try {
            await api.delete(`/offices/${id}`);
            setOffices(prev => prev.filter(o => o.id !== id));
        } catch (error) {
            console.error('Error deleting office:', error);
        }
    };

    const handleEdit = (office: Office) => {
        setCurrentOffice(office);
        setIsModalOpen(true);
    };

    const handleViewMap = (office: Office) => {
        setCurrentOffice(office);
        setIsMapModalOpen(true);
    };

    const handleSave = async (data: Partial<Office>) => {
        try {
            if (currentOffice) {
                // Update
                await api.put(`/offices/${currentOffice.id}`, data);
            } else {
                // Create
                await api.post('/offices', data);
            }

            // Refresh list
            const newData = await api.get('/offices');
            setOffices(newData);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving office:', error);
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center text-slate-500">Loading offices...</div>;
    }

    return (
        <div>
            <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by name, address, city, or manager..."
                        className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 shadow-sm text-slate-200 placeholder:text-slate-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button
                    onClick={() => { setCurrentOffice(null); setIsModalOpen(true); }}
                    className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20 whitespace-nowrap"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Office</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredOffices.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-slate-500">
                        No offices found matching "{searchQuery}"
                    </div>
                ) : (
                    filteredOffices.map((office) => (
                        <OfficeCard
                            key={office.id}
                            {...office}
                            onEdit={() => handleEdit(office)}
                            onDelete={() => handleDelete(office.id)}
                            onViewMap={() => handleViewMap(office)}
                        />
                    )))}
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-t border-slate-800 pt-6">
                <p className="text-sm text-slate-500">Showing {filteredOffices.length} offices</p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-slate-700 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800">Previous</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-600/20">1</button>
                    <button className="px-4 py-2 border border-slate-700 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800">2</button>
                    <button className="px-4 py-2 border border-slate-700 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800">Next</button>
                </div>
            </div>

            <OfficeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                office={currentOffice}
                onSave={handleSave}
            />

            <OfficeMapModal
                isOpen={isMapModalOpen}
                onClose={() => setIsMapModalOpen(false)}
                office={currentOffice}
            />
        </div>
    );
}
