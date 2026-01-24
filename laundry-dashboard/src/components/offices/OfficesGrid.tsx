import { Search } from 'lucide-react';
import { OfficeCard } from './OfficeCard';
import { useState } from 'react';
import { OfficeModal } from './OfficeModal';
import { OfficeMapModal } from './OfficeMapModal';

const offices = [
    {
        id: 'OFF-001',
        name: 'Manhattan Central Office',
        address: '123 Broadway',
        city: 'New York',
        state: 'NY',
        zip: '10013',
        phone: '+1 (212) 555-0100',
        email: 'manhattan@laundryhub.com',
        hours: '08:00 - 20:00',
        openTime: '08:00 AM',
        closeTime: '08:00 PM',
        manager: 'Sarah Johnson',
        totalOrders: 1245,
        isOpen: true,
        lat: '40.7831',
        lng: '-73.9712'
    },
    {
        id: 'OFF-002',
        name: 'Brooklyn Heights Branch',
        address: '456 Atlantic Avenue',
        city: 'Brooklyn',
        state: 'NY',
        zip: '11201',
        phone: '+1 (718) 555-0200',
        email: 'brooklyn@laundryhub.com',
        hours: '07:00 - 21:00',
        openTime: '07:00 AM',
        closeTime: '09:00 PM',
        manager: 'Michael Chen',
        totalOrders: 987,
        isOpen: true,
        lat: '40.6925',
        lng: '-73.9950'
    },
    {
        id: 'OFF-003',
        name: 'Queens Express Center',
        address: '789 Queens Boulevard',
        city: 'Queens',
        state: 'NY',
        zip: '11375',
        phone: '+1 (718) 555-0300',
        email: 'queens@laundryhub.com',
        hours: '09:00 - 18:00',
        openTime: '09:00 AM',
        closeTime: '06:00 PM',
        manager: 'David Miller',
        totalOrders: 654,
        isOpen: false, // Closed temporarily
        lat: '40.7282',
        lng: '-73.7949'
    },
    {
        id: 'OFF-004',
        name: 'Bronx Service Hub',
        address: '321 Grand Concourse',
        city: 'Bronx',
        state: 'NY',
        zip: '10451',
        phone: '+1 (718) 555-0400',
        email: 'bronx@laundryhub.com',
        hours: '08:00 - 20:00',
        openTime: '08:00 AM',
        closeTime: '08:00 PM',
        manager: 'Emily Davis',
        totalOrders: 432,
        isOpen: true,
        lat: '40.8167',
        lng: '-73.9261'
    },
    {
        id: 'OFF-005',
        name: 'Staten Island Location',
        address: '147 Victory Boulevard',
        city: 'Staten Island',
        state: 'NY',
        zip: '10301',
        phone: '+1 (718) 555-0500',
        email: 'statenisland@laundryhub.com',
        hours: '09:00 - 17:00',
        openTime: '09:00 AM',
        closeTime: '05:00 PM',
        manager: 'Jennifer Lee',
        totalOrders: 298,
        isOpen: true,
        lat: '40.6401',
        lng: '-74.0768'
    }
];

export function OfficesGrid() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [currentOffice, setCurrentOffice] = useState<any>(null);

    const handleEdit = (office: any) => {
        setCurrentOffice(office);
        setIsModalOpen(true);
    };

    const handleViewMap = (office: any) => {
        setCurrentOffice(office);
        setIsMapModalOpen(true);
    };

    return (
        <div>
            <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by name, address, city, or manager..."
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {offices.map((office) => (
                    <OfficeCard
                        key={office.id}
                        {...office}
                        onEdit={() => handleEdit(office)}
                        onDelete={() => { }}
                        onViewMap={() => handleViewMap(office)}
                    />
                ))}
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                <p className="text-sm text-slate-500">Showing {offices.length} of {offices.length} offices</p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Previous</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-600/20">1</button>
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">2</button>
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Next</button>
                </div>
            </div>

            <OfficeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                office={currentOffice}
            />

            <OfficeMapModal
                isOpen={isMapModalOpen}
                onClose={() => setIsMapModalOpen(false)}
                office={currentOffice}
            />
        </div>
    );
}
