import { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { prisma } from "../../server/db/client";
const edithandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerAuthSession({ req, res });
    if (req.method == "POST") {
        // Edit
        await prisma?.event.create({
            data: {
                object: "post",
                action: {
                    name: "edited",
                    icon: "edit",
                },
                actor: {
                    id: session?.user?.id!,
                    name: session?.user?.name!,
                    email: session?.user?.email!,
                    image: session?.user?.image!,
                },
                target: {
                    id: "testsetsasd",
                    email: "alisalah@gmail.com",
                    name: "Ali Salah",
                },
                userId: session?.user?.id,

            }
        });
        // Priority
        await prisma?.event.create({
            data: {
                object: "issue",
                action: {
                    name: "priority_changed",
                    icon: "priority",
                },
                actor: {
                    id: session?.user?.id!,
                    name: session?.user?.name!,
                    email: session?.user?.email!,
                    image: session?.user?.image!,
                },
                target: {
                    id: "testsetsasd",
                    email: "alisalah@gmail.com",
                    name: "Ali Salah",
                },
                metadata: {
                    newValue: "medium"
                },
                userId: session?.user?.id,
            }
        });
        // Status update
        await prisma?.event.create({
            data: {
                object: "issue",
                action: {
                    name: "updated_status",
                },
                actor: {
                    id: session?.user?.id!,
                    name: session?.user?.name!,
                    email: session?.user?.email!,
                    image: session?.user?.image!,
                },
                target: {
                    id: "testsetsasd",
                    email: "alisalah@gmail.com",
                    name: "Ali Salah",
                },
                metadata: {
                    oldValue: "In Progress",
                    newValue: "In Review",
                },
                userId: session?.user?.id,
            }
        });
        // Assign
        await prisma?.event.create({
            data: {
                object: "issue",
                action: {
                    name: "assigned",
                },
                actor: {
                    id: session?.user?.id!,
                    name: session?.user?.name!,
                    email: session?.user?.email!,
                    image: session?.user?.image!,
                },
                target: {
                    id: "testsetsasd",
                    email: "alisalah@gmail.com",
                    name: "Ali Salah",
                },
                metadata: {
                    oldValue: "In Progress",
                    newValue: "In Review",
                },
                userId: session?.user?.id,
            }
        });
        // Update Description
        await prisma?.event.create({
            data: {
                object: "issue",
                action: {
                    name: "updated_description",
                    icon: "edit",
                },
                actor: {
                    id: session?.user?.id!,
                    name: session?.user?.name!,
                    email: session?.user?.email!,
                    image: session?.user?.image!,
                },
                target: {
                    id: "testsetsasd",
                    email: "alisalah@gmail.com",
                    name: "Ali Salah",
                },
                userId: session?.user?.id,
            }
        });
        res.status(200).json({ "message": "success" });
    }
    res.status(403).json({ "message": "method not allowed" });

}

export default edithandler;