import {createAction} from "@reduxjs/toolkit"

import { CourseActions } from './types'

const getCourse = createAction('GET_COURSE')
const setCourse = createAction('SET_COURSE')

const actions: CourseActions = {
  getCourse,
  setCourse,
}

export default actions;