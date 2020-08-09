import {fields} from './enum';
import {WithStyles} from "@material-ui/core";
import styles from "./WorkProgram.styles";
import {EducationalPlanFields, EducationalPlanBlockFields, ModuleFields, BlocksOfWorkProgramsFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";
import {WorkProgramGeneralType} from "../WorkProgram/types";
import {DirectionType} from "../Direction/types";

export interface EducationalPlanActions {
    saveCompetenceBlock: any;
    closeModuleDialog: any;
    openModuleDialog: any;
    createModule: any;
    changeModule: any;
    deleteModule: any;
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
    setDirectionsDependedOnWorkProgram: any;
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
    [fields.EDUCATIONAL_PLAN_LIST]: Array<EducationalPlanType>;
    [fields.EDUCATIONAL_PLAN_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: EducationalPlanType|{};
    };
    [fields.EDUCATIONAL_PLAN_MODULE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: ModuleType|{};
    };
    [fields.EDUCATIONAL_PLAN_DETAIL_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: EducationalPlanType|{};
    };
    [fields.DOWNLOAD_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: {};
    };
    [fields.DIRECTIONS_DEPENDED_ON_WORK_PROGRAM]: Array<DirectionType>
}

export type EducationalPlanType = {
    [EducationalPlanFields.ID]: number,
    [EducationalPlanFields.PROFILE]: string,
    [EducationalPlanFields.NUMBER]: string,
    [EducationalPlanFields.APPROVAL_DATE]: string,
    [EducationalPlanFields.YEAR]: string,
    [EducationalPlanFields.QUALIFICATION]: string,
    [EducationalPlanFields.EDUCATION_FORM]: string,
    [EducationalPlanFields.DISCIPLINE_BLOCKS]: Array<DisciplineBlockType>,
};

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
    [BlocksOfWorkProgramsFields.WORK_PROGRAMS]: Array<WorkProgramGeneralType>;
};

export interface EducationalPlanProps extends WithStyles<typeof styles> {
    actions: EducationalPlanActions;
    educationalPlan: Array<EducationalPlanType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
}
