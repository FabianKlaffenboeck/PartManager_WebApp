import type {PartType} from "@/Models/PartType.ts";
import {API_ENDPOINT, genHeader} from "@/api/API.ts";


export async function getPartTypes(): Promise<PartType[]> {
    const response = await fetch(API_ENDPOINT + '/partTypes', {
        method: 'GET',
        headers: genHeader(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch parts');
    }
    return await response.json();
}

export async function updatePartType(partType: PartType): Promise<PartType> {
    const response = await fetch(API_ENDPOINT + '/partTypes', {
        method: 'POST',
        headers: genHeader(),
        body: JSON.stringify(partType)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}