import {useEffect, useState} from "react";
import {FootprintsTable} from "@/pages/Tables/footprint-table.tsx";
import {getFootprints} from "@/api/RequestHandlers.ts";
import type {Footprint} from "@/Models/Footprint.ts";

export default function Footprints() {
    const [footprints, setFootprints] = useState<Footprint[]>([]);

    useEffect(() => {
        getFootprints()
            .then((data) => setFootprints(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <FootprintsTable data={footprints}/>
            </div>
        </div>
    )
}
