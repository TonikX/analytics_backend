import {WithStyles} from "@mui/material";
import styles from "./Comments.styles";
import {WorkProgramActions, CommentType} from "../types";

export interface CommentsProps extends WithStyles<typeof styles> {
    currentStep: string;
    actions: WorkProgramActions;
    workProgramExpertiseId: number;
    comments: Array<CommentType>;
    closeComments: Function;
}