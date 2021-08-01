import {WithStyles} from "@material-ui/core";
import {WorkProgramActions} from '../types';
import {StructuralUnitsActions, StructuralUnitType} from '../../StructuralUnits/types';
import styles from './FirstStep.styles';
import {UserType} from "../../../layout/types";
import {SelectorListType} from "../../../components/SearchSelector/types";

export interface FirstStepProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    structuralUnitActions: StructuralUnitsActions;
    structuralUnitsList: SelectorListType;
    code: string;
    title: string;
    date: string;
    authors: string;
    description: string;
    video: string;
    qualification: string;
    language: string;
    structuralUnit: StructuralUnitType|null;
    editors: Array<UserType>;
    bars: boolean;
    semesterCount: number;

    isCanEdit: boolean;

    fetchingCode: boolean;
    fetchingTitle: boolean;
    fetchingAuthors: boolean;
    fetchingDate: boolean;
    fetchingDescription: boolean;
    fetchingVideoLink: boolean;
}