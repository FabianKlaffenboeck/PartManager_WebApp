import {Minus, Plus} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import type {Part} from "@/Models.ts";
import {useEffect, useState} from "react";

export function StockDrawer({open, part, handleStockAdjSave}: {
    open: boolean
    part: Part | undefined,
    handleStockAdjSave: (amount: number) => void;
}) {
    const [stock, setStock] = useState(0)

    useEffect(() => {
        setStock(part?.quantity || 0);
    }, [part]);

    function onClick(adjustment: number) {
        setStock(stock + adjustment)
    }

    return (
        <Drawer open={open}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Adjust Stock</DrawerTitle>
                        <DrawerDescription>Set your new Stock CNT</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 shrink-0 rounded-full"
                                onClick={() => onClick(-1)}
                            >
                                <Minus/>
                                <span className="sr-only">Decrease</span>
                            </Button>
                            <div className="flex-1 text-center">
                                <div className="text-7xl font-bold tracking-tighter">
                                    {stock}
                                </div>
                                <div className="text-muted-foreground text-[0.70rem] uppercase">
                                    Parts
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 shrink-0 rounded-full"
                                onClick={() => onClick(1)}
                            >
                                <Plus/>
                                <span className="sr-only">Increase</span>
                            </Button>
                        </div>
                    </div>
                    <DrawerFooter>
                        <Button onClick={() => handleStockAdjSave(stock)}>Save</Button>
                        <Button onClick={() => handleStockAdjSave(stock)} variant="outline">Cancel</Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
