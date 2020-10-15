import axios, {AxiosResponse} from 'axios';
import {IGitHubUser, IGitHubUserDetails} from '../interfaces/interfaces';

enum GitHubEndpoints {
    UserList = 'https://api.github.com/users',
    UserDetails = 'https://api.github.com/users/:userId',
}

export function fetchUserList(since: number): Promise<AxiosResponse<IGitHubUser[]>> {
    return axios.get(GitHubEndpoints.UserList, {params: {since}});
}
export function fetchUserDetails(userId: string): Promise<AxiosResponse<IGitHubUserDetails>> {
    return axios.get(GitHubEndpoints.UserDetails.replace(':userId', userId));
}
