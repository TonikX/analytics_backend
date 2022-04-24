import {rootState} from "../../store/reducers";
import get from "lodash/get";
import {GENERAL_PATH, initialState} from "./reducers";
import {GeneralInfoState, practicePageState, PracticeState} from "./types";

const getStateData = (state: rootState): practicePageState => get(state, GENERAL_PATH);

export const getPractice = (state: rootState): PracticeState => get(getStateData(state), 'practice', initialState.practice);
