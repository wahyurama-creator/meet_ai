import { serve } from "inngest/next";
import { inngest } from "@/inngest/inngest-client";
import { meetingsProcessing } from "@/inngest/functions";

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        meetingsProcessing,
    ],
});