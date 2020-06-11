import React from 'react';

// @ts-ignore
import Link from "react-router-dom/Link";
import {withRouter, RouteComponentProps} from "react-router-dom";

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import withStyles from '@material-ui/core/styles/withStyles';
import {WithStyles} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import HomeIcon from '@material-ui/icons/HomeOutlined';
import BookIcon from '@material-ui/icons/BookOutlined';

import {appRouter} from "../../service/router-service";

import styles from './Menu.styles';

interface MenuProps extends WithStyles<typeof styles>, RouteComponentProps {
    isOpen: boolean
}

class Menu extends React.PureComponent<MenuProps>{
    render() {
        const {classes, isOpen} = this.props;
        const {pathname} = this.props.location;

        return(
            <Drawer
                variant="persistent"
                anchor="left"
                open={isOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >

                <List className={classes.menuList}>
                    <Link to={appRouter.getCoursesRoute()} className={classes.link}>
                        <MenuItem
                            selected={pathname === appRouter.getCoursesRoute()}
                            classes={{
                                selected: classes.selectedMenuItem,
                                root: classes.menuItem,
                            }}
                        >
                            <HomeIcon className={classes.icon} />
                            Онлайн курсы
                        </MenuItem>
                    </Link>

                    <Link to={appRouter.getLiteratureRoute()} className={classes.link}>
                            <MenuItem
                                selected={pathname === appRouter.getLiteratureRoute()}
                                classes={{
                                    selected: classes.selectedMenuItem,
                                    root: classes.menuItem,
                                }}
                            >
                                <BookIcon className={classes.icon} />
                                Источники
                            </MenuItem>
                    </Link>

                    <Link to={appRouter.getSubjectAreaRoute()} className={classes.link}>
                            <MenuItem
                                selected={pathname === appRouter.getSubjectAreaRoute()}
                                classes={{
                                    selected: classes.selectedMenuItem,
                                    root: classes.menuItem,
                                }}
                            >
                                <BookIcon className={classes.icon} />
                                Предметная область
                            </MenuItem>
                    </Link>

                    <Link to={appRouter.getTrainingEntitiesRoute()} className={classes.link}>
                            <MenuItem
                                selected={pathname === appRouter.getTrainingEntitiesRoute()}
                                classes={{
                                    selected: classes.selectedMenuItem,
                                    root: classes.menuItem,
                                }}
                            >
                                <BookIcon className={classes.icon} />
                                Учебные сущности
                            </MenuItem>
                    </Link>

                    <Link to={appRouter.getCompetencesRoute()} className={classes.link}>
                            <MenuItem
                                selected={pathname === appRouter.getCompetencesRoute()}
                                classes={{
                                    selected: classes.selectedMenuItem,
                                    root: classes.menuItem,
                                }}
                            >
                                <BookIcon className={classes.icon} />
                                Компетенции
                            </MenuItem>
                    </Link>

                    <Link to={appRouter.getEducationalProgramRoute()} className={classes.link}>
                            <MenuItem
                                selected={pathname === appRouter.getEducationalProgramRoute()}
                                classes={{
                                    selected: classes.selectedMenuItem,
                                    root: classes.menuItem,
                                }}
                            >
                                <BookIcon className={classes.icon} />
                                Образовательные программы
                            </MenuItem>
                    </Link>


                    <Link to={appRouter.getWorkProgramLink(5)} className={classes.link}>
                        <MenuItem
                            selected={pathname === appRouter.getWorkProgramLink(5)}
                            classes={{
                                selected: classes.selectedMenuItem,
                                root: classes.menuItem,
                            }}
                        >
                            <BookIcon className={classes.icon} />
                            Рабочая программа
                        </MenuItem>
                    </Link>
                </List>

            </Drawer>
        );
    }
}

export default withStyles(styles)(withRouter(Menu));