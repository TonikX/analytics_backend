export enum fetchingTypes{
    GET_FOLDERS = 'GET_FOLDERS',
    ADD_TO_FOLDER = 'ADD_TO_FOLDER',
    REMOVE_FROM_FOLDER = 'REMOVE_FROM_FOLDER',
    CREATE_FOLDER = 'CREATE_FOLDER',
    DELETE_FOLDER = 'DELETE_FOLDER',
}

export enum fields{
    FOLDERS = 'FOLDERS',
    ADD_FOLDER_DIALOG = 'ADD_FOLDER_DIALOG',
    ADD_TO_FOLDER_DIALOG = 'ADD_TO_FOLDER_DIALOG',
    IS_OPEN_DIALOG = 'IS_OPEN_DIALOG',
    DIALOG_DATA = 'DIALOG_DATA',
}

export enum FoldersFields{
    ID = 'id',
    NAME = 'name',
    DESCRIPTION = 'description',
    WORK_PROGRAM_IN_FOLDER = 'work_program_in_folder',
    ACADEMIC_PLAN_IN_FOLDER = 'academic_plan_in_folder',
    INDIVIDUAL_ACADEMIC_PLAN_IN_FOLDER = 'individual_implementation_of_academic_plan_in_folder',
    INDIVIDUAL_ACADEMIC_PLAN = 'individual_implementation_of_academic_plan',
    IMPLEMENTATION_OF_ACADEMIC_PLAN = 'implementation_of_academic_plan',
    BLOCK_MODULE_IN_FOLDER = 'block_module_in_folder',
    WORK_PROGRAM = 'work_program',
    ACADEMIC_PLAN = 'academic_plan',
    BLOCK_MODULE = 'block_module',
    WORK_PROGRAM_RATING = 'work_program_rating',
    ACADEMIC_PLAN_RATING = 'academic_plan_rating',
    BLOCK_MODULE_RATING = 'block_module_plan_rating',
    INDIVIDUAL_ACADEMIC_PLAN_RATING = 'route_rating',
    COMMENT = 'comment',
}

export enum FavoriteType{
    WORK_PROGRAM = 'WORK_PROGRAM',
    ACADEMIC_PLAN = 'ACADEMIC_PLAN',
    TRAJECTORY_PLAN = 'TRAJECTORY_PLAN',
    MODULES = 'MODULES',
}