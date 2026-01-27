import { Layout } from '../components/layout/Layout';
import { ServicesGrid } from '../components/services/ServicesGrid';
import { ServicesStats } from '../components/services/ServicesStats';

function Services() {
    return (
        <Layout>
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100">Services Management</h1>
                    <p className="text-slate-400 text-sm mt-1">Manage laundry services and pricing</p>
                </div>
            </div>

            <ServicesStats />
            <ServicesGrid />
        </Layout>
    );
}

export default Services;
