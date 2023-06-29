import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {ReactText} from "react";

import {WithStyles} from '@mui/styles';

import {SortingType} from "../../components/SortingButton/types";
import {EducationalPlanInDirectionType} from "../EduationPlanInDirection/types";
import {EducationalPlanType} from "../EducationalPlan/types";
import {DirectionType} from "../Direction/types";
import {UserType} from "../../layout/types";

import {CompetenceTableType, EducationProgramFields, fields, EducationProgramCharacteristicFields, CharacteristicStatuses} from './enum';

import {characterisicStyles} from './Сharacteristic/Сharacteristic.styles';
import styles from "./WorkProgram.styles";

export interface EducationalProgramActions {
    sendToCheck: any;
    addNewRepresentative: any;
    updateRepresentative: any;
    deleteRepresentative: any;
    createTaskType: any,
    getTasksTypes: any,
    setTasksTypes: any,
    createObjectOfActivity: any,
    getObjectsOfActivity: any,
    setObjectsOfActivity: any,
    characteristicSaveProfessionalStandardLaborFunction: any;
    characteristicDeleteProfessionalStandardLaborFunction: any;
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
    createKindOfActivity: any;
    getKindsOfActivity: any;
    setKindsOfActivity: any;
    characteristicSaveKindOfActivity: any;
    characteristicDeleteKindOfActivity: any;

    characteristicSaveCompetenceKindsOfActivity: any;

    getCompetenceMatrix: any;
    setCompetenceMatrix: any;

    saveZun: any;
    deleteZun: any;

    getCompetenceDirectionsDependedOnWorkProgram: any;
    getDirectionsDependedOnWorkProgram: any;
    setDirectionsDependedOnWorkProgram: any;

    characteristicCreateGroup: ActionCreatorWithPayload<CharacteristicCreateGroupActionType>;
    characteristicSaveGroupTitle: ActionCreatorWithPayload<CharacteristicSaveGroupTitleActionType>;
    characteristicSaveCompetence: ActionCreatorWithPayload<CharacteristicAddCompetenceActionType>;
    characteristicSaveIndicator: ActionCreatorWithPayload<CharacteristicAddIndicatorActionType>;
    characteristicDeleteGroup: ActionCreatorWithPayload<CharacteristicDeleteGroupActionType>;
    characteristicDeleteCompetence: ActionCreatorWithPayload<CharacteristicDeleteCompetenceActionType>;
    characteristicSaveCompetenceLaborFunction: ActionCreatorWithPayload<CharacteristicSaveCompetenceLaborFunctionActionType>;
    characteristicDeleteIndicator: ActionCreatorWithPayload<CharacteristicDeleteIndicatorActionType>;
    characteristicSaveProfessionalStandard: ActionCreatorWithPayload<CharacteristicAddProfessionalStandardActionType>;
    characteristicDeleteProfessionalStandard: ActionCreatorWithPayload<CharacteristicDeleteProfessionalStandardActionType>;
}

export interface educationalProgramState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.KINDS_OF_ACTIVITIES]: Array<{ id: number; name: string; }>;
    [fields.OBJECTS_OF_ACTIVITIES]: Array<{ id: number; name: string; }>;
    [fields.TASKS_TYPES]: Array<{ id: number; name: string; }>;
    [fields.EDUCATION_PROGRAM_LIST]: Array<EducationalProgramType>;
    [fields.EDUCATION_PROGRAM_CHARACTERISTIC]: EducationalProgramCharacteristicType|{};
    [fields.EDUCATION_PROGRAM_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: EducationalProgramType|{};
    };
    [fields.COMPETENCE_MATRIX]: any;
}

export type EducationalProgramCharacteristicType = {
    [EducationProgramCharacteristicFields.ID]: number,
    [EducationProgramCharacteristicFields.STATUS]: CharacteristicStatuses,
    [EducationProgramCharacteristicFields.YEAR]: ReactText,
    [EducationProgramCharacteristicFields.LANGUAGE]: string,
    [EducationProgramCharacteristicFields.DIRECTION]: DirectionType,
    [EducationProgramCharacteristicFields.EDUCATION_PLAN]: EducationalPlanType,
    [EducationProgramCharacteristicFields.IS_ONLY_IN_UNIVERSITY]: boolean,
    [EducationProgramCharacteristicFields.IS_GLOBAL_EDUCATIONAL_PROGRAM]: boolean,
    [EducationProgramCharacteristicFields.IS_ONLINE_FORMAT]: boolean,
    [EducationProgramCharacteristicFields.COLLABORATION_RUSSIAN_IN_ONLINE_FORMAT]: string,
    [EducationProgramCharacteristicFields.IS_COLLABORATION_FOREIGN]: boolean,
    [EducationProgramCharacteristicFields.COLLABORATION_FOREIGN]: string,
    [EducationProgramCharacteristicFields.SCIENCE_TYPE]: boolean,
    [EducationProgramCharacteristicFields.INDUSTRIAL_TYPE]: boolean,
    [EducationProgramCharacteristicFields.CORPORATE_TYPE]: boolean,
    [EducationProgramCharacteristicFields.ENTERPRISE_TYPE]: boolean,
    [EducationProgramCharacteristicFields.TARGET_MASTER_TYPE]: boolean,
    [EducationProgramCharacteristicFields.DEAN_POSITION]: string,
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

export interface CharacteristicProps extends withStyles<typeof characterisicStyles> {
    actions: EducationalProgramActions;
    mainActions: any;
    educationalProgramCharacteristic: any;
    canEdit: boolean;
    statusInfo: any;
    location: any;
}

export type CharacteristicCreateGroupActionType = {
    name: string;
    type: CompetenceTableType;
    subType: 'prof' | 'fore' | 'min';
}

export type CharacteristicSaveGroupTitleActionType = {
    title: string;
    groupId: number;
    type: CompetenceTableType;
}
export type CharacteristicSaveCompetenceLaborFunctionActionType = {
    laborFunction: string;
    competenceId: number;
    type: CompetenceTableType;
}

export type CharacteristicDeleteGroupActionType = {
    groupId: number;
    type: CompetenceTableType;
}

export type CharacteristicAddCompetenceActionType = {
    groupId: number;
    competenceId: number;
    type: CompetenceTableType;
}

export type CharacteristicAddIndicatorActionType = {
    indicatorId: Array<number>;
    competenceId: number;
    type: CompetenceTableType;
}

export type CharacteristicAddProfessionalStandardActionType = {
    professionalStandardId: number;
    competenceId: number;
    type: CompetenceTableType;
}

export type CharacteristicDeleteProfessionalStandardActionType = {
    competenceId: number;
    type: CompetenceTableType;
}

export type CharacteristicDeleteCompetenceActionType = {
    competenceId: number;
    type: CompetenceTableType;
}

export type CharacteristicDeleteIndicatorActionType = {
    indicatorId: number;
    type: CompetenceTableType;
}
