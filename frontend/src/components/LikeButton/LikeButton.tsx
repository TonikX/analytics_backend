import React, {useState} from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import Liked from "@material-ui/icons/Favorite";
import NotLiked from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

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
                           confirmText={'Вы точно уверены, что хотите удалить РПД из избранного?'}
                           dialogTitle={'Удалить из избранного'}
                           confirmButtonText={'Удалить'}
            />
        </>
    );
}

export default withStyles(styles)(LikeButton);
