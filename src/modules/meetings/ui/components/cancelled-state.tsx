import { EmptyState } from "@/components/empty-state";

export const CancelledState = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-white px-5
        py-4 rounded-lg gap-y-8">
            <EmptyState
                image="/cancelled.svg"
                title="Meeting Cancelled"
                description="This meeting has been cancelled."
            />
        </div>
    );
};