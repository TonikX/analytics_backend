import React, {SyntheticEvent} from 'react';
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";

import {WithStyles} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/MenuOutlined';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import BookmarksIcon from '@material-ui/icons/BookmarksOutlined';
import TelegramIcon from '@material-ui/icons/Telegram';
import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import NotificationsIcon from '@material-ui/icons/NotificationsNone';
import TrajectoryIcon from '@material-ui/icons/SchoolOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from '@material-ui/core/styles/withStyles';

import UserService from "../../service/user-service";
import {appRouter} from "../../service/router-service";
import styles from './Header.styles';

const userService = UserService.factory();

interface HeaderProps extends WithStyles<typeof styles> {
    openGeneralMenu: boolean;
    isAuth: boolean;
    handleCloseMenu: Function;
    handleOpenMenu: Function;
    logout: Function;
    notificationsCount: number;
    isDodProfile: boolean;
}

class Header extends React.PureComponent<HeaderProps>{
    state = {
        anchorEl: null
    };

    handleMenu = (event: SyntheticEvent): void => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleGeneralMenuButtonClick = () => {
        const {openGeneralMenu} = this.props;

        if (openGeneralMenu){
            this.props.handleCloseMenu();
        } else {
            this.props.handleOpenMenu();
        }
    };

    handleLogout = () => {
        // @ts-ignore
        const {history} = this.props;

        userService.logout();
        this.handleClose();
        this.props.logout();

        history.push(appRouter.getSignInRoute());
    };

    render() {
        const {classes, openGeneralMenu, isAuth, notificationsCount, isDodProfile} = this.props;
        const {anchorEl} = this.state;
        const isOpenAvatarMenu = Boolean(anchorEl);

        return(
            <AppBar position="fixed" className={classes.header}>
                <Toolbar>
                    {isAuth &&
                        <IconButton edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    className={classes.menuIcon}
                                    onClick={this.handleGeneralMenuButtonClick}>
                            {openGeneralMenu ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>
                    }
                    <Typography variant="h6">
                        Учебная аналитика
                    </Typography>
                    {isAuth &&
                        <div className={classes.rightSide}>
                            <Tooltip title="Индивидуальные учебные планы">
                                <Link to={appRouter.getIndividualEducationalPlansRoute()}
                                      className={classes.link}
                                >
                                    <IconButton aria-haspopup="true">
                                        <TrajectoryIcon className={classes.bookmarkIcon} />
                                    </IconButton>
                                </Link>
                            </Tooltip>

                            <Tooltip title="Уведомления">
                                <Link to={appRouter.getNotificationsRoute()}
                                      className={classes.link}
                                >
                                    <IconButton aria-haspopup="true">
                                        <NotificationsIcon className={classes.bookmarkIcon} />
                                        {notificationsCount ? <div className={classes.count}>{notificationsCount}</div> : <></>}
                                    </IconButton>
                                </Link>
                            </Tooltip>

                            <Tooltip title="Закладки">
                                <Link to={appRouter.getFoldersRoute()}
                                      className={classes.link}
                                >
                                    <IconButton aria-haspopup="true">
                                        <BookmarksIcon className={classes.bookmarkIcon} />
                                    </IconButton>
                                </Link>
                            </Tooltip>


                            <div className={classes.avatar}>
                                <IconButton
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>

                                <Menu
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={isOpenAvatarMenu}
                                    onClose={this.handleClose}
                                    PopoverClasses={{
                                        root: classes.popper
                                    }}
                                >
                                    <MenuItem onClick={this.handleClose}>
                                        <Link to={isDodProfile ? appRouter.getDodProfileRoute() : appRouter.getUserProfile()}
                                              className={classes.link}
                                        >
                                            Личный кабинет
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={this.handleClose}>
                                        <Link to={appRouter.getUserSettings()}
                                              className={classes.link}
                                        >
                                            Настройки
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={this.handleLogout}>
                                        <Link to={appRouter.getSignInRoute()}
                                              className={classes.link}
                                        >
                                            Выйти
                                        </Link>
                                    </MenuItem>
                                </Menu>
                            </div>


                            <Tooltip title="Телеграм">
                                <a href="https://t.me/op_itmo_ru"
                                   className={classes.link}
                                   target="_blank"
                                >
                                    <IconButton aria-haspopup="true" className={classes.telegramIcon}>
                                        <TelegramIcon />
                                    </IconButton>
                                </a>
                            </Tooltip>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        );
    }
}

// @ts-ignore
export default withStyles(styles)(withRouter(Header));
