import {fields} from './enum';
import {WithStyles} from '@mui/styles';
import styles from "./WorkProgram.styles";
import {EducationalStandardFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";
import {CompetenceTableType} from "./enum";

export interface educationalStandardsState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.EDUCATIONAL_STANDARD_LIST]: Array<EducationalStandardType>;
    [fields.EDUCATIONAL_STANDARD_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: EducationalStandardType|{};
    };
    [fields.EDUCATIONAL_STANDARD]: any;

}

export type EducationalStandardType = {
    [EducationalStandardFields.ID]: number,
    [EducationalStandardFields.TITLE]: string,
    [EducationalStandardFields.YEAR]: string,
};

export interface EducationalStandardsProps extends WithStyles<typeof styles> {
    actions: any;
    educationalStandards: Array<EducationalStandardType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
}

export type EducationalStandardCreateGroupActionType = {
    name: string;
    type: CompetenceTableType;
}

export type EducationalStandardAddCompetenceActionType = {
    groupId: number;
    competenceId: number;
    type: CompetenceTableType;
}

export type EducationalStandardAddIndicatorActionType = {
    indicatorId: Array<number>;
    competenceId: number;
    type: CompetenceTableType;
}
export type EducationalStandardDeleteCompetenceActionType = {
    competenceId: number;
    type: CompetenceTableType;
}

export type EducationalStandardDeleteIndicatorActionType = {
    indicatorId: number;
    type: CompetenceTableType;
}

export type EducationalStandardDeleteGroupActionType = {
    groupId: number;
    type: CompetenceTableType;
}

export type EducationalStandardSaveGroupTitleActionType = {
    title: string;
    groupId: number;
    type: CompetenceTableType;
}
