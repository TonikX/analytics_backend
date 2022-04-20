import {rootState} from "../../../store/reducers";
import get from "lodash/get";
import {GENERAL_PATH} from "./reducers";
import {practiceListState} from "./types";

const getStateData = (state: rootState): practiceListState => get(state, GENERAL_PATH);

export const getPracticeList = (state: rootState): Array<any> => get(getStateData(state), 'results', []);
export const getIsModalOpen = (state: rootState): boolean => get(getStateData(state), 'modal.isModalOpen', false);