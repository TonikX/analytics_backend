import {rootState} from "../../store/reducers";
import get from "lodash/get";
import {GENERAL_PATH} from "./reducers";
import {certificationPageState, CertificationState, Id} from "./types";
import {initialState} from "./reducers";
import {CertificationFields} from "./enum";

const getStateData = (state: rootState): certificationPageState => get(state, GENERAL_PATH);

export const getCertification = (state: rootState): CertificationState =>
    get(getStateData(state), 'certification', initialState.certification);

export const getId = (state: rootState): Id => getCertification(state).id;

export const getMarkCriteriaId = (fieldName: CertificationFields) => (state: rootState): Id =>
    (getCertification(state) as any)[fieldName].id;