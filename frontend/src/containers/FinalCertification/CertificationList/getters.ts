import {rootState} from "../../../store/reducers";
import get from "lodash/get";
import {GENERAL_PATH} from "./reducers";
import {certificationListState} from "./types";

const getStateData = (state: rootState): certificationListState => get(state, GENERAL_PATH);

export const getCertificationList = (state: rootState): Array<any> => get(getStateData(state), 'results', []);

export const getSortingField = (state: rootState): string => get(getStateData(state), 'sorting.field', '');
export const getSearchText = (state: rootState): string => get(getStateData(state), 'searchText', '');
export const getCertificationCount = (state: rootState): number => get(getStateData(state), 'certificationCount', 0);
export const getCurrentPage = (state: rootState): number => get(getStateData(state), 'currentPage', 1);
