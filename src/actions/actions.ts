import {ThunkAction} from 'redux-thunk';
import {IStore} from '../interfaces/store';
import {ActionTypes} from './action_types';
import {AppAction} from '../enums/actions';
import {fetchUserDetails, fetchUserList} from '../api/api';
import {IGitHubUser, IGitHubUserDetails} from '../interfaces/interfaces';
import {isGitHubUserDetails} from '../interfaces/type_guards';
import {writeObjectDataToStorage} from '../utils/storage';
import {STORAGE_KEY_SCROLL} from '../enums/constants';

type AppThunkAction<R = void> = ThunkAction<R, IStore, void, ActionTypes>;

export function getUserListAction(page: number, since: number): AppThunkAction {
    return async dispatch => {
        dispatch({
            type: AppAction.GetUserList,
        });

        try {
            const response = await fetchUserList(since);
            const {
                data,
                headers,
            } = response;
            /**
             * Retrieve information from response "link" header about next page "since" parameter. Header can contain
             * multiple information with different relationships (next page, first page), we are only looking for "next"
             * rel, so headers have to be split and then we search if rel of certain part is "next". If yes, we retrieve
             * number from "since=" part of next page url.
             */
            const pagination = headers.link?.split(',').reduce((result: {nextPageParameter: string | undefined}, data: string) => {
                const splitData = data.split(';').map(part => part.trim());
                const parameterRegexp = /since=([0-9]+)/;

                if (splitData[1].trim() === 'rel="next"') {
                    result.nextPageParameter = (splitData[0].match(parameterRegexp))?.[1];
                }

                return result;
            }, {});
            dispatch(getUserListSuccessAction(
                data,
                typeof pagination.nextPageParameter === 'string' ? parseInt(pagination.nextPageParameter, 10) : null,
            ));
        } catch {
            dispatch(getUserListFailureAction());
        }
    };
}
function getUserListSuccessAction(users: IGitHubUser[], nextPageParam: number | null): ActionTypes {
    return {
        type: AppAction.GetUserListSuccess,
        nextPageParam,
        users,
    };
}
function getUserListFailureAction(): ActionTypes {
    return {
        type: AppAction.GetUserListFailure,
    };
}
export function changePage(nextPage: number): ActionTypes {
    writeObjectDataToStorage(STORAGE_KEY_SCROLL, {
        top: 0,
    });

    return {
        type: AppAction.ChangePage,
        nextPage,
    };
}
export function getUserDetailsAction(userId: string): AppThunkAction {
    return async (dispatch)  => {
        dispatch({
            type: AppAction.GetUserDetails,
        });

        try {
            const response = await fetchUserDetails(userId);

            if (isGitHubUserDetails(response.data)) {
                dispatch(getUserDetailsActionSuccess(response.data));
            } else {
                throw new Error('Invalid response data');
            }
        } catch {
            dispatch(getUserDetailsActionFailure());
        }
    };
}
function getUserDetailsActionSuccess(userDetails: IGitHubUserDetails): ActionTypes {
    return {
        type: AppAction.GetUserDetailsSuccess,
        userDetails,
    };
}
function getUserDetailsActionFailure(): ActionTypes {
    return {
        type: AppAction.GetUserDetailsFailure,
    };
}
export function closeErrorDialogAction(): ActionTypes {
    return {
        type: AppAction.CloseErrorDialog,
    };
}
