import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

interface ActiveStateProps {
    meetingId: string;
};

export const ActiveState = ({
    meetingId,
}: ActiveStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center bg-white px-5
        py-4 rounded-lg gap-y-8">
            <EmptyState
                image="/upcoming.svg"
                title="Meeting is Active"
                description="Meeting will end once all participants have joined."
            />
            <div className="flex flex-col lg:flex-row lg:justify-center 
            items-center gap-2 w-full">
                <Button
                    asChild
                    className="w-full lg:w-auto"
                >
                    <Link href={`/meetings/${meetingId}`}>
                        <VideoIcon />
                        Join Meeting
                    </Link>
                </Button>
            </div>
        </div>
    );
};