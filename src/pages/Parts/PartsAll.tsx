import {PartTable} from "@/pages/Tables/part-table.tsx";
import {useEffect, useState} from "react";
import {StockDrawer} from "@/pages/Parts/StockDrawer.tsx";
import type {Part} from "@/Models.ts";
import {toast} from "sonner";
import {getParts, updatePart} from "../../RequestHandlers.ts";

export default function PartsAll() {

    const [parts, setParts] = useState<Part[]>([]);
    const [selectedPart, setSelectedPart] = useState<Part | undefined>(undefined);
    const [openStockAdj, setOpenStockAdj] = useState(false);

    useEffect(() => {
        getParts()
            .then((data) => setParts(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    function editHandler(id: number) {
        setSelectedPart(parts.find(it => it.id == id));
    }

    function adjustStockHandler(id: number) {
        setSelectedPart(parts.find(it => it.id == id));
        setOpenStockAdj(true)
    }

    function handleStockAdjSave(amount: number, aboard: boolean) {
        if (aboard) {
            setOpenStockAdj(false)
            setSelectedPart(undefined)
            return;
        }

        if (!selectedPart) {
            return;
        }

        const part = selectedPart;
        part.quantity = amount;
        updatePart(part)
            .then(() => {
                setParts(parts.map(it => it.id === part.id ? part : it))
                toast("Stock has been Updated!")
            })
            .catch((error) => console.error('Error:', error));


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
