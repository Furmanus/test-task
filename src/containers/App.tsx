import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {AppRoutes} from '../enums/routes';
import {UserList} from './UserList';
import {UserDetails} from './UserDetails';
import {AppStyledMainWrapper} from '../styled/AppStyledMainWrapper';
import {IStore} from '../interfaces/store';
import {connect, ConnectedProps} from 'react-redux';
import {FetchErrorDialog} from '../components/FetchErrorDialog';
import {AppThunkDispatch} from '../interfaces/thunk';
import {closeErrorDialogAction} from '../actions/actions';

interface IComponentStateProps {
    shouldShowErrorDialog: boolean;
}
interface IComponentDispatchProps {
    closeErrorDialog: () => void;
}

function mapStateToProps(state: IStore): IComponentStateProps {
    return {
        shouldShowErrorDialog: state.showErrorDialog,
    };
}
function mapDispatchToProps(dispatch: AppThunkDispatch): IComponentDispatchProps {
    return {
        closeErrorDialog: () => dispatch(closeErrorDialogAction()),
    };
}

const connector = connect<IComponentStateProps, IComponentDispatchProps, {}, IStore>(mapStateToProps, mapDispatchToProps);

type ComponentProps = ConnectedProps<typeof connector>;

class AppClass extends React.PureComponent<ComponentProps> {
    public render(): React.ReactNode {
        const {
            shouldShowErrorDialog,
            closeErrorDialog,
        } = this.props;

        return (
            <AppStyledMainWrapper>
                <h1>GitHub Users App</h1>
                <Switch>
                    <Route
                        exact
                        path={AppRoutes.UserList}
                        component={UserList}
                    />
                    <Route
                        path={AppRoutes.UserDetails}
                        component={UserDetails}
                    />
                </Switch>
                <FetchErrorDialog isOpen={shouldShowErrorDialog} onClose={closeErrorDialog}/>
            </AppStyledMainWrapper>
        );
    }
}

export const App = connector(AppClass);
