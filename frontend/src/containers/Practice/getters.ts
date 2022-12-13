import {rootState} from "../../store/reducers";
import get from "lodash/get";
import {GENERAL_PATH, initialState} from "./reducers";
import {Id, PermissionsInfoState, practicePageState, PracticeState} from "./types";
import {TemplateTextState} from "./types";

const getStateData = (state: rootState): practicePageState => get(state, GENERAL_PATH);

export const getPractice = (state: rootState): PracticeState => get(getStateData(state), 'practice', initialState.practice);
export const getIsError = (state: rootState): boolean => get(getStateData(state), 'isError', initialState.isError);
export const getValidation = (state: rootState): any =>
    get(getStateData(state), 'validation', initialState.validation);

export const getLiteratureList = (state: rootState): PracticeState =>
    get(getStateData(state), 'practice.bibliographic_reference', initialState.practice.bibliographic_reference);

export const getId = (state: rootState): Id => get(getStateData(state), 'practice.id', initialState.practice.id);
export const isOpenedPrerequisitesDialog = (state: rootState): Boolean => get(
    getStateData(state), 'addPrerequisitesDialog.isOpen', initialState.addPrerequisitesDialog.isOpen
);

export const getTemplateText = (state: rootState): TemplateTextState =>
    get(getStateData(state), 'templateText', initialState.templateText);

export const getPermissionsInfo = (state: rootState): PermissionsInfoState => getPractice(state).permissions_info;
export const getComments = (state: rootState) => get(getStateData(state), 'comments', initialState.comments);
