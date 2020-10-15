import React from 'react';
import {useHistory} from 'react-router-dom';
import {Avatar, IconButton} from '@material-ui/core';
import {ArrowBack} from '@material-ui/icons';
import {AppStyledUserDetailsHeader} from '../styled/AppStyledUserDetailsHeader';
import {AppRoutes} from '../enums/routes';

export function UserDetailsHeading(): JSX.Element {
    const routerHistory = useHistory();

    function onBackClick(): void {
        routerHistory.push(AppRoutes.UserList);
    }

    return (
        <AppStyledUserDetailsHeader>
            <IconButton aria-label="back" onClick={onBackClick}>
                <ArrowBack/>
            </IconButton>
        </AppStyledUserDetailsHeader>
    );
}
