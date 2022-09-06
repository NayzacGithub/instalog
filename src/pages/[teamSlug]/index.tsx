import { GetServerSidePropsContext, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import React from "react";
import useSWR from "swr";
import { authOptions } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { prisma } from "../../server/db/client";
import InstaLog from "../../utils/Instalog";
import Head from "next/head";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ActivityLog from "../../components/ActivityLog";


interface FetcherArgs {
    url: string;
    options: RequestInit;
};
const fetcher = (fetchArgs: FetcherArgs) => fetch(fetchArgs.url, fetchArgs.options).then((res) => res.json());



const TeamActivity: NextPage = () => {
    const router = useRouter();
    const { teamSlug } = router.query;
    const { data: team } = useSWR(`/api/teams?teamSlug=${teamSlug}`, fetcher);

    return (
        <>
            <Head>
                <title>Instalog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {team && teamSlug &&
                <DashboardLayout teamView team={team}>
                    <ActivityLog team={team} />
                </DashboardLayout>
            }

        </>
    );
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions);
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    const team = await prisma.team?.findUnique({
        where: {
            slug: context.query.teamSlug as string
        },
    });

    if (team && session) {
        const log = new InstaLog(team.id);
        await log.logEvent({
            actor: {
                id: session?.user?.id!,
                name: session?.user?.name!,
                email: session?.user?.email!,
                image: session?.user?.image!,
            },
            object: "team",
            action: {
                name: "viewed_activity_log",
            },
            target: {
                name: team.name,
                slug: team.slug,
                id: team.id,
            },
            metadata: {
                url: context.req.url,
                remoteIp: context.req.socket.remoteAddress,
                x_request_id: context.req.headers['x-request-id'],
            }
        });
    }

    return {
        props: {
        },
    };
}

export default TeamActivity;
