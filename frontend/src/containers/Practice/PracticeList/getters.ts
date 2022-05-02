import {rootState} from "../../../store/reducers";
import get from "lodash/get";
import {GENERAL_PATH} from "./reducers";
import {practiceListState} from "./types";
import {SortingType} from "../../../components/SortingButton/types";

const getStateData = (state: rootState): practiceListState => get(state, GENERAL_PATH);

export const getPracticeList = (state: rootState): Array<any> => get(getStateData(state), 'results', []);
export const getIsModalOpen = (state: rootState): boolean => get(getStateData(state), 'modal.isModalOpen', false);

export const getSortingField = (state: rootState): string => get(getStateData(state), 'sorting.field', '');
export const getSortingMode = (state: rootState): SortingType => get(getStateData(state), 'sorting.mode', '');
export const getSearchText = (state: rootState): string => get(getStateData(state), 'searchText', '');
export const getPracticeCount = (state: rootState): number => get(getStateData(state), 'practiceCount', 0);
export const getCurrentPage = (state: rootState): number => get(getStateData(state), 'currentPage', 1);
