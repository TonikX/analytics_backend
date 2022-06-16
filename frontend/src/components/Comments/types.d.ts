import {WithStyles} from "@material-ui/core";
import styles from "./Comments.styles";
import {CommentFields} from "../../containers/WorkProgram/enum";
import {UserType} from "../../layout/types";

export interface CommentsProps extends WithStyles<typeof styles> {
    sendNewComment: (comment: string) => void;
    isOpen: boolean;
    comments: Array<CommentType>;
    handleClick: () => void;
}

export type CommentType = {
    [CommentFields.DATE]: string;
    [CommentFields.TEXT]: string;
    [CommentFields.ID]: number;
    [CommentFields.USER_EXPERTISE]: {
        [CommentFields.EXPERT]: UserType
    };
}