import { Layout } from '../components/layout/Layout';
import { CustomerStats } from '../components/customers/CustomerStats';
import { CustomersTable } from '../components/customers/CustomersTable';

function Customers() {
    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-100">Customers Management</h1>
                <p className="text-slate-400 text-sm mt-1">View and manage all customer information</p>
            </div>

            <CustomerStats />
            <CustomersTable />
        </Layout>
    );
}

export default Customers;
