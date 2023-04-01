import {fields} from './enum';
import {withStyles} from '@mui/styles';
import styles from "./WorkProgram.styles";
import {IndicatorsFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";
import {CompetenceType} from "../Competences/types";

export interface IndicatorProgramActions {
    getIndicatorsDependsCompetence: any;
    changeSearchQuery: any;
    getIndicators: any;
    setIndicators: any;
    createNewIndicator: any;
    changeIndicator: any;
    deleteIndicator: any;
    openDialog: any;
    closeDialog: any;
    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
}

export interface indicatorsState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.INDICATORS_LIST]: Array<IndicatorType>;
    [fields.INDICATORS_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: IndicatorType|{};
    };
}

export type IndicatorType = {
    [IndicatorsFields.ID]: number,
    [IndicatorsFields.TITLE]: string,
    [IndicatorsFields.NUMBER]: string,
    [IndicatorsFields.COMPETENCE]: CompetenceType,
};

export interface IndicatorProps extends WithStyles<typeof styles> {
    actions: IndicatorProgramActions;
    indicators: Array<IndicatorType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
}