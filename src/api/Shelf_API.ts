import type {Shelf} from "@/Models/Shelf.ts";
import {backEndUrl, genHeader} from "@/api/API.ts";

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
export async function updateShelf(shelf: Shelf): Promise<Shelf> {
    const response = await fetch(backEndUrl + '/shelfs', {
        method: 'POST',
        headers: genHeader(),
        body: JSON.stringify(shelf)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}