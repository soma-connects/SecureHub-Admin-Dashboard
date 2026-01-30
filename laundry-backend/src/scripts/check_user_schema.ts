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

async function checkUser() {
    console.log('Fetching admin user...');

    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', 'admin@laundryhub.com')
        .maybeSingle();

    if (error) {
        console.error('Error fetching user:', error);
        return;
    }

    if (!user) {
        console.error('User admin@laundryhub.com not found!');
        return;
    }

    console.log('User found:', user);
    console.log('Keys:', Object.keys(user));

    if (!user.password) {
        console.log('WARNING: Password field is missing from the database record.');

        console.log('Attempting to add password column via update (will fail if column does not exist)...');
        const { error: updateError } = await supabase
            .from('users')
            .update({ password: 'admin' } as any) // Cast to any to bypass TS check if type excludes it
            .eq('id', user.id);

        if (updateError) {
            console.error('Update failed. This likely means the "password" column does not exist.');
            console.error('Error:', updateError.message);
        } else {
            console.log('Update SUCCEEDED! The column exists, but was empty.');
        }
    } else {
        console.log('Password field exists.');
    }
}

checkUser().catch(console.error);
