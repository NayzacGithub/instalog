
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import slugify from 'slugify';
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import DashboardLayout from "../../components/layouts/DashboardLayout";


interface FetcherArgs {
    url: string;
    options: RequestInit;
};
const fetcher = ({ url, options }: FetcherArgs) => fetch(url, options).then((res) => res.json());

const DashboardPage = () => {
    const { data: teams, mutate } = useSWR({ url: '/api/teams' }, fetcher);
    const [slug, setSlug] = useState<string>();
    const [teamName, setTeamName] = useState<string>();

    const createTeam = async () => {
        await fetch('/api/teams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: teamName,
                slug: slug,
            })
        });
        mutate();
    }

    useEffect(() => {
        if (teamName) {
            setSlug(slugify(teamName, { lower: true, strict: true }));
        }
    }, [teamName]);

    const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTeamName(e.target.value);
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createTeam();
    }

    return (
        <DashboardLayout>
            <div className="bg-white border-x border-b rounded-b-2xl shadow lg:pb-10 lg:px-10 min-h-[457px]">
                <div className="grid grid-cols-2 gap-8">
                    <div className="col-span-2 bg-white rounded-xl shadow-2xl border transition p-5 ">
                        <form className="grid grid-cols-2 gap-x-8 gap-y-4" onSubmit={handleFormSubmit}>
                            <div className="flex flex-col ">
                                <label htmlFor="slug">
                                    <span className="inline-block pb-2 form-label">Team name</span>
                                    <div className="relative flex items-center">
                                        <div className="flex w-full">
                                            <input type="text" name="" className="rounded-none rounded-r-lg border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" onChange={handleTeamNameChange} />
                                        </div>
                                    </div>
                                </label>
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="slug">
                                    <span className="inline-block pb-2 form-label">Slug</span>
                                    <div className="relative flex items-center">
                                        <div className="flex w-full">
                                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300">
                                                instalog.app/
                                            </span>
                                            <input type="text" id="website-admin" className="rounded-none rounded-r-lg border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" value={slug} onChange={(e) => setSlug(slugify(e.target.value, { strict: true, lower: true }))} />
                                        </div>
                                    </div>
                                </label>
                            </div>
                            <button type="submit" className="bg-gray-800 text-white py-3 col-span-2 rounded-xl">Create team</button>
                        </form>
                    </div>
                    {teams && teams.data?.map((team: any) => (
                        <Link href={`/${team.slug}`} key={team.id}>
                            <a className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition p-5 group">
                                <div className="flex justify-between">
                                    <div className="flex items-center">
                                        <h1 className="font-bold text-2xl text-gray-900 truncate">{team.name}</h1>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 text-gray-400 transition duration-500 ease-in-out fill-current dark:text-gray-700 dark:group-hover:text-gray-500 group-hover:text-gray-600"><path d="M294.1 256 167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}

export async function getServerSideProps(context: any) {
    const session = await getServerAuthSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            },
        };
    }

    return {
        props: {
        },
    };
}

export default DashboardPage;
