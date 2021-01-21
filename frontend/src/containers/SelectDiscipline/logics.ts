import {createLogic} from "redux-logic";
import get from 'lodash/get';

import actions from '../../layout/actions';
import selectDisciplineActions from './actions';

import {service} from './service';
import {fetchingTypes} from "./enum";
import {getSelectedSemester, getSelectedKeywords} from "./getters";
import {getSelectedQualification} from "./getters";

const getKeywords = createLogic({
    type: selectDisciplineActions.selectDisciplineGetKeywords.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const semester = getSelectedSemester(state);
        const qualification = getSelectedQualification(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_KEYWORDS}));

        service.getKeywords(semester, qualification)
            .then((res) => {
                dispatch(selectDisciplineActions.selectDisciplineSetKeywords(get(res, 'data.avaliable_keywords', [])));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_KEYWORDS}));
                return done();
            });
    }
});

const getWorkPrograms = createLogic({
    type: selectDisciplineActions.selectDisciplineGetWorkPrograms.type,
    latest: true,
    process({getState, action}: any, dispatch, done) {
        const state = getState();

        const keywords = getSelectedKeywords(state);
        const semester = getSelectedSemester(state);
        const qualification = getSelectedQualification(state);

        dispatch(actions.fetchingTrue({destination: fetchingTypes.GET_WORK_PROGRAMS}));

        service.getWorkPrograms(keywords, semester, qualification)
            .then((res) => {
                dispatch(selectDisciplineActions.selectDisciplineSetWorkPrograms(get(res, 'data.recommended_disciplines', [])));
                dispatch(actions.fetchingSuccess());
            })
            .catch((err) => {
                dispatch(actions.fetchingFailed(err));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: fetchingTypes.GET_WORK_PROGRAMS}));
                return done();
            });
    }
});

export default [
    getKeywords,
    getWorkPrograms
];
