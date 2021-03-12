import {fields} from './enum';
import {WithStyles} from "@material-ui/core";
import styles from "./WorkProgram.styles";
import {IndividualTrajectoryFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";
import {CompetenceType} from "../Competences/types";
import {EducationalPlanType} from "../EducationalPlan/types";
import {DirectionType} from "../Direction/types";
import {ReactText} from "react";
import {UserType} from "../../layout/types";

export interface IndividualTrajectoriesActions {
    changeSearchQuery: any;
    getIndividualTrajectories: any;
    setIndividualTrajectories: any;
    deleteIndividualTrajectories: any;
    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
    showOnlyMy: any;
}

export interface individualTrajectoriesState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.SHOW_ONLY_MY]: boolean;
    [fields.INDIVIDUAL_TRAJECTORIES]: Array<IndividualTrajectoriesType>;
    [fields.EDUCATION_PLAN_IN_DIRECTION_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: IndividualTrajectoriesType|{};
    };
}

export type IndividualTrajectoriesType = {
    [IndividualTrajectoryFields.ID]: number,
    [IndividualTrajectoryFields.IMPLEMENTATION_OF_ACADEMIC_PLAN]: {
        [IndividualTrajectoryFields.DIRECTION]: DirectionType,
        [IndividualTrajectoryFields.EDUCATION_PLAN]: EducationalPlanType,
        [IndividualTrajectoryFields.YEAR]: ReactText,
    },
    [IndividualTrajectoryFields.USER]: UserType,
};

export interface IndividualTrajectoriesProps extends WithStyles<typeof styles> {
    actions: IndividualTrajectoriesActions;
    individualTrajectories: Array<IndividualTrajectoriesType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    canEdit: boolean;
    showOnlyMy: boolean;
    sortingField: string;
    sortingMode: SortingType;
}