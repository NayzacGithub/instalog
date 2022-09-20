export interface FetcherArgs {
    url: string;
    options: RequestInit;
};

export const fetcher = ({ url, options }: FetcherArgs) => fetch(url, options).then((res) => res.json());
