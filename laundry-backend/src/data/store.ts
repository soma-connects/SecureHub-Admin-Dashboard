import { Order, User } from '../types';

export const users: User[] = [
    {
        id: '1',
        email: 'admin@laundryhub.com',
        password: 'admin',
        name: 'Admin User',
        role: 'admin'
    }
];

export const orders: Order[] = [
    {
        id: '#ORD-1234',
        customer: { name: 'John Doe', email: 'john.doe@email.com', phone: '+1 (555) 123-4567', address: '123 Main St, New York, NY' },
        service: { name: 'Wash & Fold', items: 12, category: 'Washing' },
        date: { pickup: '2026-01-18', delivery: '2026-01-20' },
        amount: '$25.00',
        status: 'Completed',
        payment: 'Paid'
    },
    {
        id: '#ORD-1235',
        customer: { name: 'Jane Smith', email: 'jane.smith@email.com', phone: '+1 (555) 987-6543', address: '456 Park Ave, New York, NY' },
        service: { name: 'Dry Cleaning', items: 5, category: 'Dry Clean' },
        date: { pickup: '2026-01-18', delivery: '2026-01-21' },
        amount: '$45.00',
        status: 'Processing',
        payment: 'Paid'
    },
    {
        id: '#ORD-1236',
        customer: { name: 'Robert Johnson', email: 'robert.j@email.com', phone: '+1 (555) 456-7890', address: '789 Broadway, New York, NY' },
        service: { name: 'Iron Only', items: 8, category: 'Ironing' },
        date: { pickup: '2026-01-19', delivery: '2026-01-21' },
        amount: '$30.00',
        status: 'Pending',
        payment: 'Unpaid'
    },
    {
        id: '#ORD-1237',
        customer: { name: 'Emily Davis', email: 'emily.d@email.com' },
        service: { name: 'Express Service', items: 3 },
        date: { pickup: '2026-01-19', delivery: '2026-01-19' },
        amount: '$55.00',
        status: 'Processing',
        payment: 'Paid'
    },
    {
        id: '#ORD-1238',
        customer: { name: 'Michael Wilson', email: 'm.wilson@email.com' },
        service: { name: 'Wash & Fold', items: 15 },
        date: { pickup: '2026-01-20', delivery: '2026-01-22' },
        amount: '$42.00',
        status: 'Completed',
        payment: 'Paid'
    },
    {
        id: '#ORD-1239',
        customer: { name: 'Sarah Brown', email: 'sarah.b@email.com' },
        service: { name: 'Dry Cleaning', items: 2 },
        date: { pickup: '2026-01-20', delivery: '2026-01-23' },
        amount: '$28.00',
        status: 'Pending',
        payment: 'Unpaid'
    }
];

export const customers: any[] = [
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
    },
    {
        id: 'CUST-004',
        name: 'Sarah Williams',
        email: 'sarah.w@email.com',
        phone: '+1 234 567 8903',
        address: '321 Elm St, Manhattan, NY 10013',
        orders: 31,
        spent: '$890.00',
        lastOrder: '2026-01-18',
        status: 'Vip',
        initials: 'SW',
        color: 'bg-purple-50 text-purple-600'
    },
    {
        id: 'CUST-005',
        name: 'Tom Brown',
        email: 'tom.brown@email.com',
        phone: '+1 234 567 8904',
        address: '654 Maple Dr, Bronx, NY 10451',
        orders: 5,
        spent: '$125.00',
        lastOrder: '2025-12-20',
        status: 'Inactive',
        initials: 'TB',
        color: 'bg-slate-50 text-slate-600'
    },
    {
        id: 'CUST-006',
        name: 'Emily Davis',
        email: 'emily.d@email.com',
        phone: '+1 234 567 8905',
        address: '987 Cedar Ln, Staten Island, NY 10301',
        orders: 12,
        spent: '$320.00',
        lastOrder: '2026-01-15',
        status: 'Active',
        initials: 'ED',
        color: 'bg-orange-50 text-orange-600'
    },
    {
        id: 'CUST-007',
        name: 'David Wilson',
        email: 'david.w@email.com',
        phone: '+1 234 567 8906',
        address: '147 Birch Ave, Manhattan, NY 10014',
        orders: 19,
        spent: '$475.00',
        lastOrder: '2026-01-17',
        status: 'Active',
        initials: 'DW',
        color: 'bg-indigo-50 text-indigo-600'
    },
    {
        id: 'CUST-008',
        name: 'Lisa Anderson',
        email: 'lisa.a@email.com',
        phone: '+1 234 567 8907',
        address: '258 Spruce St, Brooklyn, NY 11202',
        orders: 27,
        spent: '$735.00',
        lastOrder: '2026-01-18',
        status: 'Vip',
        initials: 'LA',
        color: 'bg-pink-50 text-pink-600'
    }
];

export const services: any[] = [
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
    },
    {
        id: 'SRV-007',
        name: 'Alterations',
        category: 'Specialty',
        categoryColor: 'bg-rose-100 text-rose-700',
        price: '$15.00 per item',
        turnaround: '5-7 days',
        totalOrders: 34,
        createdDate: '2025-01-08',
        description: 'Clothing alterations and repair services',
        status: 'Active'
    },
    {
        id: 'SRV-008',
        name: 'Stain Removal',
        category: 'Premium',
        categoryColor: 'bg-purple-100 text-purple-700',
        price: '$10.00 per item',
        turnaround: '48-72 hours',
        totalOrders: 92,
        createdDate: '2025-01-18',
        description: 'Advanced stain treatment for tough stains',
        status: 'Active'
    }
];

export const offices: any[] = [
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
        isOpen: false,
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
