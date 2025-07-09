import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { JSX, useState } from "react";

interface UseConfirmProps {
    title: string;
    description: string;
};

export const useConfirm = ({
    title,
    description,
}: UseConfirmProps): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{
        resolve: (value: boolean) => void;
    } | null>(null);

    const confirm = () => {
        return new Promise((resolve) => {
            setPromise({ resolve });
        });
    };

    const handleClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    };

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    };

    const ConfirmationDialog = () => {
        return (
            <ResponsiveDialog
                title={title}
                description={description}
                open={promise !== null}
                onOpenChange={handleClose}
            >
                <div className="pt-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center
                justify-end">
                    <Button
                        onClick={handleCancel}
                        variant={"outline"}
                        className="w-full lg:w-auto">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        variant={"destructive"}
                        className="w-full lg:w-auto">
                        Confirm
                    </Button>
                </div>
            </ResponsiveDialog>
        );
    };

    return [ConfirmationDialog, confirm];
}