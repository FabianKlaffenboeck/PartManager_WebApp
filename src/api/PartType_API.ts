import type {PartType} from "@/Models/PartType.ts";
import {backEndUrl, genHeader} from "@/api/API.ts";


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