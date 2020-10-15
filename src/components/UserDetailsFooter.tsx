import React from 'react';
import { AppStyledUserDetailsFooter } from '../styled/AppStyledUserDetailsFooter';
import {Button} from '@material-ui/core';
import {config} from '../config';
import { AppTexts } from '../enums/texts';
import {makeStyles} from '@material-ui/core/styles';

interface IComponentProps {
    pageUrl: string;
}

const {
    lang,
} = config;
const useStyles = makeStyles({
    button: {
        textTransform: 'capitalize',
        paddingLeft: 0,
    },
});

export function UserDetailsFooter(props: IComponentProps): JSX.Element {
    const {
        pageUrl,
    } = props;
    const classes = useStyles();

    return (
        <AppStyledUserDetailsFooter>
            <Button
                className={classes.button}
                href={pageUrl}
                size="large"
                color="primary"
            >
                {AppTexts[lang].UserDetailsProfile}
            </Button>
        </AppStyledUserDetailsFooter>
    );
}
