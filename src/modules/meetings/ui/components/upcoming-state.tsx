import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { BanIcon, VideoIcon } from "lucide-react";
import Link from "next/link";

interface UpcomingStateProps {
    meetingId: string;
    onCancelMeeting: () => void;
    isCancelling: boolean;
};

export const UpcomingState = ({
    meetingId,
    onCancelMeeting,
    isCancelling,
}: UpcomingStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center bg-white px-5
        py-4 rounded-lg gap-y-8">
            <EmptyState
                image="/upcoming.svg"
                title="Not Started Yet"
                description="This meeting has not started yet."
            />
            <div className="flex flex-col-reverse lg:flex-row lg:justify-center 
            items-center gap-2 w-full">
                <Button
                    variant={"secondary"}
                    className="w-full lg:w-auto"
                    onClick={onCancelMeeting}
                    disabled={isCancelling}
                >
                    <BanIcon />
                    Cancel Meeting
                </Button>
                <Button
                    asChild
                    className="w-full lg:w-auto"
                    disabled={isCancelling}
                >
                    <Link href={`/call/${meetingId}`}>
                        <VideoIcon />
                        Start Meeting
                    </Link>
                </Button>
            </div>
        </div>
    );
};