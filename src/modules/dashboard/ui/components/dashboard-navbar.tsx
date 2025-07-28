"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { DashboardCommand } from "./dashboard-command";
import { useEffect, useState } from "react";

const DashboardNavbar = () => {
    const { isMobile, toggleSidebar, state } = useSidebar();
    const [commandOpen, setCommandOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCommandOpen((isOpen) => !isOpen);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            <DashboardCommand
                open={commandOpen}
                setOpen={setCommandOpen}
            />
            <nav className="flex p-4 gap-x-2 items-center py-3 border-b bg-background">
                <Button
                    onClick={toggleSidebar}
                    className="size-9"
                    variant={"outline"}>
                    {
                        (state === 'collapsed' || isMobile) ?
                            <PanelLeftIcon className="size-4" /> :
                            <PanelLeftCloseIcon className="size-4" />
                    }
                </Button>
                <Button
                    className="h-9 w-[240px] justify-start font-normal text-muted-foreground
                        hover:text-muted-foreground"
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => { setCommandOpen((isOpen) => !isOpen); }}
                >
                    <SearchIcon />
                    Search
                    <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1
                rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                        <span>&#8984;</span>K
                    </kbd>
                </Button>
            </nav>
        </>
    );
}

export default DashboardNavbar;