import {columns, ElectricalUnit, type Part, PartsTable} from "@/pages/Parts/parts-table.tsx";


export const payments: Part[] = [
    {
        id: 1,
        name: "test",
        quantity: 1,
        value: 1,
        electricalUnit: ElectricalUnit.VOLT,
        footprint: {id: 0, metric: "1010", imperial: "41"},
        partType: {id: 0, name: "test"},
        manufacturer: {id: 0, name: "test"},
        tray: {id: 0, name: "test"},
    },
]

export default function PartsAll() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <PartsTable columns={columns} data={payments}/>
            </div>
        </div>
    )
}
