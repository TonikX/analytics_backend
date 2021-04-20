import {fields} from './enum';
import {WithStyles} from "@material-ui/core";
import styles from "./WorkProgram.styles";
import {EducationPlanInDirectionFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";
import {EducationalPlanType} from "../EducationalPlan/types";
import {DirectionType} from "../Direction/types";
import {ReactText} from "react";

export interface EducationalPlanInDirectionActions {
    createIndividualEducationalPlan: any;
    changeSearchQuery: any;
    getEducationalPlansInDirection: any;
    setEducationalPlansInDirection: any;
    createNewEducationalPlanInDirection: any;
    changeEducationalPlanInDirection: any;
    deleteEducationalPlanInDirection: any;
    openDialog: any;
    closeDialog: any;
    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
    changeFiltering: any;
}

export interface educationalPlanInDirectionState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.FILTERING]: any;
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.EDUCATION_PLAN_IN_DIRECTION]: Array<EducationalPlanInDirectionType>;
    [fields.EDUCATION_PLAN_IN_DIRECTION_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: EducationalPlanInDirectionType|{};
    };
}

export type EducationalPlanInDirectionType = {
    [EducationPlanInDirectionFields.ID]: number,
    [EducationPlanInDirectionFields.YEAR]: ReactText,
    [EducationPlanInDirectionFields.DIRECTION]: DirectionType,
    [EducationPlanInDirectionFields.EDUCATION_PLAN]: EducationalPlanType,
};

export interface EducationalPlanInDirectionProps extends WithStyles<typeof styles> {
    actions: EducationalPlanInDirectionActions;
    educationalPlansInDirection: Array<EducationalPlanInDirectionType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    canEdit: boolean;
    sortingField: string;
    sortingMode: SortingType;
}