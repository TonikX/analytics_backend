import {WithStyles} from '@mui/styles';
import {WorkProgramListActions} from '../types';

import styles from "./CreateModal.styles";
import {SelectorListType} from "../../../components/SearchSelector/types";
import {StructuralUnitsActions} from "../../StructuralUnits/types";

export interface CreateModalProps extends WithStyles<typeof styles> {
    actions: WorkProgramListActions;
    structuralUnit: any;
    structuralUnitsList: SelectorListType;
    structuralUnitActions: StructuralUnitsActions;
    isOpen: boolean;
}

export type HoursSection = {
    lecture_classes: number,
    practical_lessons: number,
    laboratory: number,
    ze_v_sem: number,
    evaluation_tools: number[],
    consultations: number,
}

export type EditableRowProps = {
    section: HoursSection;
    implementationFormat: string;
    semesterNum: number,
    updateRow: (section: HoursSection, semesterNum: number) => void;
}
