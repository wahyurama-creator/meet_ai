import { auth } from "@/lib/auth";
import { MeetingsDetailView, MeetingsDetailViewError, MeetingsDetailViewLoading } from "@/modules/meetings/ui/views/meetings-detail-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
    params: Promise<{ meetingId: string }>
};

const Page = async ({ params }: PageProps) => {
    const { meetingId } = await params;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in");
    }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId }),
    );

    return (
        <HydrationBoundary>
            <Suspense fallback={<MeetingsDetailViewLoading />}>
                <ErrorBoundary fallback={<MeetingsDetailViewError />}>
                    <MeetingsDetailView meetingId={meetingId} />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    );
};

export default Page;