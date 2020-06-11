import {fields} from './enum';
import {WithStyles} from "@material-ui/core";
import styles from "./WorkProgram.styles";
import {EducationalProgramFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";

export interface EducationalProgramActions {
    changeSearchQuery: any;
    getEducationalProgram: any;
    setEducationalProgram: any;
    createNewEducationalProgram: any;
    changeEducationalProgram: any;
    deleteEducationalProgram: any;
    openDialog: any;
    closeDialog: any;
    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
}

export interface educationalProgramState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.EDUCATIONAL_PROGRAM_LIST]: Array<EducationalProgramType>;
    [fields.EDUCATIONAL_PROGRAM_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: EducationalProgramType|{};
    };
}

export type EducationalProgramType = {
    [EducationalProgramFields.ID]: number,
    [EducationalProgramFields.TITLE]: string,
    [EducationalProgramFields.NUMBER]: string,
    [EducationalProgramFields.QUALIFICATION]: string,
    [EducationalProgramFields.EDUCATIONAL_PROFILE]: string,
    [EducationalProgramFields.FACULTY]: string,
    [EducationalProgramFields.EDUCATION_FORM]: string,
};

export interface EducationalProgramProps extends WithStyles<typeof styles> {
    actions: EducationalProgramActions;
    educationalProgram: Array<EducationalProgramType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
}