import {useEffect, useState} from "react";
import {ManufacturersTable} from "@/pages/Tables/manufacturer-table.tsx";
import type {Manufacturer} from "@/Models/Manufacturer.ts";
import {CreateEditManufacturer} from "@/pages/Dialogs/CreateEditManufacturer.tsx";
import {getManufacturers} from "@/api/Manufacturer_API.ts";

export default function Manufacturers() {
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
    const [createEdit, setCreateEdit] = useState(false);

    function newCm_cb() {
        setCreateEdit(true)
    }

    function createEdit_cb(manufacturer: Manufacturer | undefined) {
        console.log(manufacturer);
        setCreateEdit(false)
    }

    useEffect(() => {
        getManufacturers()
            .then((data) => setManufacturers(data))
            .catch((error) => console.error('Error:', error));
    }, []);


    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <ManufacturersTable data={manufacturers} newCm_cb={newCm_cb}/>
            </div>
            <CreateEditManufacturer open={createEdit} manufacturer={undefined}
                                    cb={createEdit_cb}></CreateEditManufacturer>
        </div>
    )
}
