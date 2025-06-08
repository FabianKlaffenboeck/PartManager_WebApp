import type {Footprint, Manufacturer, Part, PartType, Shelf} from "@/Models.ts";

const backEndUrl: string = "http://localhost:8080/api";

function genHeader() {
    return {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
}

export async function getParts(): Promise<Part[]> {
    const response = await fetch(backEndUrl + '/parts', {
        method: 'GET',
        headers: genHeader()
    });
    if (!response.ok) {
        throw new Error('Failed to fetch parts');
    }
    return await response.json();
}

export async function updatePart(part: Part): Promise<Part[]> {
    const response = await fetch(backEndUrl + '/parts', {
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
    const response = await fetch(backEndUrl + '/parts/' + part.id, {
        method: 'DELETE',
        headers: genHeader(),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
}

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

export async function getPartTypes(): Promise<PartType[]> {
    const response = await fetch(backEndUrl + '/partTypes', {
        method: 'GET',
        headers: genHeader(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch parts');
    }
    return await response.json();
}

export async function getShelfs(): Promise<Shelf[]> {
    const response = await fetch(backEndUrl + '/shelfs', {
        method: 'GET',
        headers: genHeader(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch parts');
    }
    return await response.json();
}

export async function loginReq(username: string, password: string): Promise<string> {
    const response = await fetch(backEndUrl + '/login', {
        method: 'POST',
        headers: genHeader(),
        body: JSON.stringify({username, password})
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.token;
}