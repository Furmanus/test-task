import {Action} from 'redux';
import {AppAction} from '../enums/actions';
import {IGitHubUser, IGitHubUserDetails} from '../interfaces/interfaces';

type FetchUsersList = Action<AppAction.GetUserList>;
interface FetchUsersListSuccess extends Action<AppAction.GetUserListSuccess> {
    users: IGitHubUser[];
    nextPageParam: number | null;
}
type FetchUsersListFailure = Action<AppAction.GetUserListFailure>;
interface IChangePage extends Action<AppAction.ChangePage> {
    nextPage: number;
}
type FetchUserDetails = Action<AppAction.GetUserDetails>;
interface IFetchUserDetailsSuccess extends Action<AppAction.GetUserDetailsSuccess> {
    userDetails: IGitHubUserDetails;
}
type FetchUserDetailsFailure = Action<AppAction.GetUserDetailsFailure>;
type CloseErrorDialog = Action<AppAction.CloseErrorDialog>;

export type ActionTypes =
    FetchUsersList |
    FetchUsersListSuccess |
    FetchUsersListFailure |
    IChangePage |
    FetchUserDetails |
    IFetchUserDetailsSuccess |
    FetchUserDetailsFailure |
    CloseErrorDialog;
