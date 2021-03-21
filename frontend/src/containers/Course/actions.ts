import {createAction} from "@reduxjs/toolkit";

import { CourseActions } from './types'

const getCourse = createAction('GET_COURSE');
const setCourse = createAction('SET_COURSE');

const getPlatforms1 = createAction('GET_PLATFORMS1');
const setPlatforms1 = createAction('GET_PLATFORMS1');

const getInstitutions1 = createAction('GET_INSTITUTIONS1')
const setInstitutions1 = createAction('SET_INSTITUTIONS1')

const actions: CourseActions = {
  getCourse,
  setCourse,
  getPlatforms1,
  setPlatforms1,
  getInstitutions1,
  setInstitutions1,
}

export default actions;