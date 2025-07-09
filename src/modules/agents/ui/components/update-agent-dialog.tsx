import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agents-form";
import { AgentGetOne } from "../../types";

interface UpdateAgentDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    initialValues: AgentGetOne,
};

export const UpdateAgentDialog = ({
    open,
    onOpenChange,
    initialValues,
}: UpdateAgentDialogProps) => {
    return (
        <ResponsiveDialog
            title="Update Agent"
            description="You can update the agent's name and description."
            open={open}
            onOpenChange={onOpenChange}
        >
            <AgentForm
                initialValues={initialValues}
                onSuccess={() => { onOpenChange(false) }}
                onCancel={() => { onOpenChange(false) }}
            />
        </ResponsiveDialog>
    );
};