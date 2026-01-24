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
    isOpen?: boolean;
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
