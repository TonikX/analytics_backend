import {WithStyles} from "@material-ui/core";
import {WorkProgramActions} from '../types';
import styles from './FirstStep.styles';
import {UserType} from "../../../layout/types";

export interface FirstStepProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    code: string;
    title: string;
    date: string;
    authors: string;
    description: string;
    video: string;
    qualification: string;
    language: string;
    structuralUnit: string;
    editors: Array<UserType>;
    extraPoints: string|null;

    isCanEdit: boolean;

    fetchingCode: boolean;
    fetchingTitle: boolean;
    fetchingAuthors: boolean;
    fetchingDate: boolean;
    fetchingDescription: boolean;
    fetchingVideoLink: boolean;
}