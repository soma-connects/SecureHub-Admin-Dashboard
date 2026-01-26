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

export interface Office {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
    hours: string;
    openTime: string;
    closeTime: string;
    manager: string;
    totalOrders: number;
    isOpen: boolean;
    lat?: string;
    lng?: string;
}

export interface Service {
    id: string;
    name: string;
    category: string;
    categoryColor: string;
    price: string;
    turnaround: string;
    totalOrders: number;
    createdDate: string;
    description: string;
    status: 'Active' | 'Inactive'; // inferred
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    orders: number;
    spent: string;
    lastOrder: string;
    status: 'Active' | 'Inactive' | 'Vip';
    initials: string;
    color: string;
}
