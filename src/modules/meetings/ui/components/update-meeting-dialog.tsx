import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meetings-form";
import { MeetingGetOne } from "../../types";

interface UpdateMeetingDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    initialValues: MeetingGetOne,
};

export const UpdateMeetingDialog = ({
    open,
    onOpenChange,
    initialValues,
}: UpdateMeetingDialogProps) => {

    return (
        <ResponsiveDialog
            title="Update Meeting"
            description="Update the meeting details"
            open={open}
            onOpenChange={onOpenChange}
        >
            <MeetingForm
                initialValues={initialValues}
                onSuccess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
            />
        </ResponsiveDialog>
    );
};