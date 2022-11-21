import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {WithStyles} from "@material-ui/core";

import {SortingType} from "../../../components/SortingButton/types";

import {mapStateToProps, mapDispatchToProps} from "./TrainingModules.connect";
import {TrainingModuleFields, fields} from './enum';
import {DirectionType} from "../../Direction/types";

import styles from "./TrainingModules.styles";
import {UserType} from '../../../layout/types';
import {EvaluationToolType, IntermediateCertificationType} from "../../WorkProgram/types";

export interface TrainingModulesActions {
    getTrainingModulesList: ActionCreatorWithoutPayload;
    setTrainingModulesList: ActionCreatorWithPayload;
    getTrainingModule: ActionCreatorWithPayload<GetTrainingModulePayload>;
    setTrainingModule: ActionCreatorWithPayload;
    updateTrainingModuleFilters: ActionCreatorWithPayload;

    changeSearchQuery: ActionCreatorWithPayload;
    changeCurrentPage: ActionCreatorWithPayload;
    changeAllCount: ActionCreatorWithPayload;
    changeSorting: ActionCreatorWithPayload;
    changeTrainingModuleEducationalPrograms: ActionCreatorWithPayload;

    deleteIntermediateCertification: ActionCreatorWithPayload;
    addIntermediateCertification: ActionCreatorWithPayload;
    changeIntermediateCertification: ActionCreatorWithPayload;
    getIntermediateCertification: ActionCreatorWithPayload;

    openDialog: ActionCreatorWithPayload<OpenDialogPayload>;
    closeDialog: ActionCreatorWithoutPayload;

    createTrainingModule: ActionCreatorWithPayload<CreateTrainingModulePayload>;
    changeTrainingModule: ActionCreatorWithPayload<ChangeTrainingModulePayload>;
    deleteTrainingModule: ActionCreatorWithPayload;
    changeFiltering: ActionCreatorWithPayload;

    showOnlyMy: ActionCreatorWithPayload<boolean>;
    removeFatherFromModule: ActionCreatorWithPayload<number>;
    updateChildModules: ActionCreatorWithPayload;

    changeEditorList: ActionCreatorWithPayload;
}

export type OpenDialogPayload = {
    data: TrainingModuleType|{};
    dialog: fields.CREATE_TRAINING_MODULE_DIALOG | fields.EVALUATION_MODULE_DIALOG | fields.ADD_TRAINING_MODULE_DIALOG | fields.ADD_EDUCATIONAL_PROGRAM_DIALOG
}

export type CreateTrainingModulePayload = {
    data: {
        [TrainingModuleFields.NAME]: string;
        [TrainingModuleFields.DESCRIPTION]: string;
    };
}

export type GetTrainingModulePayload = {
    id: number;
}

export type ChangeTrainingModulePayload = {
    data: TrainingModuleType
}

export interface trainingModulesState {
    [fields.DETAIL_TRAINING_MODULE]: TrainingModuleType|{};
    [fields.TRAINING_MODULES_LIST]: Array<TrainingModuleType>;
    [fields.SORTING]: {
        [fields.SORTING_FIELD]: string,
        [fields.SORTING_MODE]: SortingType;
    };
    [fields.FILTERS]: {
        [fields.FILTER_ID]: string,
        [fields.FILTER_MODULE_ISU_ID]: string,
        [fields.FILTER_MODULE_DISCIPLINE_NAME]: string,
        [fields.FILTER_MODULE_NAME]: string,
        [fields.FILTER_MODULE_AVAILABLE_FOR_ALL]: boolean,
    },
    [fields.ALL_COUNT]: number;
    [fields.CURRENT_PAGE]: number;
    [fields.SEARCH_QUERY]: string;
    [fields.CREATE_TRAINING_MODULE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: TrainingModuleType|{};
    };
    [fields.EVALUATION_MODULE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean,
        [fields.DIALOG_DATA]: IntermediateCertificationType|{};
    },
    [fields.EVALUATION_DESCRIPTION_MODULE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean,
        [fields.DIALOG_DATA]: string
    },
    [fields.ADD_EDUCATIONAL_PROGRAM_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean,
    },
    [fields.ADD_TRAINING_MODULE_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean,
        [fields.DIALOG_DATA]: {
            trainingModules: Array<number>,
            moduleId: number
        }
    },
    [fields.SHOW_ONLY_MY]: boolean;
}

export interface TrainingModulesProps extends WithStyles<typeof styles>, PropsFromRedux, ActionsFromRedux{}

export type PropsFromRedux = ReturnType<mapStateToProps>;
export type ActionsFromRedux = ReturnType<mapDispatchToProps>;

export type TrainingModuleType = {
    [TrainingModuleFields.ID]: number;
    [TrainingModuleFields.NAME]: string;
    [TrainingModuleFields.DESCRIPTION]: string;
    [TrainingModuleFields.TYPE]: string;
    [TrainingModuleFields.ISU_ID]: string;
    [TrainingModuleFields.DISCIPLINE]: {
        [TrainingModuleFields.ACADEMIC_PLAN]: {
            [TrainingModuleFields.EDUCATIONAL_PROFILE]: string;
            [TrainingModuleFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY]: Array<{[TrainingModuleFields.FIELD_OF_STUDY]: DirectionType}>;
        }
    };
    [TrainingModuleFields.EDITORS]: Array<UserType>;
    [TrainingModuleFields.CAN_EDIT]: boolean;
    [TrainingModuleFields.CAN_EDIT]: boolean;
    [TrainingModuleFields.CERTIFICATION_EVALUATION_LIST]?: IntermediateCertificationType[];
}
