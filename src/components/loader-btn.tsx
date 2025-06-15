import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

export interface LoadingButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    loading?: boolean
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
    ({ className, variant, size, asChild = false, loading = false, children, ...props }, ref) => {
        const Comp = asChild ? Slot : Button

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={loading || props.disabled}
                {...props}
            >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {children}
            </Comp>
        )
    }
)
LoadingButton.displayName = "LoadingButton"

export { LoadingButton }
