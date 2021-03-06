import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {createStyles, Paper, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {IGitHubUserDetails} from '../interfaces/interfaces';
import {IStore} from '../interfaces/store';
import {connect, ConnectedProps} from 'react-redux';
import {AppThunkDispatch} from '../interfaces/thunk';
import {getUserDetailsAction} from '../actions/actions';
import {AppLoader} from '../components/AppLoader';
import { UserDetailsHeading } from '../components/UserDetailsHeading';
import { UserDetailsContent } from '../components/UserDetailsContent';
import {UserDetailsFooter} from '../components/UserDetailsFooter';
import {AppTexts} from '../enums/texts';
import {config} from '../config';

type ComponentRouteProps = RouteComponentProps<{user: string}>
interface IComponentStyleProps {
    classes: {
        paper: string;
    };
}
interface IComponentStateProps {
    userDetails: IGitHubUserDetails | null;
    isFetchingUserDetails: boolean;
}
interface IComponentDispatchProps {
    getUserDetails: (userId: string) => void;
}

function mapStateToProps(state: IStore): IComponentStateProps {
    return {
        userDetails: state.userDetails,
        isFetchingUserDetails: state.isFetchingUserDetails,
    };
}
function mapDispatchToProps(dispatch: AppThunkDispatch): IComponentDispatchProps {
    return {
        getUserDetails: (userId: string) => dispatch(getUserDetailsAction(userId)),
    };
}

const connector = connect<IComponentStateProps, IComponentDispatchProps, void, IStore>(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
type ComponentProps = ComponentRouteProps & IComponentStyleProps & ReduxProps;

const styles = createStyles({
    paper: {
        marginTop: 5,
        padding: 5,
        width: 400,
        height: 568,
        display: 'flex',
        flexDirection: 'column',
        '@media (max-width: 468px)': {
            width: '100%',
            height: '100%',
            boxShadow: 'unset',
            padding: 0,
        },
    },
});

class UserDetailsClass extends React.PureComponent<ComponentProps> {
    public componentDidMount(): void {
        const {
            getUserDetails,
            isFetchingUserDetails,
            match,
        } = this.props;
        const id = match?.params?.user;

        if (!isFetchingUserDetails && id) {
            getUserDetails(id);
        }
    }

    public render(): React.ReactNode {
        const {
            classes,
            isFetchingUserDetails,
            userDetails,
        } = this.props;

        return (
            <React.Fragment>
                <Typography>{AppTexts[config.lang].UserDetailsCardHeading}</Typography>
                <Paper className={classes.paper} aria-label="User details" elevation={2} component="section">
                    {
                        isFetchingUserDetails || userDetails === null ?
                            <AppLoader/> :
                            <React.Fragment>
                                <UserDetailsHeading/>
                                <UserDetailsContent
                                    name={userDetails.name}
                                    type={userDetails.type}
                                    followers={userDetails.followers}
                                    following={userDetails.following}
                                    public_repos={userDetails.public_repos}
                                    avatar_url={userDetails.avatar_url}
                                />
                                <UserDetailsFooter
                                    pageUrl={userDetails.html_url}
                                />
                            </React.Fragment>
                    }
                </Paper>
            </React.Fragment>
        );
    }
}

export const UserDetails = connector(withStyles(styles)(UserDetailsClass));
