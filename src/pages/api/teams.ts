import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { prisma } from "../../server/db/client";
import { authOptions } from "./auth/[...nextauth]";

const teams = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const _method = req.method;
    const params = req.query;
    const session = await unstable_getServerSession(req, res, authOptions);

    switch (_method) {
        case "GET":
            if (session?.user?.id) {
                if (params.teamSlug) {
                    const team = await prisma.team.findFirst({
                        where: {
                            slug: params.teamSlug as string,
                            members: {
                                some: {
                                    userId: session.user.id
                                }
                            }
                        },
                    });
                    res.status(200).json({ message: 'success', data: team });
                }
                else {
                    const teams = await prisma.team.findMany({
                        where: {
                            members: {
                                some: {
                                    userId: session.user.id
                                }
                            }
                        }
                    });
                    res.status(200).json({ message: 'Success', data: teams, count: teams?.length || 0 });
                }
            } else {
                res.status(401).json({ message: 'Unauthorized' });
            }
            break;
        case "POST":
            if (session?.user?.id) {
                const newTeam = await prisma.team.create({
                    data: {
                        name: req.body.name,
                        slug: req.body.slug,
                        members: {
                            create: {
                                userId: session.user.id
                            }
                        },
                    }
                });
                res.status(200).json({ message: 'Success', data: newTeam });

            } else {
                res.status(401).json({ message: 'Unauthorized' });
            }
            break;

        default:
            res.status(401).json({ message: "Unauthorized" });
            break;
    }

}


export default teams;