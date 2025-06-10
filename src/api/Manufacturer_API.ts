import type {Manufacturer} from "@/Models/Manufacturer.ts";
import {backEndUrl, genHeader} from "@/api/API.ts";

export async function getManufacturers(): Promise<Manufacturer[]> {
    const response = await fetch(backEndUrl + '/manufacturers', {
        method: 'GET',
        headers: genHeader(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch parts');
    }
    return await response.json();
}