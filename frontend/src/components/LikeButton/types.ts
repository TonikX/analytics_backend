import {WithStyles} from "@mui/material";
import styles from "./LikeButton.styles";

export interface LikeButtonProps extends WithStyles<typeof styles> {
    isLiked: boolean;
    onClick: Function;
}