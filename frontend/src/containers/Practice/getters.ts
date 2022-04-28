import {rootState} from "../../store/reducers";
import get from "lodash/get";
import {GENERAL_PATH, initialState} from "./reducers";
import {practicePageState, PracticeState} from "./types";

const getStateData = (state: rootState): practicePageState => get(state, GENERAL_PATH);

export const getPractice = (state: rootState): PracticeState => get(getStateData(state), 'practice', initialState.practice);

export const getLiteratureIdList = (state: rootState): PracticeState =>
    get(getStateData(state), 'practice.bibliographic_reference', initialState.practice.bibliographic_reference);
