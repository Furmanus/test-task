import React from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    Fade,
    CircularProgress,
} from '@material-ui/core';
import {TableData} from '../interfaces/interfaces';
import {makeStyles} from '@material-ui/core/styles';
import { UserListTableRow } from './UserListTableRow';
import {UserListTablePagination} from './UserListTablePagination';
import { AppStyledLoaderContainer } from '../styled/AppStyledLoaderContainer';
import {AppLoader} from './AppLoader';

interface IComponentProps {
    data: TableData[];
    currentPage: number;
    onPreviousClick: () => void;
    onNextClick: () => void;
    isPreviousDisabled: boolean;
    isNextDisabled: boolean;
    isFetchingData: boolean;
}

const useStyles = makeStyles({
    container: {
        height: 568,
    },
    wrapper: {
        marginTop: '5px',
        width: '100%',
    }
});

export function UserListTable(props: IComponentProps): JSX.Element {
    const {
        data,
        currentPage,
        onNextClick,
        onPreviousClick,
        isPreviousDisabled,
        isNextDisabled,
        isFetchingData,
    } = props;
    const classes = useStyles();

    return (
        <Paper className={classes.wrapper} aria-label="List of GitHub users" elevation={2} component="section">
            <TableContainer className={classes.container}>
                {
                    isFetchingData ?
                        <AppLoader/> :
                        <Fade in={true}>
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
                        </Fade>
                }
            </TableContainer>
            <UserListTablePagination
                currentPage={currentPage}
                onPreviousClick={onPreviousClick}
                onNextClick={onNextClick}
                isPreviousDisabled={isPreviousDisabled || isFetchingData}
                isNextDisabled={isNextDisabled || isFetchingData}
            />
        </Paper>
    );
}
