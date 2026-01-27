import { Layout } from '../components/layout/Layout';
import { OfficesStats } from '../components/offices/OfficesStats';
import { OfficesGrid } from '../components/offices/OfficesGrid';

function Offices() {
    return (
        <Layout>
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100">Office Locations</h1>
                    <p className="text-slate-400 text-sm mt-1">Manage laundry service office locations</p>
                </div>
            </div>

            <OfficesStats />
            <OfficesGrid />
        </Layout>
    );
}

export default Offices;
