import type {Footprint} from "@/Models/Footprint.ts";
import {backEndUrl, genHeader} from "@/api/API.ts";

export async function getFootprints(): Promise<Footprint[]> {
    const response = await fetch(backEndUrl + '/footprints', {
        method: 'GET',
        headers: genHeader(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch parts');
    }
    return await response.json();
}

export async function updateFootprint(footprint: Footprint): Promise<Footprint> {
    const response = await fetch(backEndUrl + '/footprints', {
        method: 'POST',
        headers: genHeader(),
        body: JSON.stringify(footprint)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}