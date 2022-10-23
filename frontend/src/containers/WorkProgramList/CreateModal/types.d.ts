import {WithStyles} from "@material-ui/core";
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
    SRO: number,
    lecture_classes: number,
    practical_lessons: number,
    laboratory: number,
}

export type EditableRowProps = {
    section: HoursSection;
    semesterNum: number,
    updateRow: (section: HoursSection, semesterNum: number) => void;
}
