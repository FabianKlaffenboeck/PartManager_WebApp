import {useEffect, useState} from "react";
import type {Shelf} from "@/Models.ts";
import {getShelfs} from "@/pages/RequestHandlers.ts";
import {StorageTable} from "../Tables/storage-table";

export default function Storage() {

    const [shelfs, setShelfs] = useState<Shelf[]>([]);

    useEffect(() => {
        getShelfs()
            .then((data) => setShelfs(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <StorageTable data={shelfs}/>
            </div>
        </div>
    )
}
