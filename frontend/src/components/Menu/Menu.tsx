import React from 'react';

import {Link} from "react-router-dom";
import {withRouter, RouteComponentProps} from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import withStyles from '@mui/material/styles/withStyles';
import {WithStyles} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import getMenuList, {getMockMenu} from "./MenuList";

import styles from './Menu.styles';

interface MenuProps extends WithStyles<typeof styles>, RouteComponentProps {
    isOpen: boolean;
    userGroups: Array<string>;
    mockMenu: Array<number>;
}

class Menu extends React.PureComponent<MenuProps>{
    render() {
        const {classes, isOpen, userGroups, mockMenu} = this.props;
        const {pathname} = this.props.location;
        const menuListMock = mockMenu.length !== 0 ? getMockMenu(mockMenu) : [];
        const menuList = getMenuList(userGroups);

        return(
            <Drawer
                variant="persistent"
                anchor="left"
                open={isOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Scrollbars>
                    <List className={classes.menuList}>
                        {mockMenu.length !== 0 ?
                            <>
                                {menuListMock.map((item: any, itemIndex: number) =>
                                    <Link to={item.link}
                                          className={classes.link}
                                          key={`${itemIndex}`}
                                    >
                                        <MenuItem
                                            selected={pathname === item.link}
                                            classes={{
                                                selected: classes.selectedMenuItem,
                                                root: classes.menuItem,
                                            }}
                                        >
                                            <img src={pathname === item.link ? item.selectedIcon : item.icon} className={classes.icon} alt="" />
                                            {item.title}
                                        </MenuItem>
                                    </Link>
                                )}
                            </>
                            :
                            <>
                                {menuList.map((group, groupIndex) =>
                                    <div key={groupIndex}>
                                        {group.map((item, itemIndex) =>
                                            <Link to={item.link}
                                                  className={classes.link}
                                                  key={`${groupIndex}-${itemIndex}`}
                                            >
                                                <MenuItem
                                                    selected={pathname === item.link}
                                                    classes={{
                                                        selected: classes.selectedMenuItem,
                                                        root: classes.menuItem,
                                                    }}
                                                >
                                                    <img src={pathname === item.link ? item.selectedIcon : item.icon} className={classes.icon} alt="" />
                                                    {item.title}
                                                </MenuItem>
                                            </Link>
                                        )}
                                        <Divider />
                                    </div>
                                )}
                            </>
                        }
                    </List>
                </Scrollbars>
            </Drawer>
        );
    }
}

export default withStyles(styles)(withRouter(Menu));