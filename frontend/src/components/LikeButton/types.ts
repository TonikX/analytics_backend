import {withStyles} from '@mui/styles';
import styles from "./LikeButton.styles";

export interface LikeButtonProps extends WithStyles<typeof styles> {
    isLiked: boolean;
    onClick: Function;
}