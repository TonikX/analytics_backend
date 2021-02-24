import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
} from '@reduxjs/toolkit';

import {WithStyles} from "@material-ui/core";
import styles from "./SelectDiscipline.styles";
import {fields, qualificationEnum, workProgramFields, wpTypeEnum} from "./enum";

import {mapDispatchToProps, mapStateToProps} from './SelectDiscipline.connect';

export interface SelectDisciplineActions {
    selectDisciplineGetKeywords: ActionCreatorWithoutPayload;
    selectDisciplineSetKeywords: ActionCreatorWithPayload;
    selectDisciplineGetWorkPrograms: ActionCreatorWithoutPayload;
    getCorrectWorkPrograms: ActionCreatorWithPayload;
    setCorrectWorkPrograms: ActionCreatorWithPayload;
    selectDisciplineSelectKeyword: ActionCreatorWithPayload;
    selectDisciplineUnselectKeyword: ActionCreatorWithPayload;
    selectSemester: ActionCreatorWithPayload;
    selectQualification: ActionCreatorWithPayload;
}

export interface selectDisciplineState {
    [fields.WORK_PROGRAMS]: Array<WorkProgramType>;
    [fields.ALL_KEYWORDS]: Array<string>;
    [fields.SELECTED_KEYWORDS]: Array<string>;
    [fields.SELECTED_SEMESTER]: number;
    [fields.SELECTED_QUALIFICATION]: QualificationType;
}

export interface SelectDisciplineProps extends WithStyles<typeof styles>, mapDispatchToPropsType, propsFromRedux {}

export type QualificationType = qualificationEnum;
export type WorkProgramTypeType = wpTypeEnum;

export type WorkProgramType = {
    [workProgramFields.ID]: number;
    [workProgramFields.DISCIPLINE_CODE]: string;
    [workProgramFields.TITLE]: string;
};

export type mapDispatchToPropsType = ReturnType<mapDispatchToProps>;
export type propsFromRedux = ReturnType<mapStateToProps>;
