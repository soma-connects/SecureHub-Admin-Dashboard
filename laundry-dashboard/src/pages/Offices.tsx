import { Layout } from '../components/layout/Layout';
import { OfficesStats } from '../components/offices/OfficesStats';
import { OfficesGrid } from '../components/offices/OfficesGrid';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { OfficeModal } from '../components/offices/OfficeModal';

function Offices() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Layout>
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100">Office Locations</h1>
                    <p className="text-slate-400 text-sm mt-1">Manage laundry service office locations</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Office</span>
                </button>
            </div>

            <OfficesStats />
            <OfficesGrid />

            <OfficeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </Layout>
    );
}

export default Offices;
