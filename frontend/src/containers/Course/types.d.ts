import { fields } from './enum'

export interface courseState {
  [fields.ID]: any,
  [fields.DESCRIPTION]: any,
  [fields.TITLE]: any,
  [fields.PLATFORM_ID]: any,
  [fields.INSTITUTION_ID]: any,
  [fields.COURSE_URL]: any,
  [fields.LANGUAGE]: any,
  [fields.STARTED_AT]: any,
  [fields.RATING]: any,
  [fields.EXPERTS_RATING]: any,
  [fields.HAS_CERTIFICATE]: any,
  [fields.CREDITS]: any,
  [fields.TOTAL_VISITORS_NUMBER]: any,
  [fields.CREATED_AT]: any,
  [fields.DURATION]: any,
  [fields.VOLUME]: any,
  [fields.INTENSITY_PER_WEEK]: any,
  [fields.PLATFORMS]: any,
  [fields.INSTITUTIONS]: any,
}

export interface CourseActions {
  getCourse: any;
  setCourse: any;
  getPlatforms1: any;
  setPlatforms1: any;
  getInstitutions1: any;
  setInstitutions1: any;
}