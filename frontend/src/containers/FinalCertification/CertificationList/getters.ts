import {rootState} from "../../../store/reducers";
import get from "lodash/get";
import {GENERAL_PATH} from "./reducers";
import {certificationListState} from "./types";
import {CertificationState} from "../types";
import {CertificationFields, CertificationMarkFields} from "../enum";

const getStateData = (state: rootState): certificationListState => get(state, GENERAL_PATH);

export const getCertificationList = (state: rootState): Array<any> => get(getStateData(state), 'results', []);
// @ts-ignore
export const getCertificationListForSelect = (state: rootState): Array<any> => get(getStateData(state), 'results', [])?.map((item: CertificationState) => ({
  label: `${item[CertificationFields.TITLE]} (КОП ИД ${item[CertificationMarkFields.ID]}, ИСУ ИД ${item[CertificationFields.DISCIPLINE_CODE]})`,
  value: item[CertificationFields.ID],
}));

export const getSortingField = (state: rootState): string => get(getStateData(state), 'sorting.field', '');
export const getSearchText = (state: rootState): string => get(getStateData(state), 'searchText', '');
export const getCertificationCount = (state: rootState): number => get(getStateData(state), 'certificationCount', 0);
export const getCurrentPage = (state: rootState): number => get(getStateData(state), 'currentPage', 1);

export const getIsModalOpen = (state: rootState): boolean => get(getStateData(state), 'modal.isModalOpen', false);
