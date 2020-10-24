import {WithStyles} from "@material-ui/core";
import styles from "./Comments.styles";
import {WorkProgramActions, CommentType} from "../types";

export interface CommentsProps extends WithStyles<typeof styles> {
    currentStep: string;
    actions: WorkProgramActions;
    workProgramExpertiseId: number;
    comments: Array<CommentType>;
}