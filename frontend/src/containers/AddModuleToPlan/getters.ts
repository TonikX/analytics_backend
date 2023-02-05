import {rootState} from "../../store/reducers";
import get from "lodash/get";
import {GENERAL_PATH} from "./reducer";
import {addModuleToPlanState} from "./types";
import {SortingType, Types} from "../../components/SortingButton/types";
import {Qualifications} from "./enum";

export const getStateData = (state: rootState): addModuleToPlanState => get(state, GENERAL_PATH);

export const getTrainingModulesList = (state: rootState): Array<any> => get(getStateData(state), "trainingModulesList", []);
export const getCurrentModulePage = (state: rootState): number => get(getStateData(state), "currentModulesPage", 1);
export const getModuleSearchQuery = (state: rootState): string => get(getStateData(state), "modulesSearchQuery", "");
export const getSortingMode = (state: rootState): SortingType => get(getStateData(state), "sortingMode", Types.ASC);
export const getModulesAllCount = (state: rootState): number => get(getStateData(state), "modulesAllCount", 0);

export const getPlansAllCount = (state: rootState): number => get(getStateData(state), "plansAllCount", 0);
export const getEducationalPlans = (state: rootState): Array<any> => get(getStateData(state), "educationalPlansList", []);
export const getCurrentPlansPage = (state: rootState): number => get(getStateData(state), "currentPlansPage", 1);
export const getPlansSearchQuery = (state: rootState): string => get(getStateData(state), "plansSearchQuery", "");

export const getSelectedBlock = (state: rootState): string => get(getStateData(state), "selectedBlock", "");
export const getSelectedPlans = (state: rootState): Array<any> => get(getStateData(state), "selectedPlans", []);
export const getSelectedModules = (state: rootState): Array<any> => get(getStateData(state), "selectedModules", []);
export const getSelectAll = (state: rootState): boolean => get(getStateData(state), "selectAll", false);
export const getQualification = (state: rootState): string => get(getStateData(state), "qualification", Qualifications.ALL_LEVELS);
