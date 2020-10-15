import React, {Fragment} from 'react';
import { Switch, Route } from 'react-router-dom';
import {AppRoutes} from './enums/routes';
import {UserList} from './containers/UserList';
import {UserDetails} from './containers/UserDetails';

export class App extends React.PureComponent {
  public render(): React.ReactNode {
    return (
        <Fragment>
          <h1>HALO</h1>
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
        </Fragment>
    );
  }
}

