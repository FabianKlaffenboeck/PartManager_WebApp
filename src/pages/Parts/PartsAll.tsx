import {columns, PartsTable, type Part} from "@/pages/Parts/parts-table.tsx";


export const payments: Part[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
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
