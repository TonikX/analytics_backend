import createReducer from "../../store/createReducer";
import {fields} from './enum';
import actions from "./actions";

import {courseState} from "./types";

export const GENERAL_PATH = 'course';

export const initialState: courseState = {
  [fields.ID]: undefined,
  [fields.DESCRIPTION]: '',
  [fields.TITLE]: '',
  [fields.PLATFORM]: {},
  [fields.INSTITUTION]: {},
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
};

const setCourse = (state: courseState, {payload}: any): courseState => ({
  ...state,
  ...payload,
});

export const reducer = createReducer(initialState, {
  [actions.setCourse.type]: setCourse,
});