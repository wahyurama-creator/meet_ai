"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export const MeetingsListHeader = () => {
    const trpc = useTRPC();
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useMeetingsFilter();
    
    const { data } = useSuspenseQuery(
        trpc.meetings.getMany.queryOptions({
            ...filters,
        }),
    );

    const isAnyFilterModified = !!filters.agentId || !!filters.status || !!filters.search;
    const onClearFilters = () => {
        setFilters({
            status: null,
            agentId: "",
            search: "",
            page: 1,
        });
    };

    return (
        <>
            <NewMeetingDialog
                open={isOpen}
                onOpenChange={setIsOpen}
            />
            <div className="p-4 md:px-8 flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                    <h5 className="font-medium text-xl">My Meetings</h5>
                    <Button
                        onClick={() => setIsOpen(true)}
                    >
                        <PlusIcon />
                        New Meeting
                    </Button>
                </div>
                {
                    data.items.length > 0 && (
                        <ScrollArea>
                            <div className="flex items-center gap-x-2 p-1">
                                <MeetingsSearchFilter />
                                <StatusFilter />
                                <AgentIdFilter />
                                {
                                    isAnyFilterModified && (
                                        <Button
                                            variant={"outline"}
                                            onClick={onClearFilters}
                                        >
                                            <XCircleIcon className="size-4" />
                                            Clear
                                        </Button>
                                    )
                                }
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    )
                }
            </div>
        </>
    );
};