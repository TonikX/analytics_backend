import React, {SyntheticEvent, useState} from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import Liked from "@material-ui/icons/Favorite";
import NotLiked from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import styles from './LikeButton.styles';

import {LikeButtonProps} from './types';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {FoldersFields} from "../../containers/Profile/Folders/enum";

const LikeButton = ({classes, isLiked, onChange, folders}: LikeButtonProps) => {
    const [isHover, changeHover] = useState(false);
    const [anchor, changeOpenFolderMenu] = useState(null);

    const handleClick = (event: SyntheticEvent) => {
        // @ts-ignore
        changeOpenFolderMenu(event.currentTarget);
    }
    const handleCloseMenu = () => {
        changeOpenFolderMenu(null);
    }

    return (
            <>
            <Tooltip title={isLiked ? "Убрать из избранного" : "Добавить в избранное"}>
                <IconButton className={classes.button}
                            onClick={handleClick}
                            onMouseEnter={() => changeHover(true)}
                            onMouseLeave={() => changeHover(false)}
                >
                   {(isLiked || isHover) ? <Liked /> : <NotLiked />}
                </IconButton>
            </Tooltip>
            <Menu anchorEl={anchor}
                  anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                  }}
                  open={Boolean(anchor)}
                  onClose={() => handleCloseMenu()}
                  PopoverClasses={{
                      root: classes.popper,
                      paper: classes.menuPaper
                  }}
            >
                {folders.map(item =>
                    <MenuItem key={item[FoldersFields.ID]}>
                        {item[FoldersFields.NAME]}
                    </MenuItem>
                )}
            </Menu>
        </>
    );
}

export default withStyles(styles)(LikeButton);
