"use client"

import * as React from "react"
import {CheckIcon, ChevronsUpDownIcon} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"


export type searchableSelectElement = { id: number, label: string }

export function SearchableSelect({placeholder, elements}: {
    placeholder: string
    elements: searchableSelectElement[]
}) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState<number>()

    return (<Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
            >
                {value ? elements.find((framework) => framework.id == value)?.label : ("select a " + placeholder)}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
            <Command>
                <CommandInput placeholder={("select a " + placeholder)}/>
                <CommandList>
                    <CommandEmpty>{"No " + placeholder + " found."}</CommandEmpty>
                    <CommandGroup>
                        {elements.map((element) => (
                            <CommandItem
                                key={element.id}
                                value={element.id.toString()}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value?.toString() ? undefined : Number(currentValue))
                                    setOpen(false)
                                }}>
                                <CheckIcon
                                    className={cn("mr-2 h-4 w-4", value == element.id ? "opacity-100" : "opacity-0")}
                                />
                                {element.label}
                            </CommandItem>))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>)
}