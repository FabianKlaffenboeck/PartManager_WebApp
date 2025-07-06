import type {Part} from "@/Models/Part.ts";
import {API_ENDPOINT, genHeader} from "@/api/API.ts";

export async function getParts(): Promise<Part[]> {
    const response = await fetch(API_ENDPOINT + '/parts', {
        method: 'GET',
        headers: genHeader()
    });
    if (!response.ok) {
        throw new Error('Failed to fetch parts');
    }
    return await response.json();
}

export async function updatePart(part: Part): Promise<Part> {
    const response = await fetch(API_ENDPOINT + '/parts', {
        method: 'POST',
        headers: genHeader(),
        body: JSON.stringify(part)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

export async function deletePart(part: Part): Promise<boolean> {
    const response = await fetch(API_ENDPOINT + '/parts/' + part.id, {
        method: 'DELETE',
        headers: genHeader(),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
}