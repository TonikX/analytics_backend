import {WithStyles} from '@mui/styles';

import {WorkProgramActions} from "../../types";
import {SectionType} from '../types';

import styles from "./EditedRow.styles";
import {ImplementationFormatsEnum} from "../../enum";

export interface EditedRowProps extends WithStyles<typeof styles> {
    actions: WorkProgramActions;
    section: Section;
    removeNewSection: Function;
    count: number;
    isCanEdit: boolean;
    implementationFormat: ImplementationFormatsEnum;
}

export interface EditedRowState {
    section: Section;
    isEditMode: boolean;
}