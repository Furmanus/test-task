import React from 'react';
import { AppStyledUserDetailsContentContainer } from "../styled/AppStyledUserDetailsContentContainer";
import {IGitHubUserDetails} from '../interfaces/interfaces';
import {Avatar, Typography, Fade, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {config} from '../config';
import {AppTexts} from '../enums/texts';

type ComponentProps = Pick<IGitHubUserDetails, 'name' | 'public_repos' | 'type' | 'following' | 'followers' | 'avatar_url'>;
const {
    lang,
} = config;

const useStyles = makeStyles({
    wrapper: {
        padding: '0 15px',
    },
    name: {
        alignSelf: 'center',
        marginBottom: 15,
    },
    text: {
        color: 'rgba(0, 0, 0, 0.5)',
        marginBottom: 5,
    },
    avatar: {
        alignSelf: 'center',
        marginBottom: 15,
        width: 96,
        height: 96,
    },
});

export function UserDetailsContent(props: ComponentProps): JSX.Element {
    const {
        name,
        type,
        followers,
        following,
        public_repos,
        avatar_url,
    } = props;
    const classes = useStyles();

    return (
        <Fade in={true}>
            <AppStyledUserDetailsContentContainer className={classes.wrapper}>
                <Typography component="h4" variant="h4" className={classes.name}>{name}</Typography>
                <Avatar
                    alt={name}
                    src={avatar_url}
                    className={classes.avatar}
                />
                <Box height={1} display="flex" flexDirection="column" justifyContent="center">
                    <Typography className={classes.text}>
                        {AppTexts[lang].UserDetailsType.replace('{{type}}', type)}
                    </Typography>
                    <Typography className={classes.text}>
                        {AppTexts[lang].UserDetailsFollowers.replace('{{followers}}', followers.toString())}
                    </Typography>
                    <Typography className={classes.text}>
                        {AppTexts[lang].UserDetailsFollowing.replace('{{following}}', following.toString())}
                    </Typography>
                    <Typography className={classes.text}>
                        {AppTexts[lang].UserDetailsPublicRepos.replace('{{repos}}', public_repos)}
                    </Typography>
                </Box>
            </AppStyledUserDetailsContentContainer>
        </Fade>
    );
}
