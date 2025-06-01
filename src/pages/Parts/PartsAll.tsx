import {PartTable} from "@/pages/Tables/part-table.tsx";
import {useEffect, useState} from "react";

export default function PartsAll() {

    const [parts, setParts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/parts', {headers: {'Authorization': 'Basic ' + btoa('q:q')}})
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setParts(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <PartTable data={parts}/>
            </div>
        </div>
    )
}
