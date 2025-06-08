import type {Tray} from "@/Models/Tray.ts";

export type Shelf = {
    id: number
    name: string
    trays: Tray[]
}
