//Instalog NodeJS SDK
//Instalog is a cloud-based logging service that helps you to monitor your application logs in real-time.

import { env } from "../env/client.mjs";
import { InstalogEvent, ListEventsArgs, ListEventsResponse } from "./InstalogInterfaces.js";

class InstaLog {
    secretKey: string;
    baseUrl: string;
    constructor(secretKey: string) {
        this.secretKey = secretKey;
        this.baseUrl = (env.NEXT_PUBLIC_BASE_URL as string).trim();
        if (this.baseUrl.slice(-1) === '/') {
            // Check if baseUrl has a trailing slash
            this.baseUrl = this.baseUrl.slice(0, -1);
        }
    }

    logEvent = async (event: InstalogEvent): Promise<void> => {
        await fetch(`${this.baseUrl}/api/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'teamId': `${this.secretKey}`,
            },
            body: JSON.stringify(event as InstalogEvent),
        });
    }

    listEvents = async (args: ListEventsArgs) => {
        const apiEndPoint = new URL(`${this.baseUrl}/api/events`);
        apiEndPoint.searchParams.append('searchTerm', args.searchTerm || '');
        apiEndPoint.searchParams.append('cursor', args.cursor?.toString() || '0');
        apiEndPoint.searchParams.append('pageCount', args.pageCount?.toString() || '5');

        const response = await fetch(apiEndPoint.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'teamId': `${this.secretKey}`,
            },
        });
        return await response.json() as ListEventsResponse;
    }
}

export default InstaLog;