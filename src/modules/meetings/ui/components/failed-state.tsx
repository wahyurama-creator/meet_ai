import { EmptyState } from "@/components/empty-state";
import { MeetingGetOne } from "../../types";
import { format } from "date-fns";

interface Props {
    data: MeetingGetOne;
};

export const FailedState = ({ data }: Props) => {
    return (
        <div className="flex flex-col items-center justify-start bg-white px-5
        py-4 rounded-lg gap-y-10">
            <EmptyState
                title="Meeting Failed"
                description="The meeting has failed. Please contact the host for more information."
            />
            <div className="flex flex-row justify-between rounded-lg border p-4">
                <div className="flex flex-col items-center">
                    <h4 className="text-md font-medium">Meeting Name</h4>
                    <p className="text-sm text-muted-foreground">{data.name}</p>
                </div>
                <div className="border-l h-10 mx-4" />
                <div className="flex flex-col items-center">
                    <h4 className="text-md font-medium">Started At</h4>
                    <p className="text-sm text-muted-foreground">{data.startedAt ? format(data.startedAt, "dd MMM yyyy | HH:mm") : "N/A"}</p>
                </div>
                <div className="border-l h-10 mx-4" />
                <div className="flex flex-col items-center">
                    <h4 className="text-md font-medium">Ended At</h4>
                    <p className="text-sm text-muted-foreground">{data.endedAt ? format(data.endedAt, "dd MMM yyyy | HH:mm") : "N/A"}</p>
                </div>
            </div>
            <div className="flex flex-col gap-y-2 bg-accent rounded-lg p-4">
                <h4 className="text-md font-medium">Error Description</h4>
                <p className="text-sm text-muted-foreground">
                    {data.errorDescription || "No error description provided"}
                </p>
            </div>
        </div>
    );
};