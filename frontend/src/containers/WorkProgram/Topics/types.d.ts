import {WithStyles} from '@mui/styles';
import {WorkProgramActions} from '../types';
import {SectionType} from "../types";
import styles from "./Topics.styles";

export interface TopicsProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    sections: Array<SectionType>;
    isCanEdit: boolean;
}