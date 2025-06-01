import {PartTable} from "@/pages/Tables/part-table.tsx";
import {useEffect, useState} from "react";
import {StockDrawer} from "@/pages/Parts/StockDrawer.tsx";
import type {Part} from "@/Models.ts";

export default function PartsAll() {

    const [parts, setParts] = useState<Part[]>([]);
    const [selectedPart, setSelectedPart] = useState<Part | undefined>(undefined);
    const [openStockAdj, setOpenStockAdj] = useState(false);

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

    function editHandler(id: number) {
        setSelectedPart(parts.find(it => it.id == id));
    }

    function adjustStockHandler(id: number) {
        setSelectedPart(parts.find(it => it.id == id));
        setOpenStockAdj(true)
    }

    function handleStockAdjSave(amount: number) {
        console.log(amount);
        setOpenStockAdj(false)
        setSelectedPart(undefined)
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <PartTable data={parts} editHandler={editHandler} adjustStockHandler={adjustStockHandler}/>
            </div>
            <StockDrawer open={openStockAdj} part={selectedPart} handleStockAdjSave={handleStockAdjSave}></StockDrawer>
        </div>
    )
}
