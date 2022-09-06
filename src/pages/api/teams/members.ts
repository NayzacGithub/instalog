import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { prisma } from "../../../server/db/client";
import { authOptions } from "../auth/[...nextauth]";
const teamMembers = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const session = await unstable_getServerSession(req, res, authOptions);

    const { method } = req;
    const { teamSlug } = req.query;
    //TODO REMOVE TEAM MEMBER
    if (method === "GET") {
        const teamMembers = await prisma.teamMember?.findMany({
            where: {
                team: {
                    slug: teamSlug as string
                }
            },
            include: {
                user: true
            }
        });
        res.status(200).json({ message: 'Success', data: teamMembers });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

export default teamMembers;