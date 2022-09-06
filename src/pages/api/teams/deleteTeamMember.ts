import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { prisma } from "../../../server/db/client";
import InstaLog from "../../../utils/Instalog";
import { authOptions } from "../auth/[...nextauth]";
const deleteTeamMember = async (req: NextApiRequest, res: NextApiResponse) => {
    const _method = req.method;
    const session = await unstable_getServerSession(req, res, authOptions);
    const { teamSlug, memberId } = JSON.parse(req.body);
    switch (_method) {
        case "DELETE":
            await prisma.teamMember.findFirst({
                where: {
                    id: memberId,
                    team: {
                        slug: teamSlug
                    }
                },
                include: {
                    user: true
                }
            }).then(async (member) => {
                if (member) {
                    await prisma.teamMember.delete({
                        where: {
                            id: memberId
                        }
                    });
                    const instaLog = new InstaLog(member.teamId);
                    instaLog.logEvent({
                        object: 'team',
                        action: { name: 'remove_member', },
                        actor: {
                            id: session?.user?.id!,
                            name: session?.user?.name!,
                            email: session?.user?.email!,
                            image: session?.user?.image!,
                        },
                        target: {
                            id: member.userId,
                            name: member.user.name,
                            email: member.user.email,

                        },
                        userId: member.userId,
                    });
                    res.status(200).json({ message: 'successfully deleted member' });
                } else {
                    res.status(404).json({ message: 'Team member not found' });
                }
            });
            break;
        default:
            res.setHeader("Allow", ["DELETE"]);
            res.status(405).end(`Method ${_method} Not Allowed`);
    }

}

export default deleteTeamMember;