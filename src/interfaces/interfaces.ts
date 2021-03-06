export interface IGitHubUser {
    id: number;
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    html_url: string;
    login: string;
    node_id: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
}
export interface IGitHubUserDetails {
    id: number;
    name: string;
    avatar_url: string;
    following: number;
    followers: number;
    html_url: string;
    public_repos: string;
    type: string;
}
export interface IPager {
    [key: number]: number;
}
export type TableData = Pick<IGitHubUser, 'id' | 'avatar_url' | 'login'>;
