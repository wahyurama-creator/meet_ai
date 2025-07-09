"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { AgentsDetailHeader } from "../components/agents-detail-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { useState } from "react";
import { UpdateAgentDialog } from "../components/update-agent-dialog";

interface AgentDetailViewProps {
    agentId: string;
};

export const AgentDetailView = ({
    agentId
}: AgentDetailViewProps) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

    const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));

    const removeAgent = useMutation(
        trpc.agents.remove.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
                router.push("/agents");
            },
            onError: (error) => {
                toast.error(error.message);
            }
        }),
    );

    const [
        RemoveAgentConfirmationDialog,
        removeAgentConfirmation,
    ] = useConfirm({
        title: "Are you sure?",
        description: `The following action will remove ${data.meetingCount} associated meetings.`,
    });

    const handleRemoveAgent = async () => {
        const isOk = await removeAgentConfirmation();

        if (!isOk) return;

        await removeAgent.mutateAsync({ id: agentId });
    };

    return (
        <>
            <RemoveAgentConfirmationDialog />
            <UpdateAgentDialog
                open={updateAgentDialogOpen}
                onOpenChange={setUpdateAgentDialogOpen}
                initialValues={data}
            />
            <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <AgentsDetailHeader
                    agentId={agentId}
                    agentName={data.name}
                    onEdit={() => { setUpdateAgentDialogOpen(true) }}
                    onDelete={handleRemoveAgent}
                />

                <div className="bg-white rounded-lg border">
                    <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
                        <div className="flex item-center gap-x-3">
                            <GeneratedAvatar
                                variant={"botttsNeutral"}
                                seed={data.name}
                                className="size-10"
                            />
                            <h2 className="text-2xl font-medium">{data.name}</h2>
                        </div>
                        <Badge
                            variant={"outline"}
                            className="flex items-center gap-x-2 [&>svg]:size-4"
                        >
                            <VideoIcon className="text-blue-700" />
                            {data.meetingCount} {data.meetingCount === 1 ? "Meeting" : "Meetings"}
                        </Badge>
                        <div className="flex flex-col gap-y-2">
                            <p className="text-lg font-medium">Instructions</p>
                            <p className="text-sm text-neutral-800">{data.instructions}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const AgentsDetailsViewLoading = () => {
    return (
        <LoadingState
            title={"Loading Agent "}
            description={"This may take a few seconds."}
        />
    );
}

export const AgentsDetailsViewError = () => {
    return (
        <ErrorState
            title={"Error Loading Agents"}
            description={"Something went wrong."}
        />
    );
}