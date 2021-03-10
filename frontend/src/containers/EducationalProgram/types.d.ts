import {EducationProgramFields, fields} from './enum';
import {WithStyles} from "@material-ui/core";
import styles from "./WorkProgram.styles";
import {EducationProgramCharacteristicFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";
import {EducationalPlanType} from "../EducationalPlan/types";
import {DirectionType} from "../Direction/types";
import {ReactText} from "react";
import {EducationalPlanInDirectionType} from "../EduationPlanInDirection/types";
import {UserType} from "../../layout/types";
import {characterisicStyles} from './Сharacteristic/Сharacteristic.styles';
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

export interface EducationalProgramActions {
    changeSearchQuery: any;
    getEducationalProgramCharacteristic: any;
    setEducationalProgramCharacteristic: any;
    changeEducationalProgramCharacteristic: any;
    openDialog: any;
    closeDialog: any;
    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
    getEducationalProgramList: any;
    createEducationalProgram: any;
    deleteEducationalProgram: any;
    changeEducationalProgram: any;
    setEducationalProgramList: any;

    characteristicSaveGroupTitle: ActionCreatorWithPayload<{title: string}>;
    characteristicSaveCompetence: ActionCreatorWithPayload<{competenceId: number}>;
    characteristicSaveIndicators: ActionCreatorWithPayload<{indicatorId: number}>;
    characteristicDeleteGroup: ActionCreatorWithPayload<{groupId: number}>;
}

export interface educationalProgramState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.EDUCATION_PROGRAM_LIST]: Array<EducationalProgramType>;
    [fields.EDUCATION_PROGRAM_CHARACTERISTIC]: EducationalProgramCharacteristicType|{};
    [fields.EDUCATION_PROGRAM_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: EducationalProgramType|{};
    };
}

export type EducationalProgramCharacteristicType = {
    [EducationProgramCharacteristicFields.ID]: number,
    [EducationProgramCharacteristicFields.YEAR]: ReactText,
    [EducationProgramCharacteristicFields.DIRECTION]: DirectionType,
    [EducationProgramCharacteristicFields.EDUCATION_PLAN]: EducationalPlanType,
};

export type EducationalProgramType = {
    [EducationProgramFields.ID]: number;
    [EducationProgramFields.YEAR]: ReactText;
    [EducationProgramFields.QUALIFICATION]: string;
    [EducationProgramFields.CAN_EDIT]: boolean;
    [EducationProgramFields.ACADEMIC_PLAN_FOR_EP]: EducationalPlanInDirectionType,
    [EducationProgramFields.MANAGER]: UserType,
};

export interface EducationalProgramProps extends WithStyles<typeof styles> {
    actions: EducationalProgramActions;
    educationalProgram: Array<EducationalProgramType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    canAddNew: boolean;
    sortingMode: SortingType;
}

export interface CharacteristicProps extends WithStyles<typeof characterisicStyles> {
    actions: EducationalProgramActions;
    educationalProgramCharacteristic: EducationProgramCharacteristicFields;
}
