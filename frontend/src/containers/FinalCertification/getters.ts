import {rootState} from "../../store/reducers";
import get from "lodash/get";
import {GENERAL_PATH} from "./reducers";
import {certificationPageState, CertificationState, Id} from "./types";
import {initialState} from "./reducers";

const getStateData = (state: rootState): certificationPageState => get(state, GENERAL_PATH);

export const getCertification = (state: rootState): CertificationState =>
    get(getStateData(state), 'certification', initialState.certification);

export const getId = (state: rootState): Id => getCertification(state).id;