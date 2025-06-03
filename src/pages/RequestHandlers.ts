import type {Part} from "@/Models.ts";

const backEndUrl: string = "http://localhost:8080/api";

export async function getParts(): Promise<Part[]> {
    const response = await fetch(backEndUrl + '/parts', {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa('q:q'),
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch parts');
    }
    return await response.json();
}

export async function updatePart(part: Part): Promise<Part[]> {
    const response = await fetch(backEndUrl + '/parts', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa('q:q'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(part)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}