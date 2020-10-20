import {ExpertisesFields, ExpertisesTypeEnum, fields} from './enum';
import {WithStyles} from "@material-ui/core";
import styles from "./Expertises.styles";
import {SortingType} from "../../components/SortingButton/types";
import WorkProgram from "../WorkProgram";
import {WorkProgramGeneralType} from "../WorkProgram/types";

export interface ExpertisesActions {
    changeSearchQuery: any;
    getExpertisesList: any;
    setExpertisesList: any;

    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;

    getExpertise: any;
    setExpertise: any;
    approveExpertise: any;
    updateExpertiseExperts: any;
}

export interface expertisesState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.EXPERTISES_LIST]: Array<ExpertiseType>;
    [fields.EXPERTISE]: ExpertiseType|{};
}

export interface ExpertisesProps extends WithStyles<typeof styles> {
    actions: ExpertisesActions;
    expertisesList: Array<any>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
}

export type ExpertiseStatusType = ExpertisesTypeEnum.EX|ExpertisesTypeEnum.WK;

export type ExpertiseType = {
    [ExpertisesFields.ID]: number;
    [ExpertisesFields.APPROVAL_DATE]: string;
    [ExpertisesFields.DATE_OF_LAST_CHANGE]: string;
    [ExpertisesFields.STATUS]: ExpertiseStatusType;
    [ExpertisesFields.EXPERTS]: Array<any>;
    [ExpertisesFields.WORK_PROGRAM]: WorkProgramGeneralType;
}