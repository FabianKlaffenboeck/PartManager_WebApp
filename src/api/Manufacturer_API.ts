import type {Manufacturer} from "@/Models/Manufacturer.ts";
import {API_ENDPOINT, genHeader} from "@/api/API.ts";

export async function getManufacturers(): Promise<Manufacturer[]> {
    const response = await fetch(API_ENDPOINT + '/manufacturers', {
        method: 'GET',
        headers: genHeader(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch parts');
    }
    return await response.json();
}
export async function updateManufacturers(manufacturer: Manufacturer): Promise<Manufacturer> {
    const response = await fetch(API_ENDPOINT + '/manufacturers', {
        method: 'POST',
        headers: genHeader(),
        body: JSON.stringify(manufacturer)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}