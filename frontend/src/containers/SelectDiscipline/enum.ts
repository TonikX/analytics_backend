export enum fields {
   ALL_KEYWORDS = 'ALL_KEYWORDS',
   SELECTED_KEYWORDS = 'SELECTED_KEYWORDS',
   SELECTED_SEMESTER = 'SELECTED_SEMESTER',
   SELECTED_QUALIFICATION = 'SELECTED_QUALIFICATION',
   WORK_PROGRAMS = 'WORK_PROGRAMS',
}

export enum workProgramFields {
   ID = 'id',
   DISCIPLINE_CODE = 'discipline_code',
   TITLE = 'title',
}

export enum fetchingTypes {
   GET_KEYWORDS = 'GET_KEYWORDS',
   GET_WORK_PROGRAMS = 'GET_WORK_PROGRAMS',
   GET_CORRECT_WORK_PROGRAMS = 'GET_CORRECT_WORK_PROGRAMS',
}

export enum qualificationEnum {
   BACHELOR = 'Академический бакалавр',
   MASTER = 'Магистр',
}

export enum wpTypeEnum {
   REQUIRED = 'Required',
   FACULTATIV = 'Facultativ',
}
