import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {AppRoutes} from '../enums/routes';
import {IGitHubUser, IPager} from '../interfaces/interfaces';
import {IStore} from '../interfaces/store';
import {changePage, getUserListAction} from '../actions/actions';
import {AppThunkDispatch} from '../interfaces/thunk';
import {connect, ConnectedProps} from 'react-redux';
import {UserListTable} from '../components/UserListTable';
import {CircularProgress} from '@material-ui/core';

interface IComponentStoreProps {
    isFetchingUsers: boolean;
    users: IGitHubUser[];
    currentPage: number;
    pager: IPager;
}
interface IComponentDispatchProps {
    getUsersList: (page: number, since: number) => void;
    changePage: (nextPage: number) => void;
}

function mapStateToProps(state: IStore): IComponentStoreProps {
    return {
        isFetchingUsers: state.isFetchingUsers,
        users: state.users,
        currentPage: state.currentPage,
        pager: state.pager,
    };
}
function mapDispatchToProps(dispatch: AppThunkDispatch): IComponentDispatchProps {
    return {
        getUsersList: (page: number, since: number) => dispatch(getUserListAction(page, since)),
        changePage: (nextPage: number) => dispatch(changePage(nextPage)),
    }
}

const connector = connect<IComponentStoreProps, IComponentDispatchProps, void, IStore>(mapStateToProps, mapDispatchToProps);

type ComponentProps = ConnectedProps<typeof connector>;

class UserListClass extends React.PureComponent<ComponentProps> {
    private get doesNextPageExists(): boolean {
        const {
            pager,
            currentPage,
        } = this.props;

        return !!pager[currentPage + 1];
    }

    private get doesPreviousPageExists(): boolean {
        const {
            pager,
            currentPage,
        } = this.props;

        return !!pager[currentPage - 1];
    }

    public componentDidUpdate(prevProps: Readonly<ComponentProps>, prevState: Readonly<{}>): void {
        const {
            currentPage,
            pager,
            getUsersList,
        } = this.props;

        if (prevProps.currentPage !== currentPage) {
            getUsersList(currentPage, pager[currentPage]);
        }
    }

    public componentDidMount(): void {
        const {
            users,
            getUsersList,
            isFetchingUsers,
            currentPage,
            pager
        } = this.props;

        if (users?.length === 0 && !isFetchingUsers) {
            getUsersList(currentPage, pager[currentPage]);
        }
    }

    private onNextClick = () => {
        const {
            changePage,
            currentPage,
        } = this.props;

        if (this.doesNextPageExists) {
            changePage(currentPage + 1)
        }
    };

    private onPreviousClick = () => {
        const {
            changePage,
            currentPage,
        } = this.props;

        if (this.doesPreviousPageExists) {
            changePage(currentPage - 1);
        }
    }

    public render(): React.ReactNode {
        const {
            users,
            isFetchingUsers,
        } = this.props;

        return (
            <Fragment>
                <p>LISTA USERA</p>
                {
                    isFetchingUsers ?
                        <CircularProgress/> :
                        <UserListTable data={users}/>
                }
            </Fragment>
        );
    }
}

export const UserList = connector(UserListClass);
