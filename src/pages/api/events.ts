import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

interface GetParameters {
    searchTerm?: string;
    cursor?: string;
    pageCount?: string;
    teamSlug?: string;

}

const events = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { searchTerm, cursor, pageCount }: GetParameters = req.query;
        console.log(req.query);
        const { teamslug } = req.headers;
        const events = await prisma.event?.findMany({
            take: parseInt(pageCount as string, 10) || 5,
            where: {
                AND: [
                    {
                        OR: [
                            { actor: { string_contains: searchTerm?.trim() ?? "", path: '$.email' } },
                            { action: { string_contains: searchTerm?.trim() ?? "", path: '$.name' } },
                            {
                                target: {
                                    string_contains: searchTerm?.trim() ?? "", path: '$.user.name',
                                }
                            },
                        ],
                    }, {
                        team: {
                            slug: teamslug as string,
                        }
                    }
                ]
            },
            orderBy: {
                occuredAt: 'desc'
            },
            select: {
                id: true,
                object: true,
                actor: true,
                action: true,
                target: true,
                metadata: true,
                occuredAt: true,
                system: false,
            }

        });
        res.status(200).json({ message: 'success', data: events, pagination: { pageCount: pageCount, cursor: cursor }, count: events?.length || 0 });
    } else if (req.method === 'POST') {
        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const teamId = req.headers['teamid'] as string;
        const systemWide = teamId === process.env.SYSTEM_SECRET;

        const newEvent = await prisma.event.create({
            data: {
                actor: req.body.actor,
                action: req.body.action,
                target: req.body.target,
                object: req.body.object,
                metadata: req.body.metadata,
                location: (ipAddress as string),
                system: systemWide,
                team: {
                    connect: {
                        id: teamId
                    }
                }
            }
        });
        res.status(200).json({ message: 'Success', data: newEvent });
    }
    else {
        res.status(405).json({ message: 'Hello World' });
    }
}

export default events;