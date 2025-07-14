"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { DataTable } from "@/components/data-table";
import { EmptyState } from "@/components/empty-state";
import { useRouter } from "next/navigation";

export const MeetingsView = () => {
    const router = useRouter();
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable
                columns={columns}
                data={data.items}
                onRowClick={(row) => { router.push(`/meetings/${row.id}`) }}
            />
            {data?.items.length === 0 && (
                <EmptyState
                    title="Create Your First Meeting"
                    description="Schedule a meeting to connect with others. Each meeting lets you
                    collaborate, share ideas, and get things done."
                />
            )}
        </div>
    );
};

export const MeetingsViewLoading = () => {
    return (
        <LoadingState
            title={"Loading Meetings"}
            description={"This may take a few seconds."}
        />
    );
}

export const MeetingsViewError = () => {
    return (
        <ErrorState
            title={"Error Loading Meetings"}
            description={"Something went wrong."}
        />
    );
}