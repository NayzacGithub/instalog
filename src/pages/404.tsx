import { NextPage } from "next";
import InstaLogLogo from "../components/InstalogLogo";

const Unautherized: NextPage = () => {
    return (
        <div className="grid gap-4 place-items-center place-content-center h-screen text-white">
            <InstaLogLogo className=" h-[150px]" />
            <h1 className="text-5xl font-mono">404</h1>
            <p className="text-3xl font-mono text-gray-400">Page not found</p>
        </div>
    );
}

export default Unautherized;