import axios, {AxiosResponse} from 'axios';
import {IGitHubUser} from '../interfaces/interfaces';

enum GitHubEndpoints {
    UserList = 'https://api.github.com/users',
}

export function fetchUserList(since: number): Promise<AxiosResponse<IGitHubUser[]>> {
    return axios.get(GitHubEndpoints.UserList, {params: {since}});
}
