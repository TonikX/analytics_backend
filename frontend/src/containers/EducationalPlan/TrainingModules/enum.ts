export enum fields {
    TRAINING_MODULES_LIST = 'TRAINING_MODULES_LIST',
    DETAIL_TRAINING_MODULE = 'DETAIL_TRAINING_MODULE',
    SEARCH_QUERY = 'SEARCH_QUERY',
    CURRENT_PAGE = 'CURRENT_PAGE',
    ALL_COUNT = 'ALL_COUNT',
    SORTING = 'SORTING',
    SORTING_FIELD = 'SORTING_FIELD',
    SORTING_MODE = 'SORTING_MODE',
    CREATE_TRAINING_MODULE_DIALOG = 'CREATE_TRAINING_MODULE_DIALOG',
    IS_OPEN_DIALOG = 'IS_OPEN_DIALOG',
    DIALOG_DATA = 'DIALOG_DATA',
    SHOW_ONLY_MY = 'SHOW_ONLY_MY',
    EVALUATION_MODULE_DIALOG = 'EVALUATION_MODULE_DIALOG',
    EVALUATION_DESCRIPTION_MODULE_DIALOG = 'EVALUATION_DESCRIPTION_MODULE_DIALOG',
    ADD_TRAINING_MODULE_DIALOG = 'ADD_TRAINING_MODULE_DIALOG',
    ADD_EDUCATIONAL_PROGRAM_DIALOG = 'ADD_EDUCATIONAL_PROGRAM_DIALOG',
    FILTERS = 'FILTERS',
    FILTER_ID = 'FILTER_ID',
    FILTER_MODULE_ISU_ID = 'FILTER_MODULE_ISU_ID',
    FILTER_MODULE_NAME = 'FILTER_MODULE_NAME',
    FILTER_MODULE_DISCIPLINE_NAME = 'FILTER_MODULE_DISCIPLINE_NAME',
    FILTER_MODULE_AVAILABLE_FOR_ALL = 'FILTER_MODULE_AVAILABLE_FOR_ALL',
}

export enum fetchingTypes {
    GET_TRAINING_MODULE = 'GET_TRAINING_MODULE',
    GET_TRAINING_MODULES = 'GET_TRAINING_MODULES',
    CREATE_TRAINING_MODULE = 'CREATE_TRAINING_MODULE',
    CHANGE_TRAINING_MODULE = 'CHANGE_TRAINING_MODULE',
    DELETE_TRAINING_MODULE = 'DELETE_TRAINING_MODULE',
    ADD_INTERMEDIATE_CERTIFICATION = 'ADD_INTERMEDIATE_CERTIFICATION',
    CHANGE_INTERMEDIATE_CERTIFICATION = 'CHANGE_INTERMEDIATE_CERTIFICATION',
    DELETE_INTERMEDIATE_CERTIFICATION = 'DELETE_INTERMEDIATE_CERTIFICATION',
    GET_INTERMEDIATE_CERTIFICATION = 'GET_INTERMEDIATE_CERTIFICATION',
}

export enum TrainingModuleFields {
    ID = 'id',
    NAME = 'name',
    DESCRIPTION = 'description',
    DISCIPLINE = 'descipline_block',
    ACADEMIC_PLAN = 'academic_plan',
    EDUCATIONAL_PROFILE = 'educational_profile',
    ACADEMIC_PLAN_IN_FIELD_OF_STUDY = 'academic_plan_in_field_of_study',
    FIELD_OF_STUDY = 'field_of_study',
    TYPE = 'type',
    EDITORS = 'editors',
    CAN_EDIT = 'can_edit',
    ISU_ID = 'module_isu_id',
    SELECTION_RULE = 'selection_rule',
    SELECTION_PARAMETER = 'selection_parameter',
    CERTIFICATION_EVALUATION_LIST = 'certification_evaluation_tools',
}

export enum StepsEnum {
    GENERAL = 0,
    MODULES = 1,
    PLANS = 2,
    EVALUATION_TOOLS = 3,
}