"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useConfirm } from "@/hooks/use-confirm";
import { MeetingsDetailHeader } from "@/modules/meetings/ui/components/meetings-detail-header";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";

interface MeetingsDetailViewProps {
    meetingId: string;
};

export const MeetingsDetailView = ({ meetingId }: MeetingsDetailViewProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const router = useRouter();

    const [isUpdateMeetingDialogOpen, setIsUpdateMeetingDialogOpen] = useState(false);

    const { data } = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId }),
    );

    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                router.push("/meetings");
            },
            onError: (error) => {
                toast.error(error.message);
            }
        }),
    );

    const [
        RemoveMeetingConfirmationDialog,
        removeMeetingConfirmation,
    ] = useConfirm({
        title: "Are you sure?",
        description: `The following action will remove ${data.name} from your meetings.`,
    });

    const handleRemoveMeeting = async () => {
        const isOk = await removeMeetingConfirmation();

        if (!isOk) return;

        await removeMeeting.mutateAsync({ id: meetingId });
    };

    return (
        <>
            <RemoveMeetingConfirmationDialog />
            <UpdateMeetingDialog
                open={isUpdateMeetingDialogOpen}
                onOpenChange={setIsUpdateMeetingDialogOpen}
                initialValues={data}
            />
            <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <MeetingsDetailHeader
                    meetingId={meetingId}
                    meetingName={data.name}
                    onEdit={() => setIsUpdateMeetingDialogOpen(true)}
                    onDelete={handleRemoveMeeting}
                />
            </div>
        </>
    );
};

export const MeetingsDetailViewLoading = () => {
    return (
        <LoadingState
            title="Loading Meeting Details..."
            description="Please wait while we load the meeting details."
        />
    );
};

export const MeetingsDetailViewError = () => {
    return (
        <ErrorState
            title="Error Loading Meeting Details..."
            description="Please try again later."
        />
    );
};