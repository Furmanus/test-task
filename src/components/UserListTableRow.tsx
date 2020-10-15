import {Avatar, TableCell, TableRow, makeStyles} from '@material-ui/core';
import React from 'react';
import { TableData } from '../interfaces/interfaces';

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

    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell align="right">{login}</TableCell>
            <TableCell align="right" width={40}>
                <Avatar aria-label="details" className={classes.avatar} alt={login} src={avatar_url}/>
            </TableCell>
        </TableRow>
    );
}
