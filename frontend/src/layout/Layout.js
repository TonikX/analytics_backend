import React from 'react';
import PropTypes from "prop-types";
import className from 'classnames';
import shallowEqual from "recompose/shallowEqual";
import {withRouter} from "react-router-dom";

import MomentUtils from '@date-io/moment';
import {SnackbarProvider} from 'notistack';
import "moment/locale/ru";

import {ThemeProvider} from '@mui/material/styles';
import withStyles from '@mui/material/styles/withStyles';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';

import UserService from '../service/user-service';

import Header from '../components/Header';
import Menu from '../components/Menu';
import AbsoluteLoader from '../components/AbsoluteLoader';
import Notificator from '../components/Notificator';
import AddToFolderModal from "../containers/Profile/Folders/AddToFolderModal/AddToFolderModal";

import theme from './themeMaterialUi';

import connect from './Layout.connect';
import styles from './Layout.styles';

import Scrollbars from "react-custom-scrollbars-2";

const userService = UserService.factory();

class Layout extends React.Component {
    state = {
        openMenu: false
    };

    componentWillMount() {
        const isAuth = userService.isAuth();

        if (isAuth){
            this.props.actions.setAuthTrue();
            this.props.actions.refreshToken();
        } else {
            this.props.actions.fetchingFalse({destination: 'refresh'})
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return !shallowEqual(this.props.errors, nextProps.errors)
            || !shallowEqual(this.props.children, nextProps.children)
            || !shallowEqual(this.props.location, nextProps.location)
            || this.props.fetching !== nextProps.fetching
            || this.props.auth !== nextProps.auth
            || this.props.mockMenu !== nextProps.mockMenu
            || this.state.openMenu !== nextState.openMenu
            || this.state.isFetchingRefreshToken !== nextState.isFetchingRefreshToken
        ;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.mockMenu && !prevProps.mockMenu && !this.state.openMenu){
            this.setState({openMenu: true})
        }
    }

    handleOpenMenu = () => {
        this.setState({openMenu: true});
    };

    handleCloseMenu = () => {
        this.setState({openMenu: false});
    };

    logout = () => {
        this.props.actions.setAuthFalse();
        this.handleCloseMenu();
    };

    isWorkProgramPage = () => this.props.location.pathname.includes('/work-program/');
    isLandingPage = () => this.props.location.pathname === '/';

    render() {
        const {openMenu} = this.state;
        const {classes, fetching, errors, successMessages, auth, userGroups, isFetchingRefreshToken, mockMenu, notificationsCount} = this.props;
        const isAuth = userService.isAuth() && auth;
        const isWorkProgramPage = this.isWorkProgramPage();
        const isLandingPage = this.isLandingPage();

        const isDodProfile = userGroups.includes('experts')

        if (isLandingPage) return this.props.children

        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <SnackbarProvider maxSnack={3}>
                    <ThemeProvider theme={theme}>
                        <AbsoluteLoader isFetching={fetching} />
                        <Notificator errors={errors} successMessages={successMessages} />
                        <Header handleOpenMenu={this.handleOpenMenu}
                                handleCloseMenu={this.handleCloseMenu}
                                openGeneralMenu={openMenu}
                                isAuth={isAuth}
                                logout={this.logout}
                                notificationsCount={notificationsCount}
                                isDodProfile={isDodProfile}
                        />
                        <div className={classes.root}>
                            {isAuth && <Menu isOpen={openMenu} userGroups={userGroups} mockMenu={mockMenu}/>}
                            <div className={className(classes.content, {
                                [classes.contentShift]: openMenu,
                                [classes.noPadding]: isWorkProgramPage
                            })}>
                                {!isFetchingRefreshToken && (
                                    <Scrollbars>
                                        {this.props.children}
                                    </Scrollbars>       
                                )}
                            </div>
                        </div>

                        {isAuth && <AddToFolderModal />}
                    </ThemeProvider>
                </SnackbarProvider>
            </MuiPickersUtilsProvider>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.any,
    errors: PropTypes.array,
    myCourses: PropTypes.array,
    fetching: PropTypes.bool
};

export default withRouter(connect(withStyles(styles)(Layout)));
