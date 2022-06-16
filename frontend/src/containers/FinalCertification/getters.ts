import {rootState} from "../../store/reducers";
import get from "lodash/get";
import {GENERAL_PATH} from "./reducers";
import {certificationPageState, CertificationState, Id, TemplateTextState} from "./types";
import {initialState} from "./reducers";
import {CertificationFields} from "./enum";
import {PermissionsInfoState} from "./types";

const getStateData = (state: rootState): certificationPageState => get(state, GENERAL_PATH);

export const getCertification = (state: rootState): CertificationState =>
    get(getStateData(state), 'certification', initialState.certification);

export const getIsError = (state: rootState): boolean =>
    get(getStateData(state), 'isError', initialState.isError);

export const getValidation = (state: rootState): any =>
    get(getStateData(state), 'validation', initialState.validation);

export const getId = (state: rootState): Id => getCertification(state).id;

export const getMarkCriteriaId = (fieldName: CertificationFields) => (state: rootState): Id =>
    (getCertification(state) as any)[fieldName].id;

export const getPermissionsInfo = (state: rootState): PermissionsInfoState => getCertification(state).permissions_info;
export const getComments = (state: rootState) => get(getStateData(state), 'comments', initialState.comments);

export const getTemplateText = (state: rootState): TemplateTextState =>
    get(getStateData(state), 'templateText', initialState.templateText);
