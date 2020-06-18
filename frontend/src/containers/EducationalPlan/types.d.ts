import {fields} from './enum';
import {WithStyles} from "@material-ui/core";
import styles from "./WorkProgram.styles";
import {EducationalPlanFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";

export interface EducationalPlanActions {
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
}

export type EducationalPlanType = {
    [EducationalPlanFields.ID]: number,
    [EducationalPlanFields.PROFILE]: string,
    [EducationalPlanFields.NUMBER]: string,
    [EducationalPlanFields.APPROVAL_DATE]: string,
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