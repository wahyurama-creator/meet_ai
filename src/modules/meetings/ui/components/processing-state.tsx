import { EmptyState } from "@/components/empty-state";

export const ProcessingState = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-white px-5
        py-4 rounded-lg gap-y-8">
            <EmptyState
                image="/processing.svg"
                title="Meeting Completed"
                description="This meeting was completed, a summary will be available soon."
            />
        </div>
    );
};