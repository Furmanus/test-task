import configureMockStore, {MockStore} from 'redux-mock-store';
import thunk from 'redux-thunk';
import {AnyAction} from 'redux';
import {AppAction} from '../enums/actions';
import {fetchUserDetails, fetchUserList} from '../api/api';
import {changePage, getUserDetailsAction, getUserListAction} from './actions';

jest.mock('../api/api', () => ({
    fetchUserList: jest.fn(),
    fetchUserDetails: jest.fn(),
}));

const NEXT_PAGE_PARAM = 46;
const userListDataMock = [{login: 'a', id: 1}];
const fetchListSuccessMockResponse = {
    headers: {
        link: `<https://api.github.com/users?since=${NEXT_PAGE_PARAM}>; rel="next", <https://api.github.com/users{?since}>; rel="first"`,
    },
    data: userListDataMock,
};
const userDetailsMock = {
    public_repos: 2,
    html_url: 'asdf',
};
const fetchUserDetailsMockResponse = {
    data: userDetailsMock,
};

const mockStore = configureMockStore([thunk]);

describe('Actions unit tests', () => {
    let store: MockStore;

    beforeEach(() => {
        store = mockStore();
        jest.resetAllMocks();
    });

    describe('Get user list action', () => {
        it('should fetch user list and handle success', async () => {
            const expectedActions = [
                {type: AppAction.GetUserList},
                {type: AppAction.GetUserListSuccess, users: fetchListSuccessMockResponse.data, nextPageParam: NEXT_PAGE_PARAM},
            ];

            (fetchUserList as jest.Mock).mockResolvedValue(fetchListSuccessMockResponse);

            await store.dispatch(getUserListAction(1, 0) as unknown as AnyAction);

            expect(store.getActions()).toStrictEqual(expectedActions);
        });
        it('should fetch user list and handle failure', async () => {
            const expectedActions = [
                {type: AppAction.GetUserList},
                {type: AppAction.GetUserListFailure},
            ];

            (fetchUserList as jest.Mock).mockRejectedValue({});

            await store.dispatch(getUserListAction(1, 0) as unknown as AnyAction);

            expect(store.getActions()).toStrictEqual(expectedActions);
        });
    });
    describe('Change page', () => {
        it('should return correct action from action creator', () => {
            expect(changePage(2)).toStrictEqual({type: AppAction.ChangePage, nextPage: 2});
        });
    });
    describe('Fetch user details', () => {
        it('should fetch user details and handle success', async () => {
            const expectedActions = [
                {type: AppAction.GetUserDetails},
                {type: AppAction.GetUserDetailsSuccess, userDetails: userDetailsMock},
            ];

            (fetchUserDetails as jest.Mock).mockResolvedValue(fetchUserDetailsMockResponse);

            await store.dispatch(getUserDetailsAction('12') as unknown as AnyAction);

            expect(store.getActions()).toStrictEqual(expectedActions);
        });
        it('should fetch user details and handle failure', async () => {
            const expectedActions = [
                {type: AppAction.GetUserDetails},
                {type: AppAction.GetUserDetailsFailure},
            ];

            (fetchUserDetails as jest.Mock).mockRejectedValue({});

            await store.dispatch(getUserDetailsAction('12') as unknown as AnyAction);

            expect(store.getActions()).toStrictEqual(expectedActions);
        });
    });
});

