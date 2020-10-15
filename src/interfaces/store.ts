import {IGitHubUser, IGitHubUserDetails, IPager} from './interfaces';

export interface IStore {
    readonly currentPage: number;
    readonly pager: IPager;
    readonly isFetchingUsers: boolean;
    readonly users: IGitHubUser[];
    readonly isFetchingUserDetails: boolean;
    readonly userDetails: IGitHubUserDetails | null;
}
