import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {courseState} from "./types";

export const GENERAL_PATH = 'course';

export const initialState: courseState = {
  [fields.ID]: null,
  [fields.DESCRIPTION]: '',
  [fields.TITLE]: '',
  [fields.PLATFORM_ID]: '',
  [fields.INSTITUTION_ID]: '',
  [fields.COURSE_URL]: '',
  [fields.LANGUAGE]: '',
  [fields.STARTED_AT]: '',
  [fields.RATING]: null,
  [fields.EXPERTS_RATING]: null,
  [fields.HAS_CERTIFICATE]: null,
  [fields.CREDITS]: null,
  [fields.TOTAL_VISITORS_NUMBER]: null,
  [fields.CREATED_AT]: '',
  [fields.DURATION]: null,
  [fields.VOLUME]: null,
  [fields.INTENSITY_PER_WEEK]: null,
  [fields.PLATFORMS]: [],
  [fields.INSTITUTIONS]: [],
};

const setCourse = (state: courseState, {payload}: any): courseState => ({
  ...state,
  ...payload,
});

const setPlatforms1 = (state: courseState, {payload}: any): courseState => ({
  ...state,
  ...payload,
});

const setInstitutions1 = (state: courseState, {payload}: any): courseState => ({
  ...state,
  ...payload,
});
export const reducer = createReducer(initialState, {
  [actions.setCourse.type]: setCourse,
  [actions.setInstitutions1.type]: setInstitutions1,
  [actions.setPlatforms1.type]: setPlatforms1,
    // [actions.setCourses.type]: setCourses,
    // [actions.openDialog.type]: openDialog,
    // [actions.closeDialog.type]: closeDialog,
    // [actions.changeSearchQuery.type]: changeSearchQuery,
    // [actions.changeCurrentPage.type]: changeCurrentPage,
    // [actions.changeAllCount.type]: changeAllCount,
    // [actions.changeSorting.type]: changeSorting,
    // [actions.setPlatforms.type]: setPlatforms,
    // [actions.setInstitutions.type]: setInstitutions,
});