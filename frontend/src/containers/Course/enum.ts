export enum steps {
  GENERAL = 'Главная',
  CONTENT = 'Содержание',
  CURRENT_SESSION = 'Текущая сессия',
  PREP_DIRECTION = 'Направления подготовки',
  REQUIREMENTS = 'Требования',
  COMPETENCES = 'Формируемые компетенции',
  RESULTS = 'Результаты',
  WORK_PROGRAMS = 'Связанные с курсом РПД'
}

export enum fields {
  ID = 'id',
  TITLE = 'title',
  DESCRIPTION = 'description',
  COURSE_URL = 'external_url',
  PLATFORM = 'platform',
  INSTITUTION = 'institution',
  LANGUAGE = 'language',
  STARTED_AT = 'started_at',
  RATING = 'rating',
  EXPERTS_RATING = 'experts_rating',
  HAS_CERTIFICATE = 'has_certificate',
  CREDITS = 'credits',
  TOTAL_VISITORS_NUMBER = 'total_visitors_number',
  VISITORS_NUMBER = 'visitors_number',
  CREATED_AT = 'created_at',
  DURATION = 'duration',
  VOLUME = 'volume',
  INTENSITY_PER_WEEK = 'intensity_per_week',
  PLATFORMS = 'platforms',
  INSTITUTIONS = 'institutions',
  LECTURES_NUMBER = 'lectures_number',
  CONTENT = 'content',
  RECORD_END_AT = 'record_end_at',
  FINISHED_AT = 'finished_at',
  FIELDS_OF_STUDY = 'course_field_of_study',
  REQUIREMENTS = 'requirements',
  OUTCOMES = 'learning_outcome',
  OUTCOMES_LIST = 'learning_outcome_list',
  TOPIC_WITH_ONLINE_COURSE = 'topic_with_online_course',
  COMPETENCES = 'competences',
}

export enum fetchingTypes {
  GET_COURSE = 'GET_COURSE',
  GET_PLATFORMS = 'GET_PLATFORMS1',
  GET_INSTITUTIONS = 'GET_INSTITUTIONS1',
}

export enum fieldsOfStudyFields {
  ID = 'id',
  COURSE = 'course',
  FIELD_OF_STUDY = 'field_of_study',
  NUMBER = 'number',
  TITLE = 'title',
  FIELD_OF_STUDY_ID = 'id',
}


export enum outcomeFields {
  ID = 'id',
  NAME = 'name',
}

export enum topicFields {
  ID = 'id',
  NUMBER = 'number',
  DESCRIPTION = 'description',
  DISCIPLINE_SECTION = 'discipline_section',
}

export enum disciplineSectionFields {
  ID = 'id',
  NAME = 'name',
  WORK_PROGRAM = 'work_program',
}

export enum wpFields {
  ID = 'id',
  TITLE = 'title',
  AUTHORS = 'authors',
  QUALIFICATION = 'qualification',
}
