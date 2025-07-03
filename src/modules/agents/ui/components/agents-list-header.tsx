"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewAgentDialog } from "./new-agent-dialog";
import { useState } from "react";
import { AgentsSearchFilter } from "./agents-search-filter";
import { useAgentsFilter } from "../../hooks/use-agents-filter";
import { DEFAULT_PAGE } from "@/constants";

export const AgentsListHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useAgentsFilter();

    const isAnyFilterModifier = !!filter.search;

    const onClearFilter = () => {
        setFilter({
            search: "",
            page: DEFAULT_PAGE,

        });
    };

    return (
        <>
            <NewAgentDialog open={isOpen} onOpenChange={setIsOpen} />
            <div className="p-4 md:px-8 flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                    <h5 className="font-medium text-xl">My Agents</h5>
                    <Button
                        onClick={() => setIsOpen(true)}
                    >
                        <PlusIcon />
                        New Agent
                    </Button>
                </div>
                <div className="flex items-center gap-x-2 p-1">
                    <AgentsSearchFilter />
                    {
                        isAnyFilterModifier && (
                            <Button
                                variant={"outline"}
                                size={"sm"}
                                onClick={onClearFilter}
                            >
                                <XCircleIcon />
                                Clear
                            </Button>
                        )
                    }
                </div>
            </div>
        </>
    );
};