import {useEffect, useState} from "react";
import {ManufacturersTable} from "@/pages/Tables/manufacturer-table.tsx";

export default function Manufacturers() {
    const [manufacturers, setManufacturers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/manufacturers', {headers: {'Authorization': 'Basic ' + btoa('q:q')}})
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setManufacturers(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <ManufacturersTable data={manufacturers}/>
            </div>
        </div>
    )
}
