import {fields} from './enum';
import {WithStyles} from "@material-ui/core";
import styles from "./WorkProgram.styles";
import {IndividualEducationalPlanFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";
import {EducationalPlanType} from "../EducationalPlan/types";
import {DirectionType} from "../Direction/types";
import {ReactText} from "react";
import {UserType} from "../../layout/types";

export interface IndividualEducationalPlansActions {
    changeSearchQuery: any;
    getIndividualEducationalPlans: any;
    setIndividualEducationalPlans: any;
    deleteIndividualEducationalPlans: any;
    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
}

export interface individualEducationalPlansState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.INDIVIDUAL_EDUCATIONAL_PLANS]: Array<IndividualEducationalPlansType>;
    [fields.EDUCATION_PLAN_IN_DIRECTION_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: IndividualEducationalPlansType|{};
    };
}

export type IndividualEducationalPlansType = {
    [IndividualEducationalPlanFields.ID]: number,
    [IndividualEducationalPlanFields.IMPLEMENTATION_OF_ACADEMIC_PLAN]: {
        [IndividualEducationalPlanFields.DIRECTION]: DirectionType,
        [IndividualEducationalPlanFields.EDUCATION_PLAN]: EducationalPlanType,
        [IndividualEducationalPlanFields.YEAR]: ReactText,
    },
    [IndividualEducationalPlanFields.USER]: UserType,
};

export interface IndividualEducationalPlansProps extends WithStyles<typeof styles> {
    actions: IndividualEducationalPlansActions;
    IndividualEducationalPlans: Array<IndividualEducationalPlansType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    canEdit: boolean;
    sortingField: string;
    sortingMode: SortingType;
}