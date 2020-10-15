import {ThunkAction} from 'redux-thunk';
import {IStore} from '../interfaces/store';
import {ActionTypes} from './action_types';
import {AppAction} from '../enums/actions';
import {fetchUserList} from '../api/api';
import {IGitHubUser} from '../interfaces/interfaces';

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
        } catch (e) {
            dispatch(getUserListFailureAction(e));
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
function getUserListFailureAction(error: any): ActionTypes {
    console.error(error);
    // TODO handle error
    return {
        type: AppAction.GetUserListFailure,
    };
}
export function changePage(nextPage: number): ActionTypes {
    return {
        type: AppAction.ChangePage,
        nextPage,
    };
}
