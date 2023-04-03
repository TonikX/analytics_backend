import {WithStyles} from '@mui/styles';
import {WorkProgramActions} from '../types';
import {StructuralUnitsActions, StructuralUnitType} from '../../StructuralUnits/types';
import styles from './FirstStep.styles';
import {UserType} from "../../../layout/types";
import {SelectorListType} from "../../../components/SearchSelector/types";
import {ImplementationFormatsEnum} from "../enum";

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
    offerta: boolean;
    semesterCount: number;
    moodleLink: string;

    isCanEdit: boolean;
    implementationFormat: ImplementationFormatsEnum | null;

    fetchingCode: boolean;
    fetchingTitle: boolean;
    fetchingAuthors: boolean;
    fetchingDate: boolean;
    fetchingDescription: boolean;
    fetchingVideoLink: boolean;
    fetchingMoodleLink: boolean;
    canAddEditors: boolean;
    changeBlock: any[];
}
