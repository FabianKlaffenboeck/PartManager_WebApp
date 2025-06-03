import {useEffect, useState} from "react";
import {ManufacturersTable} from "@/pages/Tables/manufacturer-table.tsx";
import {getManufacturers} from "@/pages/RequestHandlers.ts";
import type {Manufacturer} from "@/Models.ts";

export default function Manufacturers() {
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);


    useEffect(() => {
        getManufacturers()
            .then((data) => setManufacturers(data))
            .catch((error) => console.error('Error:', error));
    }, []);


    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <ManufacturersTable data={manufacturers}/>
            </div>
        </div>
    )
}
