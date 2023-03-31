import {fields} from './enum';
import {WithStyles} from "@mui/material";
import styles from "./WorkProgram.styles";
import {TrainingEntitiesFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";
import {SubjectAreaType} from "../SubjectArea/types";

export interface TrainingEntitiesActions {
    changeSearchQuery: any;
    getTrainingEntities: any;
    setTrainingEntities: any;
    createNewTrainingEntities: any;
    changeTrainingEntities: any;
    deleteTrainingEntities: any;
    openDialog: any;
    closeDialog: any;
    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
    changeSubjectId: any;
}

export interface trainingEntitiesState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.SUBJECT_ID]: number|null;
    [fields.TRAINING_ENTITIES_LIST]: Array<TrainingEntitityType>;
    [fields.TRAINING_ENTITIES_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: TrainingEntitityType|{};
    };
}

export type TrainingEntitityType = {
    [TrainingEntitiesFields.ID]: number,
    [TrainingEntitiesFields.TITLE]: string,
    [TrainingEntitiesFields.SUBJECT_AREA]: SubjectAreaType,
};

export interface TrainingEntitiesProps extends WithStyles<typeof styles> {
    actions: TrainingEntitiesActions;
    trainingEntities: Array<TrainingEntitityType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
}