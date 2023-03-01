import {ExpertisesFields, fields} from './enum';
import {WithStyles} from "@material-ui/core";
import styles from "./Expertises.styles";
import {SortingType} from "../../components/SortingButton/types";
import {WorkProgramGeneralType, WorkProgramStatusType} from "../WorkProgram/types";
import {UserType} from "../../layout/types";
import {CommentFields} from "./enum";

export interface ExpertisesActions {
    getComments: any;
    setComments: any;
    createComment: any;
    updateUnreadCommentStatus: any;

    changeSelectedStatus: any;
    changeSelectedQualification: any;
    changeSearchQuery: any;
    getExpertisesList: any;
    setExpertisesList: any;

    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;

    getExpertise: any;
    setExpertise: any;
    approveExpertise: any;
    sendExpertiseForRework: any;

    closeAddExpertModal: any;
    openAddExpertModal: any;

    addExpertToExpertise: any;
    removeExpertFromExpertise: any;
}

export interface expertisesState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.IS_OPEN_ADD_EXPERT_MODAL]: Boolean;
    [fields.SEARCH_QUERY]: string;
    [fields.EXPERTISES_LIST]: Array<ExpertiseType>;
    [fields.EXPERTISE]: ExpertiseType|{};
    [fields.SELECTED_STATUS]: WorkProgramStatusType|'';
    [fields.SELECTED_QUALIFICATION]: string;
    [fields.COMMENTS]: Array<CommentType>;
}

export interface ExpertisesProps extends WithStyles<typeof styles> {
    actions: ExpertisesActions;
    expertisesList: Array<any>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
    selectedStatus: WorkProgramStatusType | '';
}

export type ExpertiseType = {
    [ExpertisesFields.ID]: number;
    [ExpertisesFields.APPROVAL_DATE]: string;
    [ExpertisesFields.DATE_OF_LAST_CHANGE]: string;
    [ExpertisesFields.STATUS]: WorkProgramStatusType;
    [ExpertisesFields.EXPERTS]: Array<any>;
    [ExpertisesFields.EXPERTS_USERS_IN_RPD]: Array<ExpertUserInRPD>;
    [ExpertisesFields.WORK_PROGRAM]: WorkProgramGeneralType;
    [ExpertisesFields.PRACTICE]: any;
    [ExpertisesFields.GIA]: any;
}

export type ExpertUserInRPDType = {
    [ExpertisesFields.EXPERT]: UserType
}

export type CommentType = {
    [CommentFields.DATE]: string;
    [CommentFields.TEXT]: string;
    [CommentFields.ID]: number;
    [CommentFields.USER_EXPERTISE]: {
        [CommentFields.EXPERT]: UserType
    };
}