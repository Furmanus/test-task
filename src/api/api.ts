import axios, {AxiosResponse} from 'axios';
import {IGitHubUser, IGitHubUserDetails} from '../interfaces/interfaces';

enum GitHubEndpoints {
    UserList = 'https://api.github.com/users',
    UserDetails = 'https://api.github.com/users/:user',
}

export function fetchUserList(since: number): Promise<AxiosResponse<IGitHubUser[]>> {
    return axios.get(GitHubEndpoints.UserList, {params: {since}});
}
export function fetchUserDetails(user: string): Promise<AxiosResponse<IGitHubUserDetails>> {
    return axios.get(GitHubEndpoints.UserDetails.replace(':user', user));
}
