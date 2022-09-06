import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DashboardNavigation from "../DashboardNavigation";
import InstaLogLogo from "../InstalogLogo";

interface DashbaordLayoutProps {
    children: React.ReactNode;
    teamView?: boolean;
    team?: any;
}

const DashboardLayout: React.FunctionComponent<DashbaordLayoutProps> = ({ children, teamView, team }: DashbaordLayoutProps) => {
    const teamSlug = team?.data?.slug || team?.slug;
    const router = useRouter();
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <div className="max-w-5xl mx-auto">
                    <DashboardNavigation />
                    <div className="flex flex-wrap items-center justify-center w-full py-4 bg-white lg:py-10 lg:px-10 to lg:rounded-t-xl ">
                        <div className="flex flex-col items-center justify-between w-full h-full lg:flex-row">
                            <div className="relative flex flex-wrap items-center w-full h-full py-2 -ml-2 text-xs lg:text-sm">
                                {
                                    teamView && (
                                        <Link href={`/${teamSlug}`}>
                                            <a className={router.pathname == `/[teamSlug]` ? "navigation-active" : "navigation"}>{team?.data?.name || team?.name}'s Activity</a>
                                        </Link>
                                    )
                                }
                            </div>
                            <div className="relative flex flex-wrap items-center min-w-fit  h-full py-2 -ml-2 text-xs lg:text-sm">
                                {
                                    teamView && (
                                        <Link href={`/${teamSlug}/add-members`}>
                                            <a className={router.pathname == `/[teamSlug]/add-members` ? "navigation-active" : "navigation"}>Add team member</a>
                                        </Link>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </header >
            <main className="bg-[#f5f5f5] grow">
                <div className=" max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div >
    )
}

export default DashboardLayout;