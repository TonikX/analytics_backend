import {fields} from './enum';
import {withStyles} from '@mui/styles';
import styles from "./WorkProgram.styles";
import {ProfessionalStandardFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";

export interface ProfessionalStandardsActions {
    setLaborFunctions: any;
    getLaborFunctions: any;
    changeSearchQuery: any;
    getProfessionalStandards: any;
    setProfessionalStandards: any;
    createNewProfessionalStandard: any;
    changeProfessionalStandard: any;
    deleteProfessionalStandard: any;
    openDialog: any;
    closeDialog: any;
    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
    getProfessionalStandard: any;
    setProfessionalStandard: any;
    createProfessionalStandardAdditionalFields: any;
    updateProfessionalStandardAdditionalFields: any;
    deleteProfessionalStandardAdditionalFields: any;
}

export interface professionalStandardsState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.PROFESSIONAL_STANDARD_LIST]: Array<ProfessionalStandardsType>;
    [fields.PROFESSIONAL_STANDARD_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: ProfessionalStandardsType|{};
    };
    [fields.PROFESSIONAL_STANDARD]: any;
    [fields.LABOR_FUNCTIONS]: Array<any>;

}

export type ProfessionalStandardsType = {
    [ProfessionalStandardFields.ID]: number,
    [ProfessionalStandardFields.TITLE]: string,
    [ProfessionalStandardFields.NUMBER]: string,
    [ProfessionalStandardFields.CODE]: string,
    [ProfessionalStandardFields.NAME]: string,
};

export interface ProfessionalStandardsProps extends WithStyles<typeof styles> {
    actions: ProfessionalStandardsActions;
    professionalStandards: Array<ProfessionalStandardsType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
    professionalStandard: any;
}