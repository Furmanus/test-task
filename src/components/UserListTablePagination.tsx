import React from 'react';
import {IconButton, Typography} from '@material-ui/core';
import {NavigateNext, NavigateBefore} from '@material-ui/icons';
import { AppStyledPaginationContainer } from '../styled/AppStyledPaginationContainer';

interface IComponentProps {
    currentPage: number;
    onPreviousClick: () => void;
    onNextClick: () => void;
    isPreviousDisabled: boolean;
    isNextDisabled: boolean;
}

export function UserListTablePagination(props: IComponentProps): JSX.Element {
    const {
        currentPage,
        onPreviousClick,
        onNextClick,
        isPreviousDisabled,
        isNextDisabled,
    } = props;

    return (
        <AppStyledPaginationContainer>
            <IconButton aria-label="previous" onClick={onPreviousClick} disabled={isPreviousDisabled}>
                <NavigateBefore/>
            </IconButton>
            <Typography>{currentPage + 1}</Typography>
            <IconButton aria-label="next" onClick={onNextClick} disabled={isNextDisabled}>
                <NavigateNext/>
            </IconButton>
        </AppStyledPaginationContainer>
    );
}
