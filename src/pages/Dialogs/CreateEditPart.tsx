import {Button} from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {useEffect, useState} from "react";
import type {Footprint} from "@/Models/Footprint.ts";
import {getFootprints, getManufacturers, getPartTypes, getShelfs} from "@/api/RequestHandlers.ts";
import type {Manufacturer} from "@/Models/Manufacturer.ts";
import type {PartType} from "@/Models/PartType.ts";
import type {Shelf} from "@/Models/Shelf.ts";
import type {Part} from "@/Models/Part.ts";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {ExampleCombobox} from "@/components/example-combobox.tsx";

export function CreateEditPart({open, part, cb}: {
    open: boolean
    part: Part | undefined,
    cb: (part: Part | undefined) => void;
}) {

    const [footprints, setFootprints] = useState<Footprint[]>([]);
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
    const [partTypes, setPartTypes] = useState<PartType[]>([]);
    const [shelfs, setShelfs] = useState<Shelf[]>([]);

    useEffect(() => {
        getFootprints()
            .then((data) => setFootprints(data))
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
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>

                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-name">Name</Label>
                        <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
                    </div>



                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-username">Username</Label>
                        <ExampleCombobox></ExampleCombobox>
                    </div>



                </div>

                {/*id: number*/}
                {/*name: string*/}
                {/*quantity: number*/}
                {/*value: number | null*/}
                {/*electricalUnit: ElectricalUnit | null*/}
                {/*footprint: Footprint | null*/}
                {/*partType: PartType*/}
                {/*manufacturer: Manufacturer*/}
                {/*tray: Tray*/}

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
