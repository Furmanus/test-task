import {initialState, reducer} from './reducer';
import {ActionTypes} from '../actions/action_types';
import {AppAction} from '../enums/actions';
import {IGitHubUser, IGitHubUserDetails} from '../interfaces/interfaces';
import {writeObjectDataToStorage} from '../utils/storage';

jest.mock('../utils/storage', () => ({
    readObjectDataFromStorage: jest.fn(),
    writeObjectDataToStorage: jest.fn(),
}));

const usersMock = [
    {id: 1, login: 'asdf'}
] as unknown as IGitHubUser[];
const userDetailsMock = {
    id: 1,
    login: 'test',
} as unknown as IGitHubUserDetails;
const NEXT_PAGE_SINCE = 46;

describe('App reducer', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return initial state', () => {
        expect(reducer()).toStrictEqual(initialState);
        expect(reducer(initialState)).toStrictEqual(initialState);
        expect(reducer(undefined, {} as ActionTypes)).toStrictEqual(initialState);
    });
    it('should handle get user list action', () => {
        expect(reducer(initialState, {type: AppAction.GetUserList})).toStrictEqual({
            ...initialState,
            isFetchingUsers: true,
        })
    });
    it('should handle get user list success action', () => {
        expect(reducer({
            ...initialState,
            isFetchingUsers: true,
        }, {
            type: AppAction.GetUserListSuccess,
            nextPageParam: NEXT_PAGE_SINCE,
            users: usersMock,
        })).toStrictEqual({
            ...initialState,
            isFetchingUsers: false,
            users: usersMock,
            pager: {
                0: 0,
                1: NEXT_PAGE_SINCE,
            }
        });
        expect(writeObjectDataToStorage).toHaveBeenCalled();
    });
    it('should handle get user list failure action', () => {
        expect(reducer({
            ...initialState,
            isFetchingUsers: true,
        }, {
            type: AppAction.GetUserListFailure,
        })).toStrictEqual({
            ...initialState,
            isFetchingUsers: false,
            showErrorDialog: true,
        });
    });
    it('should handle change page action', () => {
        expect(reducer(initialState, {
            type: AppAction.ChangePage,
            nextPage: 1,
        })).toStrictEqual({
            ...initialState,
            currentPage: 1,
        });
    });
    it('should handle get user details action', () => {
        expect(reducer(initialState, {
            type: AppAction.GetUserDetails,
        })).toStrictEqual({
            ...initialState,
            isFetchingUserDetails: true,
        });
    });
    it('should handle get user details success action', () => {
        expect(reducer({
            ...initialState,
            isFetchingUserDetails: true,
        }, {
            type: AppAction.GetUserDetailsSuccess,
            userDetails: userDetailsMock,
        })).toStrictEqual({
            ...initialState,
            userDetails: userDetailsMock,
            isFetchingUserDetails: false,
        });
    });
    it('should handle get user details failure action', () => {
        expect(reducer({
            ...initialState,
            isFetchingUserDetails: true,
        }, {
            type: AppAction.GetUserDetailsFailure,
        })).toStrictEqual({
            ...initialState,
            isFetchingUserDetails: false,
            showErrorDialog: true,
        });
    });
    it('should handle close error dialog action', () => {
        expect(reducer({
            ...initialState,
            showErrorDialog: true,
        }, {
            type: AppAction.CloseErrorDialog,
        })).toStrictEqual({
            ...initialState,
        });
    });
});
