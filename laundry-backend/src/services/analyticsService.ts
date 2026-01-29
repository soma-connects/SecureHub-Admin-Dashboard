import { supabase } from '../config/supabase';
import { AppError } from '../utils/AppError';

interface AnalyticsData {
    totalOrders: number;
    totalRevenue: string; // Formatted string
    activeCustomers: number;
    pendingOrders: number;
    revenueChart: { name: string; value: number }[];
    ordersChart: { name: string; orders: number }[];
    serviceDistribution: { name: string; value: number; color: string }[];
    recentOrders: any[];
}

export const getStats = async (startDate: string, endDate: string): Promise<AnalyticsData> => {
    const start = new Date(startDate).toISOString();
    const end = new Date(endDate).toISOString();

    // Parallel fetching for performance
    const [
        { count: totalOrders, error: ordersError },
        { data: revenueData, error: revenueError }, // Used for Revenue + Orders Chart
        { count: activeCustomers, error: customersError },
        { count: pendingOrders, error: pendingError },
        { data: recentOrdersData, error: recentError },
        { data: distributionData, error: distError }
    ] = await Promise.all([
        // 1. Total Orders Count
        supabase.from('orders')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', start)
            .lte('created_at', end),

        // 2. Revenue & Orders Chart Data (Need amount & date)
        supabase.from('orders')
            .select('amount, created_at')
            .gte('created_at', start)
            .lte('created_at', end)
            .neq('status', 'Cancelled'),

        // 3. Active Customers
        supabase.from('customers')
            .select('*', { count: 'exact', head: true }),

        // 4. Pending Orders
        supabase.from('orders')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'Pending'),

        // 5. Recent Orders (Limit 5, Latest first)
        supabase.from('orders')
            .select(`
                id, 
                created_at, 
                amount, 
                status, 
                customer:customers(name), 
                service:services(name)
            `)
            .order('created_at', { ascending: false })
            .limit(5),

        // 6. Service Distribution (Need service category/name for all orders in range)
        supabase.from('orders')
            .select('service:services(name, category_color)')
            .gte('created_at', start)
            .lte('created_at', end)
    ]);

    if (ordersError || revenueError || customersError || pendingError || recentError || distError) {
        console.error('Analytics Error:', { ordersError, revenueError, customersError, pendingError, recentError, distError });
        throw new AppError('Failed to fetch analytics data', 500);
    }

    // --- Calculate Revenue ---
    const totalRevenueVal = revenueData?.reduce((acc, curr) => {
        const val = parseFloat((curr.amount || '0').toString().replace('$', '').replace(',', ''));
        return acc + (isNaN(val) ? 0 : val);
    }, 0) || 0;

    // --- Aggregation Logic for Charts ---
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const revenueMap = new Map<string, number>();
    const ordersMap = new Map<string, number>();

    // Initialize maps
    days.forEach(day => {
        revenueMap.set(day, 0);
        ordersMap.set(day, 0);
    });

    if (revenueData) {
        revenueData.forEach(order => {
            const date = new Date(order.created_at);
            const dayName = days[date.getDay()];

            // Revenue
            const amountVal = parseFloat((order.amount || '0').toString().replace('$', '').replace(',', ''));
            const safeAmount = isNaN(amountVal) ? 0 : amountVal;
            revenueMap.set(dayName, (revenueMap.get(dayName) || 0) + safeAmount);

            // Orders Chart
            ordersMap.set(dayName, (ordersMap.get(dayName) || 0) + 1);
        });
    }

    const revenueChart = days.map(day => ({ name: day, value: revenueMap.get(day) || 0 }));
    const ordersChart = days.map(day => ({ name: day, orders: ordersMap.get(day) || 0 }));

    // --- Service Distribution Aggregation ---
    const distMap = new Map<string, { count: number, color: string }>();

    if (distributionData) {
        distributionData.forEach((item: any) => {
            // item.service is an object or array? Relations usually object if select single, but checking..
            // It might be null if service deleted.
            const sName = item.service?.name || 'Unknown';
            const sColor = item.service?.category_color || 'bg-slate-500 text-slate-100'; // Fallback

            // We want hex colors for the chart usually, but let's see. 
            // The chart lib likely needs hex. We might need a map of name -> hex.
            // Or we use the category_color class and map it? 
            // For now, let's just count them.
            const current = distMap.get(sName) || { count: 0, color: sColor };
            distMap.set(sName, { count: current.count + 1, color: current.color });
        });
    }

    // Convert map to array
    const serviceDistribution = Array.from(distMap.entries()).map(([name, data]) => ({
        name,
        value: data.count,
        color: data.color // Frontend will need to map this class string to a specific hex color or use it
    }));

    return {
        totalOrders: totalOrders || 0,
        totalRevenue: `$${totalRevenueVal.toLocaleString()}`,
        activeCustomers: activeCustomers || 0,
        pendingOrders: pendingOrders || 0,
        revenueChart,
        ordersChart,
        recentOrders: recentOrdersData || [],
        serviceDistribution
    };
};
