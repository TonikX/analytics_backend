import React, {SyntheticEvent} from 'react';
import {Link} from "react-router-dom";
import {withRouter, withRouterData} from "../../hoc/WithRouter";

import {withStyles, WithStyles} from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/MenuOutlined';
import CloseIcon from '@mui/icons-material/CloseOutlined';
import BookmarksIcon from '@mui/icons-material/BookmarksOutlined';
import TelegramIcon from '@mui/icons-material/Telegram';
import AccountCircle from '@mui/icons-material/AccountCircleOutlined';
import NotificationsIcon from '@mui/icons-material/NotificationsNone';
import TrajectoryIcon from '@mui/icons-material/SchoolOutlined';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Tooltip from "@mui/material/Tooltip";

import UserService from "../../service/user-service";
import {appRouter} from "../../service/router-service";

import styles from './Header.styles';

const userService = UserService.factory();

interface HeaderProps extends WithStyles<typeof styles>, withRouterData {
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
    userService.logout();
    this.handleClose();
    this.props.logout();
//@ts-ignore
    this.props.navigate(appRouter.getSignInRoute());
  };

  render() {
    //@ts-ignore
    const {classes} = this.props;
    const {openGeneralMenu, isAuth, notificationsCount, isDodProfile} = this.props;
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
                    {1 ? <div className={classes.count}>6</div> : <></>}
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
                    <TelegramIcon style={{color: "#fff"}} />
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
