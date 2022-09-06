import { GetServerSidePropsContext, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import React, { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import InstaLogLogo from "../../components/InstalogLogo";
import { authOptions } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { prisma } from "../../server/db/client";
import InstaLog, { InstalogEvent, InstalogEventWithId } from "../../utils/Instalog";
import debounce from 'lodash.debounce';
import Head from "next/head";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ActivityLog from "../../components/ActivityLog";
// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

interface ToolbarProps {
    exports?: boolean,
    liveFeed?: boolean,
    filter?: boolean,
}

const Toolbar: React.FunctionComponent<ToolbarProps> = ({ exports, liveFeed, filter }) => {
    return (
        <div className="flex border-collapse border rounded-lg border-[#E0E0DF] text-[#575757]">
            <input type="text" placeholder="Search name, email or action..." className="bg-transparent p-3 grow text-[575757] min-w-[250px] border-none " />
            {filter && <button className="p-2 border-l">FILTER</button>}
            {exports && <button className="p-2 border-l">EXPORT</button>}
            {liveFeed && <button className="p-2 border-l">LIVE</button>}
        </div>
    );
}



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
        const event = await log.logEvent({
            //@ts-ignore
            actor: { ...session.user },
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
