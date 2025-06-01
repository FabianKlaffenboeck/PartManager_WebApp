export enum ElectricalUnit {
    VOLT,
    AMPERE,
    OHM,
    SIEMENS,
    FARAD,
    HENRY,
    WATT,
    JOULE,
    COULOMB,
    HERTZ
}

export type PartType = {
    id: number
    name: string
}

export type Manufacturer = {
    id: number
    name: string
}

export type Tray = {
    id: number
    name: string
}

export type Shelf = {
    id: number
    name: string
    trays: Tray[]
}

export type Footprint = {
    id: number
    metric: string
    imperial: string
}

export type Part = {
    id: number
    name: string
    quantity: number
    value: number | null
    electricalUnit: ElectricalUnit | null
    footprint: Footprint | null
    partType: PartType
    manufacturer: Manufacturer
    tray: Tray
}

