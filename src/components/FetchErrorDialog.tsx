import React from 'react';
import {Avatar, Dialog, DialogContent, DialogTitle} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {config} from '../config';
import {AppTexts} from '../enums/texts';
import {SAD_PEPE_IMAGE_URL} from '../enums/url';
import {AppRoutes} from '../enums/routes';

interface IComponentProps {
    isOpen: boolean;
    onClose: () => void;
}

const {
    lang,
} = config;
const useStyles = makeStyles({
    title: {
        textAlign: 'center',
    },
    image: {
        width: 184,
        height: 184,
        margin: '10px auto',
    },
});

export function FetchErrorDialog(props: IComponentProps): JSX.Element {
    const classes = useStyles();
    const historyRouter = useHistory();

    const handleDialogClose = () => {
        props?.onClose();
        historyRouter.push(AppRoutes.UserList);
    };

    return (
        <Dialog
            aria-labelledby="fetch-error-dialog"
            open={props.isOpen}
            fullWidth={true}
            onClose={handleDialogClose}
        >
            <DialogTitle className={classes.title} id="fetch-error-dialog">
                {AppTexts[lang].FetchErrorDialogTitle}
            </DialogTitle>
            <DialogContent>
                <Avatar
                    className={classes.image}
                    alt="sad_pepe"
                    src={SAD_PEPE_IMAGE_URL}
                    variant="square"
                />
            </DialogContent>
        </Dialog>
    );
}
