import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugStatus() {
    console.log('Attempting to update customer status to "Suspended"...');

    // Try to update the first customer found
    const { data: customers } = await supabase.from('customers').select('id').limit(1);

    if (!customers || customers.length === 0) {
        console.log('No customers found to test.');
        return;
    }

    const id = customers[0].id;
    console.log(`Testing with Customer ID: ${id}`);

    const { error } = await supabase
        .from('customers')
        .update({ status: 'Inactive' })
        .eq('id', id);

    if (error) {
        console.error('Update Failed!');
        console.error('Error Code:', error.code);
        console.error('Error Message:', error.message);
        console.error('Error Details:', error.details);
        console.error('Error Hint:', error.hint);
    } else {
        console.log('Update Successful! The database allows "Suspended".');

        // Revert functionality (optional, but good for cleanup)
        await supabase.from('customers').update({ status: 'Active' }).eq('id', id);
        console.log('Reverted status to Active.');
    }
}

debugStatus().catch(console.error);
