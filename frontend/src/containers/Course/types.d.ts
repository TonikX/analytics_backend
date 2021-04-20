import { fields, fieldsOfStudyFields, outcomeFields, topicFields, disciplineSectionFields, wpFields } from './enum'
import { CourseType } from '../Courses/types'

export interface courseState extends CourseType {
  [fields.EXPERTS_RATING]: number | null,
  [fields.HAS_CERTIFICATE]: boolean | null,
  [fields.CREDITS]: number | null,
  [fields.TOTAL_VISITORS_NUMBER]: number | null,
  [fields.CREATED_AT]: string | null,
  [fields.DURATION]: number | null,
  [fields.VOLUME]: number | null,
  [fields.INTENSITY_PER_WEEK]: number | null,
  [fields.LECTURES_NUMBER]: number | null,
  [fields.CONTENT]: string | null,
  [fields.VISITORS_NUMBER]: number | null,
  [fields.RECORD_END_AT]: string | null,
  [fields.FINISHED_AT]: string | null,
  [fields.FIELDS_OF_STUDY]: Array<fieldOfStudyType>,
  [fields.REQUIREMENTS]: string | null,
  [fields.OUTCOMES]: string | null,
  [fields.OUTCOMES_LIST]: Array<outcomeType>,
  [fields.TOPIC_WITH_ONLINE_COURSE]: Array<topicType>,
  [fields.COMPETENCES]: string | null,
}

export type fieldOfStudyType = {
  [fieldsOfStudyFields.ID]: number,
  [fieldsOfStudyFields.COURSE]: string,
  [fieldsOfStudyFields.FIELD_OF_STUDY]: {
    [fieldsOfStudyFields.FIELD_OF_STUDY_ID]: number,
    [fieldsOfStudyFields.NUMBER]: string,
    [fieldsOfStudyFields.TITLE]: string,
  },
}


export type outcomeType = {
  [outcomeFields.ID]: number,
  [outcomeFields.NAME]: string,
}

export type topicType = {
  [topicFields.ID]: number,
  [topicFields.NUMBER]: number,
  [topicFields.DISCIPLINE_SECTION]: disciplineSectionType,
}

export type disciplineSectionType = {
  [disciplineSectionFields.ID]: number,
  [disciplineSectionFields.NAME]: string,
  [disciplineSectionFields.WORK_PROGRAM]: wpType,
}

export type wpType = {
  [wpFields.ID]: number,
  [wpFields.TITLE]: string,
  [wpFields.AUTHORS]: string,
  [wpFields.QUALIFICATION]: string,
}

export interface CourseActions {
  getCourse: any;
  setCourse: any;
}