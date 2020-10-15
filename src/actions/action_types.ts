import {Action} from 'redux';
import {AppAction} from '../enums/actions';
import {IGitHubUser} from '../interfaces/interfaces';

type FetchUsersList = Action<AppAction.GetUserList>;
interface FetchUsersListSuccess extends Action<AppAction.GetUserListSuccess> {
    users: IGitHubUser[];
    nextPageParam: number | null;
}
type FetchUsersListFailure = Action<AppAction.GetUserListFailure>;
interface IChangePage extends Action<AppAction.ChangePage> {
    nextPage: number;
}

export type ActionTypes =
    FetchUsersList |
    FetchUsersListSuccess |
    FetchUsersListFailure |
    IChangePage;
