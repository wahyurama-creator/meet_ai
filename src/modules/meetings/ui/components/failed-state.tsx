import { EmptyState } from "@/components/empty-state";
import { MeetingGetOne } from "../../types";

interface Props {
    data: MeetingGetOne;
};

export const FailedState = ({ data }: Props) => {
    return (
        <div className="flex flex-col items-center justify-start bg-white px-5
        py-4 rounded-lg gap-y-8">
            

        </div>
    );
};