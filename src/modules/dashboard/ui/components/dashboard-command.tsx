import { CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

interface DashboardCommandProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
};

export const DashboardCommand = ({ open, setOpen }: DashboardCommandProps) => {
    return (
        <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
            <CommandInput
                placeholder="Find a meeting or agent"
            />
            <CommandList>
                <CommandItem>
                    Item 1
                </CommandItem>
            </CommandList>
        </CommandResponsiveDialog>
    );
};