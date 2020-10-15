import React from 'react';
import {CircularProgress} from '@material-ui/core';
import {AppStyledLoaderContainer} from '../styled/AppStyledLoaderContainer';

export function AppLoader(): JSX.Element {
    return (
        <AppStyledLoaderContainer>
            <CircularProgress/>
        </AppStyledLoaderContainer>
    );
}
