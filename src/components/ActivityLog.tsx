import { useState, useMemo, useEffect } from "react";
import useSWR from "swr";
import { InstalogEventWithId } from "../utils/InstalogInterfaces";
import debounce from "lodash.debounce";
import { ExportIcon, FilterIcon, LiveIcon } from "./SVGIcons";
import { useAutoAnimate } from '@formkit/auto-animate/react';

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

interface ActionLoggedProps {
    instalogEvent: InstalogEventWithId;
    key: string;
}

const ActionLogged: React.FunctionComponent<ActionLoggedProps> = ({ instalogEvent }) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const toggle = (): void => {
        setExpanded(!expanded);
    }
    const readableDate = (): string => {
        return new Intl.DateTimeFormat('en-US', {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        }).format(new Date(instalogEvent.occuredAt!))
    }

    return (
        <div >
            {!expanded && <div className="grid grid-cols-3 py-4 hover:bg-[#fbfbfb] transition-colors duration-75 px-5  cursor-pointer" onClick={toggle}>
                <div className="flex gap-2">
                    <img src={instalogEvent.actor?.image} alt="Avatar" className="my-auto h-6 w-6 rounded-full" />
                    <span className="my-auto">{`${instalogEvent.actor?.email}`}</span>
                </div>
                <div className="flex">
                    <span className="my-auto">{`${instalogEvent.object}.${instalogEvent.action?.name}`}</span>
                </div>
                <div className="flex relative">
                    <span className="my-auto">
                        {readableDate()}
                    </span>
                    <span className="my-auto absolute right-0"> <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.317323 0.284414C0.74042 -0.0948047 1.4264 -0.0948047 1.84949 0.284414L8.34995 6.11072C8.77304 6.48993 8.77304 7.10477 8.34995 7.48399L1.84949 13.3103C1.4264 13.6895 0.74042 13.6895 0.317323 13.3103C-0.105774 12.9311 -0.105774 12.3162 0.317323 11.937L6.05169 6.79735L0.317323 1.65769C-0.105774 1.27847 -0.105774 0.663633 0.317323 0.284414Z" fill="#EEEEEE" />
                    </svg>
                    </span>
                </div>
            </div>}
            <div className={`cursor-pointer w-[104%] -ml-[2%] rounded-xl border shadow bg-white origin-top ${expanded ? 'py-5 opacity-100 scale-100' : 'py-0 opacity-0 h-0 scale-0'} transition-all duration-300 ease-in-out`} onClick={toggle}>
                <div className={`max-w-[933px] min-w-[933px] mx-auto `}>
                    <div className="grid grid-cols-3 mt-2 text-[#575757] text-sm ">
                        <div><span>ACTOR</span></div>
                        <div><span>ACTION</span></div>
                        <div><span>DATE</span></div>
                    </div>
                    <div className="grid grid-cols-3 mt-2 text-sm">
                        <section className="grid gap-2">
                            <div className="grid grid-cols-3">
                                <span className="text-[#929292] text-sm">Name</span>
                                <span className="col-span-2">{instalogEvent.actor?.name}</span>
                            </div>
                            <div className="grid grid-cols-3">
                                <span className="text-[#929292] text-sm">Email</span>
                                <span className="col-span-2">{instalogEvent.actor?.email}</span>
                            </div>
                            <div className="grid grid-cols-3">
                                <span className="text-[#929292] text-sm">ID</span>
                                <span className="col-span-2 font-mono">{instalogEvent.actor?.id}</span>
                            </div>
                        </section>
                        <section className="grid gap-2">
                            <div className="grid grid-cols-3">
                                <span className="text-[#929292] text-sm">Name</span>
                                <span className="col-span-2">{`${instalogEvent.object}.${instalogEvent.action?.name}`}</span>
                            </div>
                            <div className="grid grid-cols-3">
                                <span className="text-[#929292] text-sm">Object</span>
                                <span className="col-span-2">{instalogEvent.object}</span>
                            </div>
                            <div className="grid grid-cols-3">
                                <span className="text-[#929292] text-sm">ID</span>
                                <span className="col-span-2 font-mono"></span>
                            </div>
                        </section>
                        <section className="grid gap-2">
                            <div className="grid grid-cols-3">
                                <span className="text-[#929292] text-sm">Occured at</span>
                                <span className="col-span-2">{readableDate()}</span>
                            </div>
                        </section>

                    </div>
                    <div className="grid grid-cols-3  text-[#575757] text-sm mt-8">
                        <div><span>TARGET</span></div>
                        <div><span>METADATA</span></div>

                    </div>
                    <div className="grid grid-cols-3 mt-2 text-sm">
                        <section className="grid gap-2">
                            {instalogEvent.target?.name && <div className="grid grid-cols-3">
                                <span className="text-[#929292] text-sm">Name</span>
                                <span className="col-span-2">{instalogEvent.target?.name}</span>
                            </div>}
                            {instalogEvent.target?.email && <div className="grid grid-cols-3">
                                <span className="text-[#929292] text-sm">Email</span>
                                <span className="col-span-2">{instalogEvent.target?.email}</span>
                            </div>}
                            <div className="grid grid-cols-3">
                                <span className="text-[#929292] text-sm">ID</span>
                                <span className="col-span-2 font-mono">{instalogEvent.target?.id}</span>
                            </div>
                        </section>
                        <section className="grid gap-2 ">
                            {instalogEvent.metadata && (Object.keys(instalogEvent.metadata)).map((k) =>
                                instalogEvent.target && <div className="grid grid-cols-3" key={'target_' + k + '_' + instalogEvent.id}>
                                    <span className="text-[#929292] text-sm">{k}</span>
                                    <span className="col-span-2">{instalogEvent.target[k]}</span>
                                </div>
                            )}
                        </section>

                    </div>

                </div>
            </div>
        </div>
    )
}

interface EventRequestQuery {
    pageCount: number;
    cursor: number;
    searchTerm?: string;
    teamSlug: string;
}

interface ActivityLogProps {
    team: any;
}

const ActivityLog: React.FunctionComponent<ActivityLogProps> = ({ team }) => {
    const teamSlug = team.data.slug;
    const [requestQuery, setRequestQuery] = useState<EventRequestQuery>({ teamSlug: teamSlug as string, pageCount: 5, cursor: 0, searchTerm: undefined });
    const [eventsUrl, setEventsUrl] = useState<string>('/api/events');
    const [events, setEvents] = useState<Set<InstalogEventWithId>>(new Set());
    const [swrRefreshInterval, setSwrRefreshInterval] = useState<1000 | 0>(1000);
    const { data: eventResponse, mutate, isValidating } = useSWR([eventsUrl, { method: "GET" }], fetcher, { refreshInterval: swrRefreshInterval, refreshWhenHidden: true });

    const handleLoadMore = (): void => {
        const newUrl = new URL("http://localhost:3000/api/events");
        setRequestQuery({ ...requestQuery, pageCount: requestQuery.pageCount += 5 });
        newUrl.searchParams.append("pageCount", (requestQuery.pageCount).toString());
        newUrl.searchParams.append("cursor", (requestQuery.cursor).toString());
        newUrl.searchParams.append("teamSlug", requestQuery.teamSlug);
        setEventsUrl(newUrl.toString());
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newUrl = new URL("http://localhost:3000/api/events");
        newUrl.searchParams.append("pageCount", requestQuery.pageCount.toString());
        newUrl.searchParams.append("cursor", requestQuery.cursor.toString());
        newUrl.searchParams.append("teamSlug", requestQuery.teamSlug);
        newUrl.searchParams.append("searchTerm", e.target.value);
        setEventsUrl(newUrl.toString());
    }


    // Debounce to prevent too many requests
    const debounceHandleSearch = useMemo(() => debounce(handleSearch, 300), [eventsUrl, requestQuery]);
    useEffect(() => {
        mutate();
    }, [requestQuery]);
    useMemo(() => {
        if (eventResponse?.data) {
            setEvents(previousEvents => new Set([...(eventResponse.data as InstalogEventWithId[])]));
        }
    }, [eventResponse?.data, requestQuery.searchTerm])

    const handleExportToCSV = (): void => {
        let csvHeader = "id,actor_id,actor_name,actor_email,object,action_name,target_id,target_name,occured_at,time\n";
        events.forEach((field: InstalogEventWithId) => {
            csvHeader += `${field.id},${field.actor?.id},${field.actor?.name},${field.actor?.email},${field.object},${field.action?.name},${field.target.id},${field.target.name},${new Intl.DateTimeFormat('en-US', {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            }).format(new Date(field.occuredAt!))}\n`;
        });
        const blob = new Blob([csvHeader], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "my_data.csv");
        document.body.appendChild(link); // Required for FF
        link.click();
        link.remove();
    };

    const handleToggleLiveFeed = (): void => {
        if (swrRefreshInterval === 0) {
            setSwrRefreshInterval(1000);
        } else {
            setSwrRefreshInterval(0);
        }
    };

    const [animationParent] = useAutoAnimate({
        easing: "ease-in",

    });

    return (
        <div className="bg-white border-x border-b rounded-b-2xl shadow lg:pb-10  min-h-[457px] relative">
            <section className="bg-[#f5f5f5] border rounded-lg max-w-fit mx-auto ">
                <header className="px-5 py-3">
                    <div className="flex border-collapse border rounded-lg border-[#E0E0DF] text-[#575757]">
                        <input type="text" placeholder="Search name, email or action..." className="bg-transparent p-3 grow text-[575757] min-w-[250px] border-none " onChange={debounceHandleSearch} />
                        <button className="toolbarActionButton">
                            <FilterIcon />
                            <span className="my-auto">
                                FILTER
                            </span>
                        </button>

                        <button className="toolbarActionButton" onClick={handleExportToCSV}>
                            <ExportIcon />
                            <span className="my-auto">
                                EXPORT
                            </span>
                        </button>

                        <button className="toolbarActionButton" onClick={handleToggleLiveFeed}>
                            <LiveIcon isLive={swrRefreshInterval === 1000} />
                            <span className="my-auto">
                                LIVE
                            </span>
                        </button>

                    </div>
                    <div className="grid grid-cols-3 mt-2 text-[#575757] text-sm font-semibold min-w-[933px]">
                        <div><span>ACTOR</span></div>
                        <div><span>ACTION</span></div>
                        <div><span>DATE</span></div>
                    </div>
                </header>
                {/* @ts-ignore */}
                <main className="bg-white grid" ref={animationParent}>
                    {events && Array.from(events).map((evt: InstalogEventWithId, n) => <ActionLogged key={evt.id} instalogEvent={evt} />)}
                </main>
                <footer className="bg-[#f5f5f5] text-center text-[#575757] font-semibold py-3 cursor-pointer" onClick={handleLoadMore}>
                    LOAD MORE
                </footer>
            </section>
        </div>
    )
}


export default ActivityLog;