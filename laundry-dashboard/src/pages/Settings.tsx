import { Layout } from '../components/layout/Layout';

function Settings() {
    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500 text-sm mt-1">Configure your admin panel preferences</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 flex items-center justify-center min-h-[400px]">
                <p className="text-slate-400 text-lg font-medium">Settings page coming soon...</p>
            </div>
        </Layout>
    );
}

export default Settings;
