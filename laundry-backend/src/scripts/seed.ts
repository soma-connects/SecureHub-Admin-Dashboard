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

// --- DATA ---

const users = [
    {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', // Explicit UUID for admin
        email: 'admin@laundryhub.com',
        password: 'admin',
        name: 'Admin User',
        role: 'admin'
    }
];

const customers = [
    {
        id: 'CUST-001',
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 234 567 8900',
        address: '123 Main St, New York, NY 10001',
        orders: 15,
        spent: '$375.00',
        lastOrder: '2026-01-18',
        status: 'Active',
        initials: 'JD',
        color: 'bg-blue-50 text-blue-600'
    },
    {
        id: 'CUST-002',
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        phone: '+1 234 567 8901',
        address: '456 Oak Ave, Brooklyn, NY 11201',
        orders: 23,
        spent: '$645.00',
        lastOrder: '2026-01-17',
        status: 'Active',
        initials: 'JS',
        color: 'bg-emerald-50 text-emerald-600'
    },
    // Adding a few more for charts
    {
        id: 'CUST-003',
        name: 'Mike Johnson',
        email: 'mike.j@email.com',
        phone: '+1 234 567 8902',
        address: '789 Pine Rd, Queens, NY 11354',
        orders: 8,
        spent: '$180.00',
        lastOrder: '2026-01-16',
        status: 'Active',
        initials: 'MJ',
        color: 'bg-cyan-50 text-cyan-600'
    }
];

const services = [
    {
        id: 'SRV-001',
        name: 'Wash & Fold',
        category: 'Standard',
        categoryColor: 'bg-blue-100 text-blue-700',
        price: '$2.50 per lb',
        turnaround: '24-48 hours',
        totalOrders: 456,
        createdDate: '2025-01-10',
        description: 'Professional washing, drying, and folding service for everyday clothing',
        status: 'Active'
    },
    {
        id: 'SRV-002',
        name: 'Dry Cleaning',
        category: 'Premium',
        categoryColor: 'bg-purple-100 text-purple-700',
        price: '$8.00 per item',
        turnaround: '48-72 hours',
        totalOrders: 289,
        createdDate: '2025-01-10',
        description: 'Premium dry cleaning for delicate fabrics and formal wear',
        status: 'Active'
    },
    {
        id: 'SRV-005',
        name: 'Iron Only',
        category: 'Standard',
        categoryColor: 'bg-blue-100 text-blue-700',
        price: '$1.50 per lb',
        turnaround: '24 hours',
        totalOrders: 523,
        createdDate: '2025-01-10',
        description: 'Professional ironing and pressing service',
        status: 'Active'
    }
];

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
    }
];

const orders = [
    {
        id: '#ORD-1234',
        customer: { name: 'John Doe', email: 'john.doe@email.com', phone: '+1 (555) 123-4567', address: '123 Main St, New York, NY' },
        service: { name: 'Wash & Fold', items: 12, category: 'Washing' },
        date: { pickup: '2026-01-18', delivery: '2026-01-20' },
        amount: '$25.00',
        status: 'Completed',
        payment: 'Paid',
        created_at: '2026-01-18T10:00:00Z'
    },
    {
        id: '#ORD-1235',
        customer: { name: 'Jane Smith', email: 'jane.smith@email.com', phone: '+1 (555) 987-6543', address: '456 Park Ave, New York, NY' },
        service: { name: 'Dry Cleaning', items: 5, category: 'Dry Clean' },
        date: { pickup: '2026-01-18', delivery: '2026-01-21' },
        amount: '$45.00',
        status: 'Processing',
        payment: 'Paid',
        created_at: '2026-01-18T11:30:00Z'
    },
    {
        id: '#ORD-1236',
        customer: { name: 'Robert Johnson', email: 'robert.j@email.com', phone: '+1 (555) 456-7890', address: '789 Broadway, New York, NY' },
        service: { name: 'Iron Only', items: 8, category: 'Ironing' },
        date: { pickup: '2026-01-19', delivery: '2026-01-21' },
        amount: '$30.00',
        status: 'Pending',
        payment: 'Unpaid',
        created_at: '2026-01-19T09:15:00Z'
    }
];

async function seed() {
    console.log('Seeding database...');

    // 1. Users
    console.log('Inserting Users...');
    for (const u of users) {
        let userId = u.id; // Default to hardcoded

        // Try to create auth user
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email: u.email,
            password: u.password,
            email_confirm: true,
            user_metadata: { name: u.name, role: u.role }
        });

        if (authError) {
            console.log(`Auth user creation note (${u.email}): ${authError.message}`);
            // If user exists, we need their ID to link consistently
            if (authError.message.includes('already registered') || authError.status === 422) {
                // Unfortunately admin API doesn't have getUserByEmail easily exposed in all versions, 
                // but listUsers can find it.
                const { data: listData } = await supabase.auth.admin.listUsers();
                const existingUser = listData.users.find(user => user.email === u.email);
                if (existingUser) {
                    userId = existingUser.id;
                    console.log(`Found existing auth user ID: ${userId}`);
                }
            }
        } else if (authData.user) {
            userId = authData.user.id;
            console.log(`Created new auth user ID: ${userId}`);
        }

        // Clean up public.users to avoid ID/Email mismatch conflicts
        await supabase.from('users').delete().eq('email', u.email);

        const dbUser = {
            id: userId,
            email: u.email,
            name: u.name,
            role: u.role
        };
        const { error } = await supabase.from('users').upsert(dbUser);
        if (error) console.error('Error seeding user profile:', error.message);
    }

    // 2. Customers
    console.log('Inserting Customers...');
    for (const c of customers) {
        const dbCustomer = {
            id: c.id,
            name: c.name,
            email: c.email,
            phone: c.phone,
            address: c.address,
            orders: c.orders,
            spent: c.spent,
            last_order: c.lastOrder,
            status: c.status,
            initials: c.initials,
            color: c.color
        };
        const { error } = await supabase.from('customers').upsert(dbCustomer);
        if (error) console.error(`Error seeding customer ${c.id}:`, error.message);
    }

    // 3. Services
    console.log('Inserting Services...');
    for (const s of services) {
        const dbService = {
            id: s.id,
            name: s.name,
            category: s.category,
            category_color: s.categoryColor,
            price: s.price,
            turnaround: s.turnaround,
            total_orders: s.totalOrders,
            created_date: s.createdDate,
            description: s.description,
            status: s.status
        };
        const { error } = await supabase.from('services').upsert(dbService);
        if (error) console.error(`Error seeding service ${s.id}:`, error.message);
    }

    // 4. Offices
    console.log('Inserting Offices...');
    for (const o of offices) {
        const dbOffice = {
            id: o.id,
            name: o.name,
            address: o.address,
            city: o.city,
            state: o.state,
            zip: o.zip,
            phone: o.phone,
            email: o.email,
            hours: o.hours,
            open_time: o.openTime,
            close_time: o.closeTime,
            manager: o.manager,
            total_orders: o.totalOrders,
            is_open: o.isOpen, // Mapped to snake_case
            lat: o.lat,
            lng: o.lng
        };
        const { error } = await supabase.from('offices').upsert(dbOffice);
        if (error) console.error(`Error seeding office ${o.id}:`, error.message);
    }

    // 5. Orders
    console.log('Inserting Orders...');
    // We assume relational schema: customer_id, service_id.
    // We'll try to insert using matching IDs.
    for (const o of orders) {
        // Find matching customer ID by email or name
        const customerMatch = customers.find(c => c.email === o.customer.email || c.name === o.customer.name);
        const serviceMatch = services.find(s => s.name === o.service.name);

        if (customerMatch && serviceMatch) {
            const dbOrder = {
                id: o.id,
                customer_id: customerMatch.id,
                service_id: serviceMatch.id,
                amount: o.amount,
                status: o.status,
                payment: o.payment,
                // Assuming date is stored as JSON or simplified? 
                // Or maybe pickup_date/delivery_date? Let's try JSON 'date' first IF it exists, 
                // but earlier error said 'customer' missing, so likely relational.
                // Let's guess pickup_date/delivery_date columns existed in schema?
                // If not, we might fail again, but let's try mapping.
                pickup_date: o.date.pickup,
                delivery_date: o.date.delivery,
                created_at: o.created_at
            };
            const { error } = await supabase.from('orders').upsert(dbOrder);
            if (error) {
                console.error(`Error seeding order ${o.id}:`, error.message);
                // Fallback: maybe 'date' column IS json?
                if (error.message.includes('pickup_date')) {
                    // Try inserting 'date' as json
                    const fallbackOrder = { ...dbOrder, date: o.date };
                    delete (fallbackOrder as any).pickup_date;
                    delete (fallbackOrder as any).delivery_date;
                    const { error: err2 } = await supabase.from('orders').upsert(fallbackOrder);
                    if (err2) console.error('Retry with JSON date failed:', err2.message);
                }
            }
        } else {
            console.warn(`Skipping order ${o.id}: could not find match.`);
        }
    }

    console.log('Seeding complete!');
}

seed().catch(console.error);
