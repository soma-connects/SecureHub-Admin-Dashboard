export interface Order {
    id: string;
    customer: {
        name: string;
        email: string;
        phone?: string;
        address?: string;
    };
    service: {
        name: string;
        items: number;
        category?: string;
    };
    date: {
        pickup: string;
        delivery: string;
    };
    amount: string;
    status: 'Pending' | 'Processing' | 'Ready' | 'Completed' | 'Cancelled';
    payment: 'Paid' | 'Unpaid' | 'Refunded';
}

export const mockOrders: Order[] = [
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
