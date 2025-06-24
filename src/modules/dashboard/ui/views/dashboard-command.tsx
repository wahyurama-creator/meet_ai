import { CommandDialog, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

interface DashboardCommandProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
};

export const DashboardCommand = ({ open, setOpen }: DashboardCommandProps) => {
    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput
                placeholder="Find a meeting or agent"
            />
            <CommandList>
                <CommandItem>
                    Item 1
                </CommandItem>
            </CommandList>
        </CommandDialog>
    );
};