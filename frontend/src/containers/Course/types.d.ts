import { fields } from './enum'
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
  [fields.CONTENT]: string,
  [fields.VISITORS_NUMBER]: number | null,
  [fields.RECORD_END_AT]: string | null,
  [fields.FINISHED_AT]: string | null,
}

export interface CourseActions {
  getCourse: any;
  setCourse: any;
}