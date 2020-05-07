import {WorkProgramActions} from '../types';
import {WithStyles} from "@material-ui/core";
import styles from './FirstStep.styles';

export interface FirstStepProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    code: string;
    title: string;
    fetchingCode: boolean;
    fetchingTitle: boolean;
}