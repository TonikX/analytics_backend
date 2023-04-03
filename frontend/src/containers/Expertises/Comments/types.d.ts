import {WithStyles} from '@mui/styles';
import styles from "./Comments.styles";
import {ExpertisesActions, CommentType} from "../types";

export interface CommentsProps extends WithStyles<typeof styles> {
    currentStep: string;
    actions: ExpertisesActions;
    workProgramExpertiseId: number;
    comments: Array<CommentType>;
    closeComments: Function;
    id: number;
}
