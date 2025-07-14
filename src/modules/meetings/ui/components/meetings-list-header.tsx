"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { NewMeetingDialog } from "./new-meeting-dialog";

export const MeetingsListHeader = () => {
    const [isOpen, setIsOpen] = useState(false);

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
                <div className="flex items-center gap-x-2 p-1">
                    {/* TODO: Add filters */}
                </div>
            </div>
        </>
    );
};