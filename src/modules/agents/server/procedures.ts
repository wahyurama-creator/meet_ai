import { db } from "@/db";
import { agents } from "@/db/schema";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentsInsertSchema } from "../schemas";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
    /**
     * Get a single agent by its ID.
     */
    getOne: baseProcedure
        .input(z.object({
            id: z.string(),
        }))
        .query(async ({ input }) => {
            const [existingAgent] = await db
                .select()
                .from(agents)
                .where(
                    eq(agents.id, input.id),
                );

            return existingAgent;
        }),
    /**
     * Get all agents.
     */
    getMany: baseProcedure.query(async () => {
        const data = await db
            .select()
            .from(agents);

        return data;
    }),
    /**
     * Create a new agent.
     * This is a protected procedure, meaning the user must be authenticated.
     * The new agent will be associated with the authenticated user.
     */
    create: protectedProcedure.input(agentsInsertSchema)
        .mutation(async ({ input, ctx }) => {
            const [createdAgent] = await db
                .insert(agents)
                .values({
                    ...input,
                    userId: ctx.auth.user.id,
                })
                .returning();

            return createdAgent;
        }),
});