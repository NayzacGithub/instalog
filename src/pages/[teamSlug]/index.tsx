import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { ActivitySummaryIcon } from "../../components/SVGIcons";
import { env } from "../../env/client.mjs";
import { fetcher } from "../../utils/fetcherUtils";
import { InstalogEventWithId } from "../../utils/InstalogInterfaces";


interface ActivityProps {
    event: InstalogEventWithId
}

const ActivityRow: React.FunctionComponent<ActivityProps> = ({ event }) => {

    const [relativeTime] = useState<string>(() => {
        const eventDate = new Date(event.occuredAt as string);
        const now = new Date();
        let timeAgo = Math.floor(((now.getTime() - eventDate.getTime()) / 1000) * -1);
        let unit: "minutes" | "seconds" | "hours" | "days" = "seconds";
        if (Math.abs(timeAgo) > 60 && Math.abs(timeAgo) <= 3600) { unit = "minutes"; timeAgo /= 60 }
        if (Math.abs(timeAgo) > 3600 && Math.abs(timeAgo) <= 86_400) { unit = "hours"; timeAgo /= 3600 }
        if (Math.abs(timeAgo) > 86_400) { unit = "days"; timeAgo /= 86_400 }
        const timeFormater = new Intl.RelativeTimeFormat("en-US");
        return (timeFormater.format(Math.floor(timeAgo), unit as Intl.RelativeTimeFormatUnit));
    });
    const [activitySummary] = useState<React.ReactElement>(() => {
        switch (`${event.object}.${event.action?.name}`) {
            case "team.add_member":
                return (<span className="my-auto"><b>{event.actor?.name}</b> has added <b>{event.target?.name}.</b> <span className="text-[12px]">{relativeTime}</span></span>)
                break;
            case "team.viewed_activity_log":
                return (<span className="my-auto"><b>{event.actor?.name}</b> has viewed the <b>teams activity log</b>. <span className="text-[12px]">{relativeTime}</span></span>)
                break;
            case "post.edited":
                return (<span className="my-auto"><b>{event.actor?.name}</b> has edited the post. <span className="text-[12px]">{relativeTime}</span></span>)
                break;
            case "issue.assigned":
                return (<span className="my-auto"><b>{event.actor?.name}</b> has assigned the issue to <b>{event.target.name}</b>.  <span className="text-[12px]">{relativeTime}</span></span>)
                break;
            case "issue.priority_changed":
                return (<span className="my-auto"><b>{event.actor?.name}</b> has changed the priority to <b>{event.metadata?.newValue}</b>.  <span className="text-[12px]">{relativeTime}</span></span>)
                break;
            case "issue.updated_status":
                return (<span className="my-auto"><b>{event.actor?.name}</b> has changed the status from <b>{event.metadata?.oldValue}</b> to <b>{event.metadata.newValue}</b>.  <span className="text-[12px]">{relativeTime}</span></span>)
                break;
            case "issue.updated_description":
                return (<span className="my-auto"><b>{event.actor?.name}</b> has updated the issue's description. <span className="text-[12px]">{relativeTime}</span></span>)
                break;
        }
        return <></>
    });


    return (
        <div className="flex gap-2">
            {event.action?.icon ? <ActivitySummaryIcon className="my-auto w-[20px] " icon={event.action.icon as "edit" | "priority"} /> : <div className="w-[22px] h-[22px] rounded-full bg-gray-400 border border-gray-300 " style={{ backgroundImage: `url(${event?.actor?.image})`, backgroundSize: `cover` }}></div>}
            {activitySummary}
        </div >
    )
}

const ActivityPage = () => {
    const router = useRouter();
    const { teamSlug } = router.query;
    const [eventsUrl] = useState<URL>(new URL(`${env.NEXT_PUBLIC_BASE_URL}/api/events?teamSlug=${teamSlug}&pageCount=20`));
    const { data: team } = useSWR({ url: `/api/teams?teamSlug=${teamSlug}` }, fetcher);
    const { data: events, mutate } = useSWR({ url: eventsUrl, options: { method: "GET" } }, fetcher, {});
    const createEvents = async () => {
        await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/create-events`, { method: 'POST' })
        mutate()
    }
    const handleCreateEventClick = () => {
        createEvents();
    }
    return (
        <DashboardLayout teamView={true} team={team}>
            <section className="py-4 px-8">
                <div className="grid gap-[26px]">
                    <button className="bg-gray-900 text-white px-4 py-2 rounded-xl" onClick={handleCreateEventClick}>Create events</button>
                    <div className="font-bold">Activity</div>
                    <div className="grid gap-[19px]">
                        {events && events.data && events.data.map((event: InstalogEventWithId) => {
                            return <ActivityRow event={event} key={event.id} />
                        })}
                    </div>
                </div>
            </section>
        </DashboardLayout>
    );
}

export default ActivityPage;