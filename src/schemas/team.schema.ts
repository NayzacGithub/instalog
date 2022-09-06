import z from 'zod';

export const teamSchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    members: z.array(
        z.object({
            id: z.string(),
            userId: z.string(),
            teamId: z.string(),
        }),
    ),
});

export type Team = z.infer<typeof teamSchema>;