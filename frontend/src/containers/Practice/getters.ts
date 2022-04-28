import {rootState} from "../../store/reducers";
import get from "lodash/get";
import {GENERAL_PATH, initialState} from "./reducers";
import {Id, practicePageState, PracticeState} from "./types";

const getStateData = (state: rootState): practicePageState => get(state, GENERAL_PATH);

export const getPractice = (state: rootState): PracticeState => get(getStateData(state), 'practice', initialState.practice);

export const getLiteratureIdList = (state: rootState): PracticeState =>
    get(getStateData(state), 'practice.bibliographic_reference', initialState.practice.bibliographic_reference);

export const getId = (state: rootState): Id => get(getStateData(state), 'practice.id', initialState.practice.id);