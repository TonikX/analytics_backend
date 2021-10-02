import {fields} from './enum';
import {WithStyles} from "@material-ui/core";
import styles from "./Personalities.styles";
import {PersonalityFields, PersonalitySortingFields, GroupFields, filterFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";

export interface PersonalitiesActions {
    changeSearchQuery: any;
    getPersonalities: any;
    setPersonalities: any;
    createNewPersonality: any;
    changePersonality: any;
    deletePersonality: any;
    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
    changeFiltering: any;
    changeFilterSearchQuery: any;
}

export interface personalitiesState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.FILTERING]: filteringType,
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.PERSONALITIES_LIST]: Array<PersonalityType>
}

export type filteringType = {
    [filterFields.FILTERING_SEARCH_QUERY]: string,
    [filterFields.FILTERING_GROUPS]: string
}

export type PersonalityType = {
    [PersonalityFields.ID]: number | undefined,
    [PersonalityFields.EMAIL]: string,
    [PersonalityFields.FIRST_NAME]: string,
    [PersonalityFields.LAST_NAME]: string,
    [PersonalityFields.USERNAME]: string,
    [PersonalityFields.GROUPS]: Array<groupType> | [],
    [PersonalityFields.ISU_NUMBER]: number | string
}

export type groupType = {
    [GroupFields.ID]: number | undefined,
    [GroupFields.NAME]: string,
    [GroupFields.PERMISIIONS]: Array<number>
}

export interface PersonalitiesProps extends WithStyles<typeof styles>{
    actions: PersonalitiesActions;
    personalities: Array<PersonalityType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
}