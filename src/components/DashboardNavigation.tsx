import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import InstaLogLogo from "./InstalogLogo"

interface ProfileDropdownProps {
    session: Session | null;
}

const ProfileDropdown: React.FunctionComponent<ProfileDropdownProps> = ({ session }: ProfileDropdownProps) => {
    const handleSignout = async () => {
        await signOut();
    }
    const [dropdownToggled, setDropdownToggled] = useState<boolean>(false);
    const handleToggleDropdown = () => {
        setDropdownToggled(!dropdownToggled);
    }
    return (
        <div className="relative cursor-pointer">
            <div className="bg-white rounded px-3 py-2 text-black font-bold flex gap-2 " onClick={handleToggleDropdown}>
                <span>{session?.user?.name}</span>
                <span className="my-auto">
                    <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.8466 0.781041C14.2258 1.20414 14.2258 1.89012 13.8466 2.31321L8.02027 8.81366C7.64105 9.23676 7.02621 9.23676 6.64699 8.81366L0.820691 2.31321C0.441472 1.89011 0.441472 1.20414 0.820691 0.781041C1.19991 0.357944 1.81475 0.357944 2.19396 0.781041L7.33363 6.51541L12.4733 0.781041C12.8525 0.357944 13.4673 0.357944 13.8466 0.781041Z" fill="#999" />
                    </svg>
                </span>
            </div>
            <div className={"bg-gray-100 p-1 rounded shadow-xl border border-gray-300 absolute top-[110%] transition-all right-0 min-w-full " + (dropdownToggled ? " opacity-100 translate-y-2 " : "translate-y-0 opacity-0 pointer-events-none")}>
                <div className="grid gap-3 font-normal">
                    <a className="hover:bg-gray-200 cursor-pointer py-2 px-4 rounded transition-color " onClick={handleSignout}>
                        <span>
                            Sign out
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}

const DashboardNavigation: React.FunctionComponent = () => {
    const router = useRouter();
    const { data: session } = useSession();
    return (
        <nav className="flex py-12">
            {router.pathname.includes('[teamSlug]') &&
                <Link href={'/dashboard'}>
                    <a className="flex gap-2 items-center text-white underline font-semibold mr-5">
                        &lt; back
                    </a>
                </Link>
            }
            <InstaLogLogo />
            <div className="flex flex-grow justify-end">
                <div className="flex items-center">
                    <ProfileDropdown session={session} />

                </div>
            </div>

        </nav >
    )
}

export default DashboardNavigation;