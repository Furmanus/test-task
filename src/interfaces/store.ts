import {IGitHubUser, IPager} from './interfaces';

export interface IStore {
    readonly currentPage: number;
    readonly pager: IPager;
    readonly isFetchingUsers: boolean;
    readonly users: IGitHubUser[];
}
