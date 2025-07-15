import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { TRPCError } from "@trpc/server";
import { meetingsInsertSchema, meetingsUpdateSchema } from "../schemas";
import { MeetingStatus } from "../types";

export const meetingsRouter = createTRPCRouter({
    /**
     * Get a single agent by its ID.
     */
    getOne: protectedProcedure
        .input(z.object({
            id: z.string(),
        }))
        .query(async ({ input, ctx }) => {
            const [existingMeeting] = await db
                .select({
                    ...getTableColumns(meetings),
                })
                .from(meetings)
                .where(
                    and(
                        eq(meetings.id, input.id),
                        eq(meetings.userId, ctx.auth.user.id),
                    ),
                );

            if (!existingMeeting) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `Meeting with ID ${input.id} not found.`,
                });
            }

            return existingMeeting;
        }),
    /**
     * Get all meetings.
     */
    getMany: protectedProcedure
        .input(
            z.object(
                {
                    page: z.number().default(DEFAULT_PAGE),
                    pageSize: z
                        .number()
                        .min(MIN_PAGE_SIZE)
                        .max(MAX_PAGE_SIZE)
                        .default(DEFAULT_PAGE_SIZE),
                    search: z.string().nullish(),
                    agentId: z.string().nullish(),
                    status: z.nativeEnum(MeetingStatus).nullish(),
                },
            ),
        )
        .query(async ({ ctx, input }) => {
            const {
                page,
                pageSize,
                search,
                agentId,
                status,
            } = input;

            const data = await db
                .select({
                    ...getTableColumns(meetings),
                    agent: agents,
                    duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`,
                })
                .from(meetings)
                .innerJoin(agents, eq(meetings.agentId, agents.id))
                .where(
                    and(
                        eq(meetings.userId, ctx.auth.user.id),
                        search ? ilike(meetings.name, `%${search}%`) : undefined,
                        status ? eq(meetings.meetingStatus, status) : undefined,
                        agentId ? eq(meetings.agentId, agentId) : undefined,
                    ),
                )
                .orderBy(desc(meetings.createdAt), desc(meetings.id))
                .limit(pageSize)
                .offset((page - 1) * pageSize);

            const [total] = await db
                .select({
                    count: count(),
                })
                .from(meetings)
                .innerJoin(agents, eq(meetings.agentId, agents.id))
                .where(
                    and(
                        eq(meetings.userId, ctx.auth.user.id),
                        search ? ilike(meetings.name, `%${search}%`) : undefined,
                        status ? eq(meetings.meetingStatus, status) : undefined,
                        agentId ? eq(meetings.agentId, agentId) : undefined,
                    )
                )

            const totalPages = Math.ceil(total.count / pageSize);

            return {
                items: data,
                total: total.count,
                totalPages
            };
        }),
    /**
     * Creates a new meeting for the current user.
     * Input: Meeting details (see meetingsInsertSchema).
     * Returns: The created meeting object.
     */
    create: protectedProcedure.input(meetingsInsertSchema)
        .mutation(async ({ input, ctx }) => {
            const [createdMeeting] = await db
                .insert(meetings)
                .values({
                    ...input,
                    userId: ctx.auth.user.id,
                })
                .returning();

            return createdMeeting;
        }),
    /**
     * Updates an existing meeting for the current user.
     * Input: Meeting details (see meetingsUpdateSchema).
     * Returns: The updated meeting object.
     */
    update: protectedProcedure.input(meetingsUpdateSchema)
        .mutation(async ({ input, ctx }) => {
            const [updatedMeeting] = await db
                .update(meetings)
                .set(input)
                .where(
                    and(
                        eq(meetings.id, input.id),
                        eq(meetings.userId, ctx.auth.user.id),
                    ),
                )
                .returning();

            if (!updatedMeeting) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `Meeting with ID ${input.id} not found.`,
                });
            }

            return updatedMeeting;
        }),
});