import {Button} from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import {useEffect, useState} from "react";
import type {Footprint} from "@/Models/Footprint.ts";
import {getElectricalUnits, getFootprints, getManufacturers, getPartTypes, getShelfs} from "@/api/RequestHandlers.ts";
import type {Manufacturer} from "@/Models/Manufacturer.ts";
import type {PartType} from "@/Models/PartType.ts";
import type {Shelf} from "@/Models/Shelf.ts";
import type {Part} from "@/Models/Part.ts";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {SearchableSelect} from "@/components/searchableSelect.tsx";
import type {ElectricalUnit} from "@/Models/ElectricalUnit.ts";

export function CreateEditPart({open, part, cb}: {
    open: boolean
    part: Part | undefined,
    cb: (part: Part | undefined) => void;
}) {

    const [footprints, setFootprints] = useState<Footprint[]>([]);
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
    const [partTypes, setPartTypes] = useState<PartType[]>([]);
    const [shelfs, setShelfs] = useState<Shelf[]>([]);
    const [electricalUnits, setElectricalUnits] = useState<ElectricalUnit[]>([]);

    useEffect(() => {
        getFootprints()
            .then((data) => setFootprints(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    useEffect(() => {
        getElectricalUnits()
            .then((data) => setElectricalUnits(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    useEffect(() => {
        getManufacturers()
            .then((data) => setManufacturers(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    useEffect(() => {
        getPartTypes()
            .then((data) => setPartTypes(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    useEffect(() => {
        getShelfs()
            .then((data) => setShelfs(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <Sheet open={open}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>

                <div className="grid flex-1 auto-rows-min gap-6 px-4">

                    {/*name: string*/}
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-name">Name</Label>
                        <Input id="sheet-demo-name" defaultValue="Pedro Duarte"/>
                    </div>

                    {/*quantity: number*/}
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-name">Quantity</Label>
                        <Input id="sheet-demo-name" defaultValue="Pedro Duarte"/>
                    </div>

                    {/*value: number | null*/}
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-name">Value</Label>
                        <Input id="sheet-demo-name" defaultValue="Pedro Duarte"/>
                    </div>

                    {/*electricalUnit: ElectricalUnit | null*/}
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-username">ElectricalUnit</Label>
                        <SearchableSelect
                            placeholder={"ElectricalUnit"}
                            elements={electricalUnits.map((it,index) => ({
                                id: index,
                                label: it.toString(),
                            }))}
                        ></SearchableSelect>
                    </div>

                    {/*footprint: Footprint | null*/}
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-username">Footprint</Label>
                        <SearchableSelect
                            placeholder={"Footprint"}
                            elements={footprints.map(({id, metric}) => ({id: id, label: metric}))}>
                        </SearchableSelect>
                    </div>

                    {/*partType: PartType*/}
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-username">PartType</Label>
                        <SearchableSelect
                            placeholder={"PartType"}
                            elements={partTypes.map(({id, name}) => ({id: id, label: name}))}>
                        </SearchableSelect>
                    </div>

                    {/*manufacturer: Manufacturer*/}
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-username">Manufacturer</Label>
                        <SearchableSelect
                            placeholder={"Manufacturer"}
                            elements={manufacturers.map(({id, name}) => ({id: id, label: name}))}>
                        </SearchableSelect>
                    </div>

                    {/*tray: Tray*/}
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-username">Tray</Label>
                        <SearchableSelect
                            placeholder={"Tray"}
                            elements={shelfs.map(it => {
                                return it.trays.map(({id, name}) => ({id: id, label: name}))
                            }).flat()}>
                        </SearchableSelect>
                    </div>
                </div>

                <SheetFooter>
                    <Button onClick={() => cb(part)} type="submit">Save changes</Button>
                    <SheetClose asChild>
                        <Button onClick={() => cb(undefined)} variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
