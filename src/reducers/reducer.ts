import {IStore} from '../interfaces/store';
import {ActionTypes} from '../actions/action_types';
import {AppAction} from '../enums/actions';
import {IPager} from '../interfaces/interfaces';
import {readObjectDataFromStorage, writeObjectDataToStorage} from '../utils/storage';

interface IStorageData {
    currentPage: number;
    pager: IPager;
}

const storageKey = 'app_pager';
const storageData = readObjectDataFromStorage<IStorageData>(storageKey);

const initialState: IStore = {
    currentPage: storageData?.currentPage ?? 0,
    pager: storageData?.pager ?? {
        0: 0,
    },
    isFetchingUsers: false,
    users: [],
    isFetchingUserDetails: false,
    userDetails: null,
};

export function reducer(state = initialState, action: ActionTypes): IStore {
    let nextPageSince: number | null;
    let currentPage: number;
    let pagerCopy: IPager;

    if (!action) {
        return state;
    }

    switch (action.type) {
        case AppAction.GetUserList:
            return {
                ...state,
                isFetchingUsers: true,
            };
        case AppAction.GetUserListSuccess:
            nextPageSince = action.nextPageParam;
            currentPage = state.currentPage;
            pagerCopy = {...state.pager};

            if (nextPageSince !== null) {
                pagerCopy[currentPage + 1] = nextPageSince;

                writeObjectDataToStorage(storageKey, {
                    pager: pagerCopy,
                    currentPage,
                });
            }

            return {
                ...state,
                isFetchingUsers: false,
                users: action.users,
                pager: pagerCopy,
            };
        case AppAction.GetUserListFailure:
            return {
                ...state,
                isFetchingUsers: false,
            };
        case AppAction.ChangePage:
            return {
                ...state,
                currentPage: action.nextPage,
            };
        case AppAction.GetUserDetails:
            return {
                ...state,
                isFetchingUserDetails: true,
            };
        case AppAction.GetUserDetailsSuccess:
            return {
                ...state,
                isFetchingUserDetails: false,
                userDetails: action.userDetails,
            };
        case AppAction.GetUserDetailsFailure:
            return {
                ...state,
                isFetchingUserDetails: false,
            };
        default:
            return state;
    }
}
