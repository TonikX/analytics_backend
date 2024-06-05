import {createLogic} from "redux-logic";
import get from 'lodash/get';

import selectEducationalProgramActions from './actions'
import actions from '../../layout/actions'
import {service} from './service'

import {ProfessionType} from './types'
import {fetchingTypes} from './enum'
import { rootState } from '../../store/reducers'

import {getQualification, getSelectedEducationalPrograms, getSelectedProfessions} from "./getters";

const getProfessions = createLogic({
  type: selectEducationalProgramActions.getProfessions.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_PROFESSIONS}))
    service.getProfessions()
      .then((res) => {
        dispatch(selectEducationalProgramActions.setProfessions(get(res, 'data', [])))
        dispatch(actions.fetchingSuccess())
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err))
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_PROFESSIONS}))
        return done()
      })
  }
})

const getEducationalPrograms = createLogic({
  type: selectEducationalProgramActions.getEducationalPrograms.type,
  latest: true,
  process({ getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_EDUCATIONAL_PROGRAMS}))
    const state: rootState = getState()

    const professionsIds = getSelectedProfessions(state).map((p: ProfessionType) => p.id);
    const qualification = getQualification(state);

    service.getEducationalPrograms(professionsIds, qualification)
      .then((res: any) => {
        dispatch(selectEducationalProgramActions.setEducationalPrograms(get(res, 'data', [])))
        dispatch(actions.fetchingSuccess())
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err))
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_EDUCATIONAL_PROGRAMS}))
        return done()
      })
  }
})

const savePrograms = createLogic({
  type: selectEducationalProgramActions.savePrograms.type,
  latest: true,
  process({ getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_EDUCATIONAL_PROGRAMS}))
    const state: rootState = getState()

    const selectedPrograms = getSelectedEducationalPrograms(state);

    service.savePrograms(selectedPrograms)
      .then((res: any) => {
        dispatch(selectEducationalProgramActions.resetSelectedPrograms());
        dispatch(actions.fetchingSuccess(['Программы успешно сохранены!']));
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_EDUCATIONAL_PROGRAMS}));
        return done()
      })
  }
})

export default [getProfessions, getEducationalPrograms, savePrograms]
