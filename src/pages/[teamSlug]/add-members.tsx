import { GetServerSidePropsContext, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import useSWR from "swr";
import { authOptions } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import Image from "next/image";
import { Team } from "../../schemas/team.schema";
import { prisma } from "../../server/db/client";
import { z } from "zod";
import DashboardLayout from "../../components/layouts/DashboardLayout";

interface FetcherArgs {
    url: string;
    options: RequestInit;
};
const fetcher = ({ url, options }: FetcherArgs) => fetch(url, options).then((res) => res.json());


const addTeamMemberSchema = z.object({
    email: z.string().email(),
});

type AddTeamMemberInput = z.TypeOf<typeof addTeamMemberSchema>;

interface AddTeamMemberProps {
    team: Team;
}

const AddTeamMembersPage: NextPage<AddTeamMemberProps> = ({ team }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const { teamSlug } = router.query;
    const { data: teamMembers, mutate } = useSWR({ url: `/api/teams/members?teamSlug=${teamSlug}` }, fetcher);
    const [email, setEmail] = useState<string>("");
    const addTeamMember = async (teamMember: AddTeamMemberInput) => {
        const result = await fetch('/api/teams/addTeamMember', {
            method: 'POST',
            body: JSON.stringify({
                teamSlug: teamSlug,
                email: teamMember.email,
            }),
        })
        if (result.status === 200) {
            mutate();
        }
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addTeamMember({ email: email });
    }


    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const deleteUser = async (memberId: string) => {
        const result = await fetch('/api/teams/deleteTeamMember', {
            method: 'DELETE',
            body: JSON.stringify({
                teamSlug: teamSlug,
                memberId: memberId,
            }),
        })
        if (result.status === 200) {
            mutate();
        }
    }

    const handleUserDelete = (memberId: string) => {
        if (confirm("Are you sure you want to delete this user?")) {
            deleteUser(memberId);
        }
    }


    return (
        <DashboardLayout team={team} teamView={true} >
            <div className="bg-white border-x border-b rounded-b-2xl shadow lg:pb-10 lg:px-10 min-h-[457px]">
                <form className=" bg-white rounded-2xl shadow-xl border mx-auto max-w-[350px] p-5 mb-10" onSubmit={handleFormSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="email">
                            <span className="inline-block pb-2 form-label">User's Email address</span>
                            <div className="relative flex items-center">
                                <div className="flex w-full">
                                    <input type="email" required className="rounded-none rounded-r-lg border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" onChange={handleEmailChange} />
                                </div>
                            </div>
                        </label>
                    </div>

                    <button type="submit" className="bg-gray-800 text-white py-3 px-2 mt-5 col-span-2 rounded-xl">Add team member</button>
                </form>

                <div className="grid grid-cols-2 items-center justify-between w-full h-full  gap-5">
                    {teamMembers && teamMembers.data.map((teamMember: any) =>
                        <div className="border rounded-xl p-5 bg-white shadow-xl text-gray-900 flex gap-5 mx-auto relative" key={teamMember.id}>
                            {teamMember.user.role != "ADMIN" &&
                                < a className="absolute top-3 right-3 cursor-pointer hover:scale-110 transition-transform" onClick={() => handleUserDelete(teamMember.id)} >
                                    🗑️
                                </a>
                            }
                            {teamMember.user?.image && <Image src={teamMember.user.image} alt="Avatar" className="my-auto h-6 w-6 rounded-full" width={56} height={56} layout="fixed" />}
                            <div className="flex flex-col">
                                <h1 className="text-xl font-bold">{teamMember.user?.name}</h1>
                                <h1 className="text-xl mb-2">{teamMember.user?.email}</h1>
                                <p>User ID: {teamMember.id}</p>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions);
    if (!session) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            },
        };
    }

    const team = await prisma.team?.findUnique({
        where: {
            slug: context.query.teamSlug as string
        },
        select: {
            id: true,
            name: true,
            slug: true,
        }
    });

    return {
        props: {
            team: team,
        },
    };
}

export default AddTeamMembersPage;
