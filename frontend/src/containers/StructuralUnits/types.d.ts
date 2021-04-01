import {fields} from './enum';
import {WithStyles} from "@material-ui/core";
import styles from "./WorkProgram.styles";
import {structuralUnitFields, structuralUnitUserFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";
import {UserType} from "../../layout/types";

export interface StructuralUnitsActions {
    changeSearchQuery: any;
    getStructuralUnits: any;
    setStructuralUnits: any;
    createNewStructuralUnit: any;
    changeStructuralUnit: any;
    deleteStructuralUnit: any;
    openDialog: any;
    closeDialog: any;
    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
    getStructuralUnit: any;
    setStructuralUnit: any;
    addUserToStructuralUnit: any;
    removeUserFromStructuralUnit: any;
    changeUserFromStructuralUnit: any;
}

export interface StructuralUnitProps {

}

export interface structuralUnitsState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.STRUCTURAL_UNIT]: {}|structuralUnitType;
    [fields.STRUCTURAL_UNIT_LIST]: Array<tructuralUnitType>;
    [fields.STRUCTURAL_UNIT_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: structuralUnitType|{};
    };
}

export type structuralUnitType = {
    [structuralUnitFields.ID]: number,
    [structuralUnitFields.TITLE]: string,
    [structuralUnitFields.USERS]: Array<structuralUnitUserType>,
};
export type structuralUnitUserType = {
    [structuralUnitUserFields.ID]: number,
    [structuralUnitUserFields.STRUCTURAL_UNIT]: string,
    [structuralUnitUserFields.USER]: UserType,
    [structuralUnitUserFields.STATUS]: string,
};

export interface StructuralUnitsProps extends WithStyles<typeof styles> {
    actions: StructuralUnitsActions;
    structuralUnits: Array<structuralUnitType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
}