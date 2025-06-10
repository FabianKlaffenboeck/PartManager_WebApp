import {useEffect, useState} from "react";
import {FootprintsTable} from "@/pages/Tables/footprint-table.tsx";
import type {Footprint} from "@/Models/Footprint.ts";
import {CreateEditFootprint} from "@/pages/Dialogs/CreateEditFootprint.tsx";
import {getFootprints} from "@/api/Footprint_API.ts";

export default function Footprints() {
    const [footprints, setFootprints] = useState<Footprint[]>([]);
    const [createEdit, setCreateEdit] = useState(false);

    function newCm_cb() {
        setCreateEdit(true)
    }

    function createEdit_cb(footprint: Footprint | undefined) {
        console.log(footprint);
        setCreateEdit(false)
    }

    useEffect(() => {
        getFootprints()
            .then((data) => setFootprints(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <FootprintsTable data={footprints} newCm_cb={newCm_cb}/>
            </div>
            <CreateEditFootprint open={createEdit} footprint={undefined} cb={createEdit_cb}></CreateEditFootprint>
        </div>
    )
}
