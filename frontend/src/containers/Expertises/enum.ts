export enum fields {
    EXPERTISES_LIST = 'EXPERTISES_LIST',
    EXPERTISE = 'EXPERTISE',
    SEARCH_QUERY = 'SEARCH_QUERY',
    CURRENT_PAGE = 'CURRENT_PAGE',
    ALL_COUNT = 'ALL_COUNT',
    SORTING = 'SORTING',
    SORTING_FIELD = 'SORTING_FIELD',
    SORTING_MODE = 'SORTING_MODE',
    IS_OPEN_ADD_EXPERT_MODAL = 'IS_OPEN_ADD_EXPERT_MODAL',
    SELECTED_STATUS = 'SELECTED_STATUS',
}

export enum fetchingTypes {
    GET_EXPERTISES = 'GET_EXPERTISES',
    GET_EXPERTISE = 'GET_EXPERTISE',
    ADD_EXPERT_TO_EXPERTISE = 'ADD_EXPERT_TO_EXPERTISE',
    REMOVE_EXPERT_FROM_EXPERTISE = 'REMOVE_EXPERT_FROM_EXPERTISE',
    APPROVE_EXPERTISE = 'APPROVE_EXPERTISE',
    SEND_WP_FOR_REWORK = 'SEND_WP_FOR_REWORK',
}

export enum UserExpertResultEnum {
    APPROVED = 'AP',
    REWORK = 'RE',
}

export const UserExpertResult = {
    [UserExpertResultEnum.APPROVED]: 'Одобрено',
    [UserExpertResultEnum.REWORK]: 'Отправлено на доработку',
}

export enum ExpertisesFields {
    ID = 'id',
    APPROVAL_DATE = 'approval_date',
    DATE_OF_LAST_CHANGE = 'date_of_last_change',
    STATUS = 'expertise_status',
    EXPERTS = 'experts',
    EXPERT = 'expert',
    EXPERTS_USERS_IN_RPD = 'expertse_users_in_rpd',
    WORK_PROGRAM = 'work_program',
    EXPERT_RESULT = 'expert_result',
    USER_EXPERTISE_STATUS = 'user_expertise_status',
}
