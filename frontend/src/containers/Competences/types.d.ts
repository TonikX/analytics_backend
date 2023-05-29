import {fields} from './enum';
import {WithStyles} from '@mui/styles';
import styles from "./WorkProgram.styles";
import {CompetenceFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";
import {IndicatorType} from "../Indicators/types";

export interface CompetenceActions {
    getIndicatorsDependsCompetence: any;
    changeIndicator: any;
    createIndicator: any;
    deleteIndicator: any;
    getCompetence: any;
    setCompetence: any;
    getIndicators: any;
    setIndicators: any;
    changeSearchQuery: any;
    changeCodeQuery: any;
    changeFilterOnlyWithStandard: any;
    changeFilterAcademicPlan: any;
    getCompetences: any;
    setCompetences: any;
    createNewCompetence: any;
    changeCompetence: any;
    deleteCompetence: any;
    openDialog: any;
    closeDialog: any;
    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
}

export interface competenceState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.SEARCH_CODE]: string;
    [fields.FILTER_ONLY_WITH_STANDARD]: boolean;
    [fields.FILTER_ACADEMIC_PLAN]: number | undefined;
    [fields.COMPETENCE_LIST]: Array<CompetenceType>;
    [fields.COMPETENCE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: CompetenceType|{};
    };
    [fields.INDICATORS]: Array<IndicatorType>,
    [fields.COMPETENCE]: CompetenceType|{},
}

export type CompetenceType = {
    [CompetenceFields.ID]: number,
    [CompetenceFields.TITLE]: string,
    [CompetenceFields.NUMBER]: string,
};

export interface CompetenceProps extends WithStyles<typeof styles> {
    actions: CompetenceActions;
    competences: Array<CompetenceType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
}
