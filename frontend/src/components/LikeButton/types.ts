import {WithStyles} from "@material-ui/core";
import styles from "./LikeButton.styles";

export interface LikeButtonProps extends WithStyles<typeof styles> {
    isLiked: boolean;
    onClick: Function;
}