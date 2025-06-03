import {useEffect, useState} from "react";
import {PartTypesTable} from "@/pages/Tables/partTypes-table.tsx";
import type {PartType} from "@/Models.ts";
import {getPartTypes} from "@/RequestHandlers.ts";

export default function PartTypes() {
    const [partTypes, setPartTypes] = useState<PartType[]>([]);

    useEffect(() => {
        getPartTypes()
            .then((data) => setPartTypes(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <PartTypesTable data={partTypes}/>
            </div>
        </div>
    )
}
