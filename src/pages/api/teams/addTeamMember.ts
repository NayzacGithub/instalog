import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../server/db/client";
import InstaLog from "../../../utils/Instalog";
import { BasicInstalogActor } from "../../../utils/InstalogInterfaces";

const addTeamMember = async (req: NextApiRequest, res: NextApiResponse) => {
    const _method = req.method;
    const session = await unstable_getServerSession(req, res, authOptions);
    const { teamSlug, email: memberEmail } = JSON.parse(req.body);

    const team = await prisma.team?.findFirst({
        where: {
            slug: teamSlug,
            members: {
                some: {
                    userId: session?.user?.id
                }
            }
        }
    });
    const user = await prisma.user?.findFirst({
        where: {
            email: memberEmail
        }
    });
    if (!team) res.status(404).json({ message: 'Team not found' });

    if (!user) res.status(404).json({ message: 'User not found' });

    switch (_method) {
        case "POST":
            const newMember = await prisma.teamMember.create({
                data: {
                    team: {
                        connect: {
                            slug: teamSlug
                        }
                    },
                    user: {
                        connect: {
                            email: memberEmail
                        }
                    }
                },
                include: {
                    user: true
                }
            });
            if (team) {
                const instalog = new InstaLog(team.id);
                instalog.logEvent({
                    object: 'team',
                    action: { name: 'add_member', },
                    actor: {
                        id: session?.user?.id!,
                        name: session?.user?.name!,
                        email: session?.user?.email!,
                        image: session?.user?.image!,
                    },
                    target: {
                        id: newMember.id,
                        email: newMember.user.email,
                        name: newMember.user.name,

                    },
                    userId: session?.user?.id,

                });
            }
            res.status(200).json({ message: 'Success', data: newMember });
            break;
        default:
            res.status(405).json({ message: "Method Not Allowed" });
            break;
    }
}

export default addTeamMember;