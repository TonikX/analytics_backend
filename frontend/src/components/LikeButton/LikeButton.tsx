import React, {useState} from 'react';

import {withStyles} from '@mui/styles';

import Liked from "@mui/icons-material/Favorite";
import NotLiked from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import ConfirmDialog from "../ConfirmDialog";
import {LikeButtonProps} from './types';

import styles from './LikeButton.styles';

const LikeButton = ({classes, isLiked, onClick}: LikeButtonProps) => {
    const [isHover, changeHover] = useState(false);
    const [isOpenConfirmDialog, changeOpenConfirmDialog] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (isLiked){
            changeOpenConfirmDialog(true);
        } else {
            onClick();
        }
    }

    const handleConfirmDelete = () => {
        changeOpenConfirmDialog(false);
        onClick();
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
            <ConfirmDialog isOpen={isOpenConfirmDialog}
                           onConfirm={handleConfirmDelete}
                           onDismiss={() => changeOpenConfirmDialog(false)}
                           confirmText={'Вы точно уверены, что хотите удалить из избранного?'}
                           dialogTitle={'Удалить из избранного'}
                           confirmButtonText={'Удалить'}
            />
        </>
    );
}

export default withStyles(styles)(LikeButton);
