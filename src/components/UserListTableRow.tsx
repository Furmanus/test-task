import {Avatar, TableCell, TableRow, makeStyles} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import React from 'react';
import { TableData } from '../interfaces/interfaces';
import {AppRoutes} from '../enums/routes';

const useStyles = makeStyles({
    avatar: {
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        'transition-delay': '0.2s',
        '&:hover': {
            transform: 'scale(1.2)',
        }
    }
});

export function UserListTableRow(props: TableData): JSX.Element {
    const {
        id,
        login,
        avatar_url,
    } = props;
    const classes = useStyles();
    const routerHistory = useHistory();

    function onAvatarClick() {
        routerHistory.push(AppRoutes.UserDetails.replace(':user', login));
    }

    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell align="right">{login}</TableCell>
            <TableCell align="right" width={40}>
                <Avatar
                    aria-label="details"
                    className={classes.avatar}
                    alt={login}
                    src={avatar_url}
                    onClick={onAvatarClick}
                />
            </TableCell>
        </TableRow>
    );
}

