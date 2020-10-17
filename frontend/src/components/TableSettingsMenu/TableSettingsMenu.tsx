import React from 'react';
import isFunction from "lodash/isFunction";

import {Link} from "react-router-dom";

import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsIcon from "@material-ui/icons/MoreVert";

import {TableSettingsMenuProps} from './types';

import styles from './TableSettingsMenu.styles';

const TableSettingsMenu = ({handleOpenMenu, anchorEl, classes, handleCloseMenu, menuItems} : TableSettingsMenuProps) => {
    return (
        <div className={classes.actions}>
            <IconButton
                aria-haspopup="true"
                onClick={(e) => handleOpenMenu(e)}
                color="inherit"
            >
                <SettingsIcon />
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
                open={Boolean(anchorEl)}
                onClose={() => handleCloseMenu()}
                PopoverClasses={{
                    root: classes.popper,
                    paper: classes.menuPaper
                }}
            >
                {menuItems.map((item, index) =>
                    <MenuItem key={`menu-item-${index}`} className={classes.menuLinkItem} onClick={() => isFunction(item.handleClickItem) && item.handleClickItem()}>
                        {item.link ?
                            <Link to={item.link}>
                                {item.icon && item.icon}
                                {item.text && item.text}
                            </Link>
                            :
                            <>
                                {item.icon && item.icon}
                                {item.text && item.text}
                            </>
                        }
                    </MenuItem>
                )}
            </Menu>
        </div>
    )
}
export default withStyles(styles)(TableSettingsMenu);
