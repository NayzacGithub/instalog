import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { getToken } from "next-auth/jwt";

const teams = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const _method = req.method;
    const params = req.query;
    const token = await getToken({ req: req });
    if (!token) {
        res.status(401).json({ "message": "Unauthorized" });
        return;
    }
    switch (_method) {
        case "GET":
            if (token.sub) {
                if (params.teamSlug) {
                    const team = await prisma.team.findFirst({
                        where: {
                            slug: params.teamSlug as string,
                            members: {
                                some: {
                                    userId: token.sub
                                }
                            }
                        },
                    });
                    res.status(200).json({ message: 'success', data: team });
                    return;
                }
                else {
                    const teams = await prisma.team.findMany({
                        where: {
                            members: {
                                some: {
                                    userId: token.sub
                                }
                            }
                        }
                    });
                    res.status(200).json({ message: 'Success', data: teams, count: teams?.length || 0 });
                    return;
                }
            } else {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }
        case "POST":
            if (token.sub) {
                const newTeam = await prisma.team.create({
                    data: {
                        name: req.body.name,
                        slug: req.body.slug,
                        members: {
                            create: {
                                userId: token.sub,
                                role: "ADMIN"
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
            return;
    }
}


export default teams;