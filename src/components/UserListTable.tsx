import React, {useEffect, useRef} from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    Fade,
} from '@material-ui/core';
import {TableData} from '../interfaces/interfaces';
import {makeStyles} from '@material-ui/core/styles';
import { UserListTableRow } from './UserListTableRow';
import {UserListTablePagination} from './UserListTablePagination';
import {AppLoader} from './AppLoader';
import {readObjectDataFromStorage, writeObjectDataToStorage} from '../utils/storage';

interface IStorageData {
    top: number;
}
interface IComponentProps {
    data: TableData[];
    currentPage: number;
    onPreviousClick: () => void;
    onNextClick: () => void;
    isPreviousDisabled: boolean;
    isNextDisabled: boolean;
    isFetchingData: boolean;
}
const STORAGE_KEY = 'app_table_scroll_position';
const useStyles = makeStyles({
    container: {
        flexGrow: 1,
    },
    wrapper: {
        marginTop: '5px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
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
    const tableContainerRef = useRef<HTMLDivElement>(null);
    let scrollTimeout: number | null;
    const onTableContainerScroll = (): void => {
        if (!scrollTimeout) {
            scrollTimeout = window.setTimeout(() => {
                const scrollTop = tableContainerRef.current?.scrollTop;

                writeObjectDataToStorage(STORAGE_KEY, {
                    top: scrollTop,
                });

                scrollTimeout = null;
            }, 300);
        }
    };

    useEffect(() => {
        const scrollTop = readObjectDataFromStorage<IStorageData>(STORAGE_KEY)?.top;
        const element = tableContainerRef.current;

        if (element) {
            element.addEventListener('scroll', onTableContainerScroll);

            if (scrollTop) {
                element.scrollTop = scrollTop;
            }
        }

        return () => {
            if (element) {
                element.removeEventListener('scroll', onTableContainerScroll);
            }
        };
    });

    return (
        <Paper className={classes.wrapper} aria-label="List of GitHub users" elevation={2} component="section">
            <TableContainer ref={tableContainerRef} className={classes.container}>
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
