import { useState, useMemo, useEffect } from "react";
import useSWR from "swr";
import { InstalogEventWithId } from "../utils/InstalogInterfaces";
import debounce from "lodash.debounce";
import { ExportIcon, FilterIcon, LiveIcon } from "./SVGIcons";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Image from "next/image";
import { env } from "../env/client.mjs";

interface FetcherArgs {
    url: string
    options?: RequestInit
};
const fetcher = ({ url, options }: FetcherArgs) => fetch(url, options).then((res) => res.json());

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
                    {instalogEvent.actor?.image && <Image src={instalogEvent.actor?.image} alt="Avatar" className="my-auto rounded-full" width={24} height={24} />}
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

interface ActivityLogProps {
    team: any;
}

interface InstalogAction {
    object: string;
    action: {
        name: string;
    }
}

const ActivityLog: React.FunctionComponent<ActivityLogProps> = ({ team }) => {
    const teamSlug = team.data.slug;
    const [requestQuery, setRequestQuery] = useState<URLSearchParams>(new URLSearchParams({ 'searchTerm': '', 'pageCount': '5', 'cursor': '0', 'teamSlug': teamSlug, 'sortDate': 'desc', 'filterAction': '' }));
    const [eventsUrl, setEventsUrl] = useState<URL>(new URL(`${env.NEXT_PUBLIC_BASE_URL}/api/events?${requestQuery.toString()}`));
    const [events, setEvents] = useState<Set<InstalogEventWithId>>(new Set());
    const [actions, setActions] = useState<InstalogAction[]>([]);
    const [swrRefreshInterval, setSwrRefreshInterval] = useState<1000 | 0>(1000);
    const [showingFilters, setShowingFilters] = useState<boolean>(false);
    const { data: eventResponse, mutate } = useSWR({ url: eventsUrl, options: { method: "GET" } }, fetcher, { refreshInterval: swrRefreshInterval, refreshWhenHidden: true });

    const handleLoadMore = (): void => {
        setRequestQuery((searchParams: URLSearchParams) => { searchParams.set('pageCount', (parseInt(searchParams.get('pageCount') || '0') + 5).toString()); return searchParams; });
        setEventsUrl(new URL(`${env.NEXT_PUBLIC_BASE_URL}/api/events?${requestQuery.toString()}`));
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setRequestQuery((searchParams: URLSearchParams) => { searchParams.set('searchTerm', e.target.value || ""); return searchParams; });
        setEventsUrl(new URL(`${env.NEXT_PUBLIC_BASE_URL}/api/events?${requestQuery.toString()}`));
    }
    // Debounce to prevent too many requests
    const debounceHandleSearch = useMemo(() => debounce(handleSearch, 300), [eventsUrl, requestQuery]);
    useEffect(() => {
        mutate();
    }, [eventsUrl, requestQuery]);
    useMemo(() => {
        if (eventResponse?.data) {
            setEvents(new Set([...(eventResponse.data as InstalogEventWithId[])]));
            setActions(eventResponse?.actions);
        }
    }, [eventResponse?.data, requestQuery.get('searchTerm')])


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

    const handleToggleSortDateDirection = (): void => {
        if (requestQuery.get('sortDate') === 'desc') {
            setRequestQuery((searchParams: URLSearchParams) => { searchParams.set('sortDate', 'asc'); return searchParams; });
        } else {
            setRequestQuery((searchParams: URLSearchParams) => { searchParams.set('sortDate', 'desc'); return searchParams; });
        }
        setEventsUrl(new URL(`${env.NEXT_PUBLIC_BASE_URL}/api/events?${requestQuery.toString()}`));
    };

    const [animationParent] = useAutoAnimate({
        easing: "ease-in",
    });

    const handleEventTypeFilter = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const value = e.target.value as string;
        console.log(value);
        setRequestQuery((searchParams: URLSearchParams) => { searchParams.set('filterAction', value); return searchParams; });
        setEventsUrl(new URL(`${env.NEXT_PUBLIC_BASE_URL}/api/events?${requestQuery.toString()}`));
        mutate();
    }

    const handleToggleShowingFilters = (): void => {
        setShowingFilters(!showingFilters);
    }

    return (
        <div className="bg-white border-x border-b rounded-b-2xl shadow lg:pb-10  min-h-[457px] relative">
            <section className="bg-[#f5f5f5] border rounded-lg max-w-fit mx-auto ">
                <header className="px-5 py-3">
                    <div className="flex border-collapse border rounded-lg border-[#E0E0DF] text-[#575757]">
                        <input type="text" placeholder="Search name, email or action..." className="bg-transparent p-3 grow text-[575757] min-w-[250px] border-none" onChange={debounceHandleSearch} />
                        <button className="toolbarActionButton" onClick={handleToggleShowingFilters}>
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
                    {showingFilters && <div className="grid py-2 px-4 bg-gray-200 my-2 border rounded">
                        <h1 className="font-semibold text-xl text-gray-800">Filters:</h1>
                        <div className="grid gap-1 max-w-md py-1  ">
                            <span className="my-auto">
                                Event Type:
                            </span>
                            <div className="flex gap-1">
                                <select className=" rounded bg-white/50 border-gray-300 flex-1" onChange={handleEventTypeFilter} defaultValue="">
                                    <option value="" >any</option>
                                    {actions.map((action: InstalogAction) => {
                                        return <option key={action.object + '.' + action.action.name} value={action.object + '.' + action.action.name}>{action.object}.{action.action.name}
                                        </option>
                                    })}
                                </select>

                            </div>
                        </div>
                    </div>}
                    <div className="grid grid-cols-3 mt-2 text-[#575757] text-sm font-semibold min-w-[933px]">
                        <div className={'flex gap-2'}><span className={'my-auto'}>ACTOR</span></div>
                        <div className={'flex gap-2'}><span className={'my-auto'}>ACTION</span></div>
                        <div className={'flex gap-2'}><span className={'my-auto'}>DATE</span>
                            <span className="my-auto cursor-pointer" onClick={handleToggleSortDateDirection}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </header>

                <main className="bg-white grid" ref={animationParent as React.RefObject<HTMLElement>}>
                    {events && Array.from(events).map((evt: InstalogEventWithId) => <ActionLogged key={evt.id} instalogEvent={evt} />)}
                </main>
                <footer className="bg-[#f5f5f5] text-center text-[#575757] font-semibold py-3 cursor-pointer" onClick={handleLoadMore}>
                    LOAD MORE
                </footer>
            </section>
        </div>
    )
}


export default ActivityLog;