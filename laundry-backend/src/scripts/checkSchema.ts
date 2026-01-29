import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing env vars');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    console.log('Checking Orders Table Schema...');
    // We can't query information_schema easily via supabase-js client unless we have a function or direct SQL access.
    // BUT we can try to select a row and see the error property 'hint' or just see empty result.
    // Actually, Supabase has a `rpc` method if we can run SQL.
    // If not, we can try to `insert` a dummy record with JUST an ID and see if it works, then `select *`.
    // But `select *` on empty table returns keys? No, empty array.

    // Alternative: Introspect by deliberately failing and reading error?
    // We already saw "Could not find column".

    // Better way: query `information_schema` is usually blocked/hard via JS client.
    // BUT, maybe I can try `supabase.from('orders').select('*').limit(1)`... no.

    // Let's try to run a raw SQL query if possible? No.
    // Wait, the error "Could not find the 'customer_id' column... in the schema cache" implies the Supabase client knows the schema.
    // The previous error "Could not find the 'customer' column" implies that didn't exist either.

    // Hypothesis: The 'orders' table was created properly but using 'camelCase'?
    // I will try to insert a record with NO keys (empty object) and see the error?
    const { error } = await supabase.from('orders').insert({});
    if (error) console.log('Insert empty error:', error);

    // Also check 'users' table columns
    const { error: userError } = await supabase.from('users').insert({});
    if (userError) console.log('Insert empty user error:', userError);
}

checkSchema();
