import { supabase } from '../config/supabase';
import { AppError } from '../utils/AppError';

export const getAllServices = async () => {
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('name');

    if (error) {
        throw new AppError(error.message, 500);
    }

    return data;
};

export const createService = async (serviceData: any) => {
    const payload = { ...serviceData };

    // Sanitize payload
    delete payload.id;
    delete payload.category_color;
    delete payload.total_orders;
    delete payload.created_date;

    // 0. GENERATE NEW ID (SRV-XXX)
    // Fetch last service ID
    const { data: lastService } = await supabase
        .from('services')
        .select('id')
        .order('id', { ascending: false })
        .limit(1)
        .single();

    let newId = 'SRV-001';
    if (lastService && lastService.id) {
        const lastIdNum = parseInt(lastService.id.split('-')[1]);
        if (!isNaN(lastIdNum)) {
            newId = `SRV-${(lastIdNum + 1).toString().padStart(3, '0')}`;
        }
    }
    payload.id = newId;

    // 1. Map 'active' -> 'status'
    // Frontend sends 'active' (boolean or 'on'). DB wants 'status' ("Active" or "Inactive").
    let isActive = false;
    if ('active' in payload) {
        isActive = payload.active === 'on' || payload.active === true;
        delete payload.active;
    } else {
        // Default for new service?
        isActive = true;
    }
    payload.status = isActive ? 'Active' : 'Inactive';

    // Remove is_active if I added it previously
    delete payload.is_active;

    // 2. Map 'price' (num) + 'price_unit' (str) -> 'price' (string "$X per Y")
    // Frontend might send price as number or string.
    if (payload.price !== undefined && payload.price_unit) {
        const p = parseFloat(payload.price).toFixed(2);
        payload.price = `$${p} ${payload.price_unit}`;
        delete payload.price_unit;
    } else if (payload.price) {
        // usage without unit?
        // If we don't have unit, just preserve price? 
        // But DB seems to require format. Let's assume unit is always there or default.
        // If price is already formatted (weird case), leave it.
    }

    console.log('Creating Service Payload:', payload);

    const { data, error } = await supabase
        .from('services')
        .insert([payload])
        .select()
        .single();

    if (error) {
        console.error('Supabase Create Error:', error);
        require('fs').writeFileSync('backend_error.log', JSON.stringify(error, null, 2));
        throw new AppError(error.message, 500);
    }

    return data;
};

export const updateService = async (id: string, serviceData: any) => {
    const payload = { ...serviceData };

    // Sanitize payload
    delete payload.id;
    delete payload.category_color;
    delete payload.total_orders;
    delete payload.created_date;

    // 1. Map 'active' -> 'status'
    let isActive = false;
    if ('active' in payload) {
        isActive = payload.active === 'on' || payload.active === true;
        delete payload.active;
        payload.status = isActive ? 'Active' : 'Inactive';
    } else {
        // For updates, if 'active' is missing, it implies false (unchecked) IF it's a form submit.
        // We will assume it means Inactive.
        payload.status = 'Inactive';
    }
    // Remove my previous bad fix
    delete payload.is_active;

    // 2. Map 'price' (num) + 'price_unit' (str) -> 'price' (string "$X per Y")
    if (payload.price !== undefined && payload.price_unit) {
        const p = parseFloat(payload.price).toFixed(2);
        payload.price = `$${p} ${payload.price_unit}`;
        delete payload.price_unit;
    }

    console.log(`Updating Service ${id} Payload:`, payload);

    const { data, error } = await supabase
        .from('services')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Supabase Update Error:', error);
        // keep logging for now until confirmed fixed
        require('fs').writeFileSync('backend_error.log', JSON.stringify(error, null, 2));
        throw new AppError(error.message, 500);
    }

    return data;
};

export const deleteService = async (id: string) => {
    const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Supabase Delete Error:', error);
        throw new AppError(error.message, 500);
    }
};
