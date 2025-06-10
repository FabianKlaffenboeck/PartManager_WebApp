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
import {useState} from "react";
import type {PartType} from "@/Models/PartType.ts";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";

export function CreateEditPartType({open, partType, cb}: {
    open: boolean
    partType: PartType | undefined,
    cb: (partType: PartType | undefined) => void;
}) {

    const [name, setName] = useState<string | undefined>();

    function buildPartType(): PartType {
        return {
            id: partType?.id || null,
            name: name || "",
        };
    }

    function isSavable(): boolean {
        if (name == "") {
            return false
        }
        return true
    }


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
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-name">Name</Label>
                        <Input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            id="sheet-demo-name"
                        />
                    </div>
                </div>

                <SheetFooter>
                    <Button disabled={!isSavable()} onClick={() => cb(buildPartType())}>Save changes</Button>
                    <SheetClose asChild>
                        <Button onClick={() => cb(undefined)} variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
