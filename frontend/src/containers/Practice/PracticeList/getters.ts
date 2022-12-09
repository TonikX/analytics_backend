import {rootState} from "../../../store/reducers";
import get from "lodash/get";
import {GENERAL_PATH} from "./reducers";
import {practiceListState} from "./types";
import {PracticeState} from "../types";
import {PracticeFields} from "../enum";

const getStateData = (state: rootState): practiceListState => get(state, GENERAL_PATH);

export const getPracticeList = (state: rootState): Array<any> => get(getStateData(state), 'results', []);
// @ts-ignore
export const getPracticeListForSelect = (state: rootState): Array<any> => get(getStateData(state), 'results', []).map((item: PracticeState) => ({
  label: `${item[PracticeFields.TITLE]} (КОП ИД: ${item[PracticeFields.ID]}, ИСУ ИД: ${item[PracticeFields.DISCIPLINE_CODE]})`,
  value: item[PracticeFields.ID]
}));
export const getIsModalOpen = (state: rootState): boolean => get(getStateData(state), 'modal.isModalOpen', false);

export const getSortingField = (state: rootState): string => get(getStateData(state), 'sorting.field', '');
export const getSearchText = (state: rootState): string => get(getStateData(state), 'searchText', '');
export const getPracticeCount = (state: rootState): number => get(getStateData(state), 'practiceCount', 0);
export const getCurrentPage = (state: rootState): number => get(getStateData(state), 'currentPage', 1);
