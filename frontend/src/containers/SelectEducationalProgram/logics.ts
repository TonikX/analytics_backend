import {createLogic} from "redux-logic";

import selectEducationalProgramActions from './actions'
import actions from '../../layout/actions'
import {service} from './service'

import {ProfessionType} from './types'
import {fetchingTypes} from './enum'

const getProfessions = createLogic({
  type: selectEducationalProgramActions.getProfessions.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_PROFESSIONS}))
    service.getProfessions()
      .then((res) => {
        dispatch(selectEducationalProgramActions.setProfessions(res.data
          .map((p: ProfessionType) => ({
            id: p.id, 
            title: p.title,
            })
          )))
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

export default [getProfessions]