import type { ElectricalUnit } from "./ElectricalUnit";
import type { Footprint } from "./Footprint";
import type { Manufacturer } from "./Manufacturer"
import type {PartType} from "@/Models/PartType.ts";
import type {Tray} from "@/Models/Tray.ts";

export type Part = {
    id: number|null
    name: string
    quantity: number
    value: number | null
    electricalUnit: ElectricalUnit | null
    footprint: Footprint | null
    partType: PartType
    manufacturer: Manufacturer
    tray: Tray
}
