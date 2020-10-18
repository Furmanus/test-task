import React from 'react';
import {useHistory} from 'react-router-dom';
import {IconButton, Fade} from '@material-ui/core';
import {ArrowBack} from '@material-ui/icons';
import {AppStyledUserDetailsHeader} from '../styled/AppStyledUserDetailsHeader';
import {AppRoutes} from '../enums/routes';
import {makeStyles} from '@material-ui/core/styles';

const useStyle = makeStyles({
    button: {
        paddingTop: 15,
    },
});

export function UserDetailsHeading(): JSX.Element {
    const routerHistory = useHistory();
    const classes = useStyle();

    function onBackClick(): void {
        routerHistory.push(AppRoutes.UserList);
    }

    return (
        <Fade in={true}>
            <AppStyledUserDetailsHeader>
                <IconButton className={classes.button} aria-label="back" onClick={onBackClick}>
                    <ArrowBack/>
                </IconButton>
            </AppStyledUserDetailsHeader>
        </Fade>
    );
}
