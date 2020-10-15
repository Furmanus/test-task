import React, { Fragment } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {AppRoutes} from '../enums/routes';

type ComponentRouteProps = RouteComponentProps<{userId: string}>

export class UserDetails extends React.PureComponent<ComponentRouteProps> {
    public render(): React.ReactNode {
        return (
            <Fragment>
                <p>DETALE USERA</p>
                <Link to={AppRoutes.UserList}>Lista usera {this.props.match.params.userId}</Link>
            </Fragment>
        );
    }
}
