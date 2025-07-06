import type {ElectricalUnit} from "@/Models/ElectricalUnit.ts";
import {API_ENDPOINT, genHeader} from "@/api/API.ts";

export async function getElectricalUnits(): Promise<ElectricalUnit[]> {
    const response = await fetch(API_ENDPOINT + '/electricalUnits', {
        method: 'GET',
        headers: genHeader(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch parts');
    }
    return await response.json();
}
