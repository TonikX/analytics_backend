import {WithStyles} from "@material-ui/core";
import styles from "./LikeButton.styles";
import {FolderType} from "../../containers/Profile/Folders/types";

export interface LikeButtonProps extends WithStyles<typeof styles> {
    isLiked: boolean;
    onChange: Function;
    folders: Array<FolderType>;
}