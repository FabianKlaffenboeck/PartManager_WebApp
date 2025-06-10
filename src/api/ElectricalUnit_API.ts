import type {ElectricalUnit} from "@/Models/ElectricalUnit.ts";
import {backEndUrl, genHeader} from "@/api/API.ts";

export async function getElectricalUnits(): Promise<ElectricalUnit[]> {
    const response = await fetch(backEndUrl + '/electricalUnits', {
        method: 'GET',
        headers: genHeader(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch parts');
    }
    return await response.json();
}
