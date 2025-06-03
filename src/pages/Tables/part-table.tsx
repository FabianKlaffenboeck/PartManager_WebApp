import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
    type VisibilityState,
} from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table.tsx"
import {Button} from "@/components/ui/button.tsx";
import React, {useEffect, useState} from "react";
import {ChevronDown, MoreHorizontal, Replace} from "lucide-react";
import {ElectricalUnit, type Part, type Shelf, type Tray} from "@/Models.ts";
import {getShelfs} from "@/RequestHandlers.ts";

function parsElectricalUnit(unit: ElectricalUnit): string {
    return unit.toString()
}

export function PartTable({data, editHandler, adjustStockHandler}: {
    data: Part[]
    editHandler: (id: number) => void;
    adjustStockHandler: (id: number) => void;
}) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [showMetric, setShowMetric] = useState(true);

    const [shelfs, setShelfs] = useState<Shelf[]>([]);

    useEffect(() => {
        getShelfs()
            .then((data) => setShelfs(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    const columns: ColumnDef<Part>[] = [
        {
            accessorKey: "id",
            header: "Id"
        },
        {
            accessorKey: "name",
            header: "Name"
        },
        {
            accessorKey: "quantity",
            header: "Quantity"
        },
        {
            accessorKey: "value",
            header: "Value"
        },
        {
            accessorKey: "electricalUnit",
            header: "ElectricalUnit",
            cell: ({row}) => {
                if (row.original.electricalUnit == null) {
                    return <div></div>;
                }
                return <div>{parsElectricalUnit(row.original.electricalUnit)}</div>
            },
        },
        {
            accessorKey: "footprint",
            header: () => {
                return (
                    <div
                        onClick={() => setShowMetric(!showMetric)}
                        className="flex items-center cursor-pointer"
                    >
                        <span>Footprint</span>
                        <Replace className="ml-2 h-4 w-4"/>
                    </div>
                )
            },
            cell: ({row: {original: {footprint}}}) => {
                if (showMetric) {
                    return <div>{footprint?.metric}</div>
                } else {
                    return <div>{footprint?.imperial}</div>
                }
            },
        },
        {
            accessorKey: "partType",
            header: "PartType",
            cell: ({row}) => {
                return <div>{row.original.partType.name}</div>
            },
        },
        {
            accessorKey: "manufacturer",
            header: "Manufacturer",
            cell: ({row}) => {
                return <div>{row.original.manufacturer.name}</div>
            },
        },
        {
            accessorKey: "tray",
            header: "Tray",
            cell: ({row}) => {
                function generateShelfTrayName(tray: Tray): string {
                    const shelf = shelfs.find(shelf => shelf.trays.filter(it => it.id == tray.id))
                    return shelf?.name + "-" + tray.name;
                }

                return <div>{generateShelfTrayName(row.original.tray)}</div>
            },
        },
        {
            id: "actions", cell: ({row}) => {
                return (<DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={() => editHandler(row.original.id)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => adjustStockHandler(row.original.id)}>Adjust
                            Stock</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>)
            },
        }
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting, columnFilters, columnVisibility,
        },
    })

    return (
        <div>
            <div className="flex items-center py-4">
                {/*<Input*/}
                {/*    placeholder="Filter emails..."*/}
                {/*    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}*/}
                {/*    onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}*/}
                {/*    className="max-w-sm"*/}
                {/*/>*/}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (<DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>)
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (<TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (<TableHead key={header.id}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>)
                            })}
                        </TableRow>))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (table.getRowModel().rows.map((row) => (<TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (<TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>))}
                        </TableRow>))) : (<TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
