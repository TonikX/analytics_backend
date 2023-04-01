import {fields} from './enum';
import {withStyles} from '@mui/styles';
import styles from "./WorkProgram.styles";
import {EntityToEntityFields} from './enum';
import {SortingType} from "../../components/SortingButton/types";
import {TrainingEntitityType} from "../TrainingEntities/types";

export interface EntityToEntityActions {
    changeSearchQuery: any;
    getEntityToEntityList: any;
    setEntityToEntityList: any;
    createNewEntityToEntity: any;
    changeEntityToEntity: any;
    deleteEntityToEntity: any;
    openDialog: any;
    closeDialog: any;
    changeCurrentPage: any;
    changeAllCount: any;
    changeSorting: any;
    changeSubjectId: any;
}

export interface entityToEntityState {
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: {[key]: string};
    [fields.SUBJECT_ID]: number|null;
    [fields.ENTITY_TO_ENTITY_LIST]: Array<EntityToEntityType>;
    [fields.ENTITY_TO_ENTITY_LIST_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: EntityToEntityType|{};
    };
}

export type EntityToEntityType = {
    [EntityToEntityFields.ID]: number,
    [EntityToEntityFields.ITEM1]: TrainingEntitityType,
    [EntityToEntityFields.ITEM2]: TrainingEntitityType,
    [EntityToEntityFields.RELATION]: string,
};

export interface EntityToEntityProps extends WithStyles<typeof styles> {
    actions: EntityToEntityActions;
    trainingEntities: Array<EntityToEntityType>;
    currentPage: number;
    searchQuery: string;
    allCount: number;
    sortingField: string;
    sortingMode: SortingType;
}