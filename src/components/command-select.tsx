import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandEmpty, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "./ui/command";

interface CommandSelectProps {
    options: Array<{
        id: string,
        value: string,
        children: React.ReactNode,
    }>;
    onSelect: (value: string) => void;
    onSearch?: (value: string) => void;
    value: string;
    placeholder?: string;
    isSearchable?: boolean;
    className?: string;
};

export const CommandSelect = ({
    options,
    onSelect,
    onSearch,
    value,
    placeholder = "Select an option",
    isSearchable,
    className,
}: CommandSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find((option) => option.value === value);

    return (
        <>
            <Button
                type="button"
                variant={"outline"}
                className={
                    cn(
                        "h-9 justify-between font-normal px-2",
                        !selectedOption && "text-muted-foreground",
                        className,
                    )
                }
                onClick={() => setIsOpen(true)}
            >
                <div className="">
                    {selectedOption?.children ?? placeholder}
                </div>
                <ChevronsUpDownIcon />
            </Button>
            <CommandResponsiveDialog
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <CommandInput placeholder="Search..." onValueChange={onSearch} />
                <CommandList>
                    <CommandEmpty>
                        <span className="text-muted-foreground">
                            No options found
                        </span>
                    </CommandEmpty>
                    {
                        options.map((option) => (
                            <CommandItem
                                key={option.id}
                                onSelect={() => {
                                    onSelect(option.value);
                                    setIsOpen(false);
                                }}
                            >
                                {option.children}
                            </CommandItem>
                        ))
                    }
                </CommandList>
            </CommandResponsiveDialog>
        </>
    );
};