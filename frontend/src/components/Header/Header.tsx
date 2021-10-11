import React from 'react';
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
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './Header.styles';
import {appRouter} from "../../service/router-service";

interface HeaderProps extends WithStyles<typeof styles> {
    openGeneralMenu: boolean;
    isAuth: boolean;
    handleCloseMenu: Function;
    handleOpenMenu: Function;
    logout: Function;
    notificationsCount: number;
}

class Header extends React.PureComponent<HeaderProps>{
    state = {
        anchorEl: null
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

    render() {
        const {classes, openGeneralMenu, isAuth, notificationsCount} = this.props;
        const {anchorEl} = this.state;

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

                            <Tooltip title="Личный кабинет">
                                <Link to={appRouter.getUserProfile()}
                                      className={classes.link}
                                >
                                    <IconButton
                                        aria-haspopup="true"
                                    >
                                        <AccountCircle className={classes.userProfileIcon} />
                                    </IconButton>
                                </Link>
                            </Tooltip>

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
