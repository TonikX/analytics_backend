import React, {SyntheticEvent, useState} from 'react';
// @ts-ignore
import ReactStars from "react-rating-stars-component";

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
    const [openRateItemId, openRate] = useState(-1);

    const handleClick = (event: SyntheticEvent) => {
        if (isLiked){
            onChange();
        } else {
            // @ts-ignore
            changeOpenFolderMenu(event.currentTarget);
        }
    }
    const handleCloseMenu = () => {
        changeOpenFolderMenu(null);
    }

    const handleOpenRate = (index: number) => () => {
        if (index === openRateItemId){
            openRate(-1);
        } else {
            openRate(index);
        }
    }

    const ratingChanged = (newRating: number) => {
        onChange(openRateItemId, newRating);
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
                {folders.map((item) =>
                    <MenuItem key={item[FoldersFields.ID]}
                              onClick={handleOpenRate(item[FoldersFields.ID])}
                              className={classes.menuItem}
                    >
                        {openRateItemId === item[FoldersFields.ID] ?
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={18}
                                activeColor="#ffd700"
                            />
                            :
                            item[FoldersFields.NAME]
                        }
                    </MenuItem>
                )}
            </Menu>
        </>
    );
}

export default withStyles(styles)(LikeButton);
