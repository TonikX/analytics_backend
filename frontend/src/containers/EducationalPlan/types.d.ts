import {fields} from './enum';
import {WithStyles} from "@material-ui/core";
import styles from "./WorkProgram.styles";
import {EducationalPlanFields, EducationalPlanBlockFields, ModuleFields, BlocksOfWorkProgramsFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";
import {WorkProgramGeneralType} from "../WorkProgram/types";
import {DirectionType} from "../Direction/types";
import {UserType} from "../../layout/types";

export interface EducationalPlanActions {
    pageDown: any;
    deleteCompetenceBlock: any;
    deleteWorkProgramFromZun: any;
    saveCompetenceBlock: any;

    closeCreateModuleDialog: any;
    openCreateModuleDialog: any;

    openAddModuleDialog: any;
    closeAddModuleDialog: any;

    createModule: any;
    changeModule: any;
    deleteModule: any;
    addModule: any;

    changeBlockOfWorkPrograms: any;
    deleteBlockOfWorkPrograms: any;
    createBlockOfWorkPrograms: any;
    openDetailDialog: any;
    closeDetailDialog: any;
    setEducationalDetail: any;
    getEducationalDetail: any;
    changeSearchQuery: any;
    getEducationalPlans: any;
    setEducationalPlans: any;
    createNewEducationalPlan: any;
    changeEducationalPlan: any;
    deleteEducationalPlan: any;
    openDialog: any;
    closeDialog: any;
    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
    openDownloadModal: any;
    closeDownloadModal: any;
    getDirectionsDependedOnWorkProgram: any;
    getCompetenceDirectionsDependedOnWorkProgram: any;
    setDirectionsDependedOnWorkProgram: any;

    setIsTrajectoryRoute: any;
    planTrajectorySetUserData: any;
    planTrajectorySetDirection: any;
    planTrajectorySelectOptionalWp: any;
    planTrajectorySelectElectives: any;
    validateAcademicPlan: any;
    planTrajectorySelectSpecialization: any;
}

export interface educationalPlanState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.DETAIL_PLAN]: EducationalPlanType|{};
    [fields.EDUCATIONAL_PLAN_LIST]: Array<EducationalPlanListType>;
    [fields.EDUCATIONAL_PLAN_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: EducationalPlanType|{};
    };
    [fields.EDUCATIONAL_PLAN_CREATE_MODULE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: ModuleType|{};
    };
    [fields.EDUCATIONAL_PLAN_DETAIL_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: EducationalPlanType|{};
    };
    [fields.EDUCATIONAL_PLAN_ADD_MODULE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: {};
    };
    [fields.DOWNLOAD_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: {};
    };
    [fields.DIRECTIONS_DEPENDED_ON_WORK_PROGRAM]: Array<DirectionType>;
    [fields.IS_TRAJECTORY_ROUTE]: boolean,
    [fields.TRAJECTORY_USER_DATA]: {} | UserType,
    [fields.TRAJECTORY_DIRECTION]: {} | DirectionType,
}

export type EducationalPlanType = {
    [EducationalPlanFields.ID]: number;
    [EducationalPlanFields.PROFILE]: string;
    [EducationalPlanFields.NUMBER]: string;
    [EducationalPlanFields.APPROVAL_DATE]: string;
    [EducationalPlanFields.YEAR]: string;
    [EducationalPlanFields.QUALIFICATION]: string;
    [EducationalPlanFields.EDUCATION_FORM]: string;
    [EducationalPlanFields.CAN_EDIT]: boolean;
    [EducationalPlanFields.ID_RATING]: string;
    [EducationalPlanFields.RATING]: string;
    [EducationalPlanFields.DISCIPLINE_BLOCKS]: Array<DisciplineBlockType>;
};

export type EducationalPlanListType = {
    [EducationalPlanFields.ID]: number;
    [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY]: Array<{
        [EducationalPlanFields.FIELD_OF_STUDY]: Array<DirectionType>;
        [EducationalPlanFields.QUALIFICATION]: string;
        [EducationalPlanFields.YEAR]: string;
        [EducationalPlanFields.NUMBER]: string;
        [EducationalPlanFields.PROFILE]: string;
        [EducationalPlanFields.TITLE]: string;
    }>;
    [EducationalPlanFields.APPROVAL_DATE]: string;
    [EducationalPlanFields.CAN_EDIT]: boolean;
}

export type DisciplineBlockType = {
    [EducationalPlanBlockFields.ID]: number;
    [EducationalPlanBlockFields.NAME]: string;
    [EducationalPlanBlockFields.MODULES]: Array<ModuleType>;
};

export type ModuleType = {
    [ModuleFields.ID]: number;
    [ModuleFields.NAME]: string;
    [ModuleFields.BLOCKS_OF_WORK_PROGRAMS]: Array<BlocksOfWorkProgramsType>;
};

export type BlocksOfWorkProgramsType = {
    [BlocksOfWorkProgramsFields.ID]: number;
    [BlocksOfWorkProgramsFields.TYPE]: string;
    [BlocksOfWorkProgramsFields.CHANGED]: boolean;
    [BlocksOfWorkProgramsFields.WORK_PROGRAMS]: Array<WorkProgramBlockType>;
};

export interface WorkProgramBlockType extends WorkProgramGeneralType{
    wp_in_fs_id: number;
}

export interface EducationalPlanProps extends WithStyles<typeof styles> {
    actions: EducationalPlanActions;
    educationalPlan: Array<EducationalPlanType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
    canAddNewPlan: boolean;
}
