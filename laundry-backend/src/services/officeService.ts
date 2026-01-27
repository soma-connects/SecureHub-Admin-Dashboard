import { supabase } from '../config/supabase';
import { AppError } from '../utils/AppError';

export const getAllOffices = async () => {
    const { data, error } = await supabase
        .from('offices')
        .select('*')
        .order('name'); // Optional: order by name

    if (error) {
        throw new AppError(error.message, 500);
    }

    return data;
};

export const createOffice = async (officeData: any) => {
    // 1. Convert numeric fields if present (Supabase/Postgres can be strict)
    const payload = { ...officeData };
    if (payload.lat) payload.lat = parseFloat(payload.lat);
    if (payload.lng) payload.lng = parseFloat(payload.lng);

    // 2. Remove non-DB fields
    delete payload.id; // We generated it, but wait, do we need to assign it? Yes.
    // wait, I deleted it on line 24.
    delete payload.openTime;
    delete payload.closeTime;
    delete payload.totalOrders;
    delete payload.country;

    // 0. GENERATE NEW ID (OFF-XXX)
    const { data: lastOffice } = await supabase
        .from('offices')
        .select('id')
        .order('id', { ascending: false })
        .limit(1)
        .single();

    let newId = 'OFF-001';
    if (lastOffice && lastOffice.id) {
        const lastIdNum = parseInt(lastOffice.id.split('-')[1]);
        if (!isNaN(lastIdNum)) {
            newId = `OFF-${(lastIdNum + 1).toString().padStart(3, '0')}`;
        }
    }
    payload.id = newId;

    // 3. Map camelCase to snake_case
    if ('isOpen' in payload) {
        payload.is_open = payload.isOpen;
        delete payload.isOpen;
    }

    // Log the payload to debug
    console.log('Creating Office Payload:', payload);

    const { data, error } = await supabase
        .from('offices')
        .insert([payload])
        .select()
        .single();

    if (error) {
        console.error('Supabase Create Error:', error);
        throw new AppError(error.message, 500);
    }

    return data;
};

export const updateOffice = async (id: string, officeData: any) => {
    // 1. Convert numeric fields
    const payload = { ...officeData };
    if (payload.lat) payload.lat = parseFloat(payload.lat);
    if (payload.lng) payload.lng = parseFloat(payload.lng);

    console.log(`Updating Office ${id} Payload:`, payload);

    // 2. Sanitize payload
    delete payload.id;
    delete payload.openTime;
    delete payload.closeTime;
    delete payload.totalOrders;
    delete payload.country;

    // 3. Map camelCase to snake_case
    if ('isOpen' in payload) {
        payload.is_open = payload.isOpen;
        delete payload.isOpen;
    }

    const { data, error } = await supabase
        .from('offices')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Supabase Update Error:', error);
        // Write to file for debugging
        require('fs').writeFileSync('backend_error.log', JSON.stringify(error, null, 2));
        throw new AppError(error.message, 500);
    }

    return data;
};

export const deleteOffice = async (id: string) => {
    const { error } = await supabase
        .from('offices')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Supabase Delete Error:', error);
        throw new AppError(error.message, 500);
    }
};
