import {AcademicPlanUpdateLogFields, fields, SchedulerConfigurationFields, UpdatedAcademicPlanFields} from './enum';
import {WithStyles} from '@mui/styles';
import styles from "./WorkProgram.styles";
import {SortingType} from "../../components/SortingButton/types";

export interface AcademicPlanUpdateActions {
    updateAcademicPlansFrom2023: any,
    updateSchedulerConfiguration: any,
    setSchedulerConfiguration: any,
    getSchedulerConfiguration: any,
    updateAcademicPlanConfiguration: any,
    updateAcademicPlanOver23: any,
    createNewAcademicPlanUpdateConfiguration: any,
    openDialog: any,
    closeDialog: any;
    updateAcademicPlans: any;
    getAcademicPlansExcel: any;
    getUpdatedAcademicPlans: any;
    getAcademicPlanUpdateLogs: any;
    setAcademicPlanUpdateLogs: any;
    setUpdatedAcademicPlans: any;
    logsChangeSearchQuery: any;
    logsChangeCurrentPage: any;
    logsChangeAllCount: any;
    logsChangeSorting: any;
    updatedPlansChangeSearchQuery: any;
    updatedPlansChangeCurrentPage: any;
    updatedPlansChangeAllCount: any;
    updatedPlansChangeSorting: any;
}

export interface academicPlanUpdateState {
    [fields.LOGS_SORTING]: {
        [fields.LOGS_SORTING_FIELD]: string,
        [fields.LOGS_SORTING_MODE]: SortingType
    },
    [fields.UPDATED_PLANS_SORTING]: {
        [fields.UPDATED_PLANS_SORTING_FIELD]: string,
        [fields.UPDATED_PLANS_SORTING_MODE]: SortingType
    },
    [fields.LOGS_CURRENT_PAGE]: number,
    [fields.UPDATED_PLANS_CURRENT_PAGE]: number,
    [fields.LOGS_ALL_COUNT]: number,
    [fields.UPDATED_PLANS_ALL_COUNT]: number,
    [fields.LOGS_SEARCH_QUERY]: string,
    [fields.UPDATED_PLANS_SEARCH_QUERY]: string,

    [fields.SCHEDULER_CONFIGURATION]: SchedulerConfigurationType;
    [fields.ACADEMIC_PLAN_UPDATE_LOG_LIST]: Array<AcademicPlanUpdateLogType>;
    [fields.UPDATED_ACADEMIC_PLANS_LIST]: Array<UpdatedAcademicPlanType>;
    [fields.UPDATED_ACADEMIC_PLANS_DIALOG]: {
        [fields.IS_OPEN_DIALOG]: boolean;
        [fields.DIALOG_DATA]: {};
    };
}

export type SchedulerConfigurationType = {
    [SchedulerConfigurationFields.DAYS_INTERVAL]: number;
    [SchedulerConfigurationFields.EXECUTION_HOURS]: number;
}


export type AcademicPlanUpdateLogType = {
    [AcademicPlanUpdateLogFields.ID]: number;
    [AcademicPlanUpdateLogFields.ACADEMIC_PLAN_ID]: number;
    [AcademicPlanUpdateLogFields.OBJECT_TYPE]: string;
    [AcademicPlanUpdateLogFields.FIELD_NAME]: string;
    [AcademicPlanUpdateLogFields.OLD_VALUE]: string;
    [AcademicPlanUpdateLogFields.NEW_VALUE]: string;
    [AcademicPlanUpdateLogFields.UPDATED_DATE_TIME]: string;
};

export type UpdatedAcademicPlanType = {
    [UpdatedAcademicPlanFields.ID]: number;
    [UpdatedAcademicPlanFields.ACADEMIC_PLAN_ID]: number;
    [UpdatedAcademicPlanFields.ACADEMIC_PLAN_TITLE]: string;
    [UpdatedAcademicPlanFields.UPDATED_DATE_TIME]: string;
    [UpdatedAcademicPlanFields.UPDATES_ENABLED]: boolean;
    [UpdatedAcademicPlanFields.OVER_23]: boolean;
};

export interface AcademicPlanUpdateProps extends WithStyles<typeof styles> {
    actions: AcademicPlanUpdateActions;
    academicPlanUpdateLogs: Array<AcademicPlanUpdateLogType>;
    updatedAcademicPlans: Array<UpdatedAcademicPlanType>;
    schedulerConfiguration: SchedulerConfigurationType;

    logsCurrentPage: number;
    logsSearchQuery: string;
    logsAllCount: number;
    logsSortingField: string;
    logsSortingMode: SortingType;

    updatedPlansCurrentPage: number;
    updatedPlansSearchQuery: string;
    updatedPlansAllCount: number;
    updatedPlansSortingField: string;
    updatedPlansSortingMode: SortingType;
}
