import {useEffect, useState} from "react";
import {PartTypesTable} from "@/pages/Tables/partTypes-table.tsx";
import type {PartType} from "@/Models/PartType.ts";
import {CreateEditPartType} from "@/pages/Dialogs/CreateEditPartType.tsx";
import {getPartTypes} from "@/api/PartType_API.ts";

export default function PartTypes() {
    const [partTypes, setPartTypes] = useState<PartType[]>([]);
    const [createEdit, setCreateEdit] = useState(false);

    function newCm_cb() {
        setCreateEdit(true)
    }

    function createEdit_cb(partType: PartType | undefined) {
        console.log(partType);
        setCreateEdit(false)
    }

    useEffect(() => {
        getPartTypes()
            .then((data) => setPartTypes(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <PartTypesTable data={partTypes} newCm_cb={newCm_cb}/>
            </div>
            <CreateEditPartType open={createEdit} partType={undefined} cb={createEdit_cb}></CreateEditPartType>
        </div>
    )
}
