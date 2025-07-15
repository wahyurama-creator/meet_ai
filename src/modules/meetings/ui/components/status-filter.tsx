import { CheckCircleIcon, ClockArrowUpIcon, Loader2Icon, VideoIcon, XCircleIcon } from "lucide-react";
import { MeetingStatus } from "../../types";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import { CommandSelect } from "@/components/command-select";

const options = [
    {
        id: MeetingStatus.Upcoming,
        value: MeetingStatus.Upcoming,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <ClockArrowUpIcon />
                {MeetingStatus.Upcoming}
            </div>
        )
    },
    {
        id: MeetingStatus.Completed,
        value: MeetingStatus.Completed,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <CheckCircleIcon />
                {MeetingStatus.Completed}
            </div>
        )
    },
    {
        id: MeetingStatus.Active,
        value: MeetingStatus.Active,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <VideoIcon />
                {MeetingStatus.Active}
            </div>
        )
    },
    {
        id: MeetingStatus.Processing,
        value: MeetingStatus.Processing,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <Loader2Icon />
                {MeetingStatus.Processing}
            </div>
        )
    },
    {
        id: MeetingStatus.Cancelled,
        value: MeetingStatus.Cancelled,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <XCircleIcon />
                {MeetingStatus.Cancelled}
            </div>
        )
    },
];

export const StatusFilter = () => {
    const [filter, setFilter] = useMeetingsFilter();


    return (
        <CommandSelect
            placeholder="Status"
            className="h-9"
            options={options}
            onSelect={(value) => setFilter({ status: value as MeetingStatus })}
            value={filter.status ?? ""}
        />
    );
};