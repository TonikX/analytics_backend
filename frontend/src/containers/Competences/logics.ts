import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import competencesActions from './actions';

import Service from './service';

import {fetchingTypes} from "./enum";
import {
  getCurrentPage,
  getSearchQuery,
  getSortingField,
  getSortingMode,
  getSearchCodeQuery,
  getFilterOnlyWithStandard,
  getFilterAcademicPlan
} from "./getters";
import {IndicatorsFields} from "../Indicators/enum";

const service = new Service();

const getCompetences = createLogic({
  type: competencesActions.getCompetences.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const state = getState();

    const competenceType = action.payload;

    const currentPage = getCurrentPage(state);
    const searchQuery = getSearchQuery(state);
    const codeQuery = getSearchCodeQuery(state);
    const sortingField = getSortingField(state);
    const sortingMode = getSortingMode(state);
    const filterOnlyStandard = getFilterOnlyWithStandard(state);
    const filterAcademicPlan = getFilterAcademicPlan(state);

    dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_COMPETENCES}));

    service.getCompetences(currentPage, searchQuery, codeQuery, sortingField, sortingMode, competenceType, filterOnlyStandard, filterAcademicPlan)
      .then((res) => {
        const competences = get(res, 'data.results', []);
        const allPages = Math.ceil(get(res, 'data.count', 0));

        dispatch(competencesActions.setCompetences(competences));
        dispatch(competencesActions.changeAllCount(allPages));
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_COMPETENCES}));
        return done();
      });
  }
});

const deleteCompetence = createLogic({
  type: competencesActions.deleteCompetence.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const courseId = action.payload;

    dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_COMPETENCE}));

    service.deleteCompetence(courseId)
      .then(() => {
        dispatch(competencesActions.getCompetences());
        dispatch(actions.fetchingSuccess());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_COMPETENCE}));
        return done();
      });
  }
});

const createNewCompetence = createLogic({
  type: competencesActions.createNewCompetence.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const data = action.payload;

    dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_COMPETENCE}));

    service.createCompetence(data)
      .then(() => {
        dispatch(competencesActions.getCompetences());
        dispatch(actions.fetchingSuccess());
        dispatch(competencesActions.closeDialog());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_COMPETENCE}));
        return done();
      });
  }
});

const changeCompetence = createLogic({
  type: competencesActions.changeCompetence.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    const course = action.payload;

    dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_COMPETENCE}));

    service.updateCompetence(course)
      .then(() => {
        dispatch(competencesActions.getCompetences());
        dispatch(actions.fetchingSuccess());
        dispatch(competencesActions.closeDialog());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_COMPETENCE}));
        return done();
      });
  }
});

const getCompetence = createLogic({
  type: competencesActions.getCompetence.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_COMPETENCE}));

    service.getCompetence(action.payload)
      .then((res: any) => {
        dispatch(competencesActions.setCompetence(res.data));
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_COMPETENCE}));
        return done();
      });
  }
});

const getIndicators = createLogic({
  type: competencesActions.getIndicators.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_INDICATORS}));

    service.getIndicators(action.payload)
      .then((res: any) => {
        dispatch(competencesActions.setIndicators(res.data));
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_INDICATORS}));
        return done();
      });
  }
});

const createIndicator = createLogic({
  type: competencesActions.createIndicator.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: fetchingTypes.CREATE_INDICATOR}));

    service.createIndicator(action.payload)
      .then(() => {
        dispatch(competencesActions.getIndicators(action.payload[IndicatorsFields.COMPETENCE]));
        dispatch(competencesActions.closeDialog());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.CREATE_INDICATOR}));
        return done();
      });
  }
});

const deleteIndicator = createLogic({
  type: competencesActions.deleteIndicator.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: fetchingTypes.DELETE_INDICATOR}));

    service.deleteIndicator(action.payload)
      .then(() => {
        dispatch(competencesActions.getIndicators(action.payload[IndicatorsFields.COMPETENCE]));
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.DELETE_INDICATOR}));
        return done();
      });
  }
});

const updateIndicator = createLogic({
  type: competencesActions.changeIndicator.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: fetchingTypes.UPDATE_INDICATOR}));

    service.updateIndicator(action.payload)
      .then(() => {
        dispatch(competencesActions.getIndicators(action.payload[IndicatorsFields.COMPETENCE]));
        dispatch(competencesActions.closeDialog());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.UPDATE_INDICATOR}));
        return done();
      });
  }
});

const getIndicatorsDependsCompetence = createLogic({
  type: competencesActions.getIndicatorsDependsCompetence.type,
  latest: true,
  process({getState, action}: any, dispatch, done) {
    dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_INDICATORS_DEPENDS_COMPETENCE}));

    service.getIndicatorsDependsCompetence(action.payload)
      .then((res: any) => {
        const data = get(res, 'data', []);
        dispatch(competencesActions.setIndicators(data));
        dispatch(competencesActions.closeDialog());
      })
      .catch((err) => {
        dispatch(actions.fetchingFailed(err));
      })
      .then(() => {
        dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_INDICATORS_DEPENDS_COMPETENCE}));
        return done();
      });
  }
});

export default [
  getCompetences,
  deleteCompetence,
  createNewCompetence,
  changeCompetence,
  getCompetence,
  getIndicators,
  createIndicator,
  deleteIndicator,
  updateIndicator,
  getIndicatorsDependsCompetence,
];
