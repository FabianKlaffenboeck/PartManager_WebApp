import type {Tray} from "@/Models/Tray.ts";

export type Shelf = {
    id: number | null
    name: string
    trays: Tray[]
}
