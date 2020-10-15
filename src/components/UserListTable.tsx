import React from 'react';
import {Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper} from '@material-ui/core';
import {IGitHubUser, TableData} from '../interfaces/interfaces';
import {makeStyles} from '@material-ui/core/styles';
import { UserListTableRow } from './UserListTableRow';

interface IComponentProps {
    data: TableData[];
}

const useStyles = makeStyles({
    container: {
        maxHeight: 600,
    },
    wrapper: {
        width: '100%',
    }
});

export function UserListTable(props: IComponentProps): JSX.Element {
    const {
        data,
    } = props;
    const classes = useStyles();

    return (
        <Paper className={classes.wrapper} aria-label="List of GitHub users" elevation={2} component="section">
            <TableContainer className={classes.container}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="right">login</TableCell>
                            <TableCell align="right">avatar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(item => <UserListTableRow key={item.id} {...item}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
