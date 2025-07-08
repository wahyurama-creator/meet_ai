import { AgentDetailView, AgentsDetailsViewError, AgentsDetailsViewLoading } from "@/modules/agents/ui/views/agents-detail-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface AgentDetailsProps {
    params: Promise<{ agentId: string }>
};

const AgentDetailsPage = async ({ params }: AgentDetailsProps) => {
    const { agentId } = await params;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.agents.getOne.queryOptions({ id: agentId }),
    );

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentsDetailsViewLoading />}>
                <ErrorBoundary fallback={<AgentsDetailsViewError />}>
                    <AgentDetailView agentId={agentId} />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    );
}

export default AgentDetailsPage;