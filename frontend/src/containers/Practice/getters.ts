import {rootState} from "../../store/reducers";
import get from "lodash/get";
import {GENERAL_PATH, initialState} from "./reducers";
import {Competence, Id, PermissionsInfoState, practicePageState, PracticeState} from "./types";
import {TemplateTextState} from "./types";
import {DialogType} from "./enum";
import {ResultsType} from "../WorkProgram/types";

const getStateData = (state: rootState): practicePageState => get(state, GENERAL_PATH);

export const getPractice = (state: rootState): PracticeState => get(getStateData(state), 'practice', initialState.practice);
export const getIsError = (state: rootState): boolean => get(getStateData(state), 'isError', initialState.isError);
export const getValidation = (state: rootState): any =>
    get(getStateData(state), 'validation', initialState.validation);

export const getLiteratureList = (state: rootState): PracticeState =>
// @ts-ignore
    get(getStateData(state), 'practice.bibliographic_reference', initialState.practice.bibliographic_reference);

export const getId = (state: rootState): Id => get(getStateData(state), 'practice.id', initialState.practice.id);
export const isOpenedDialog = (state: rootState, dialogType: DialogType): Boolean => get(
    getStateData(state), ['dialog', dialogType, 'isOpen'], initialState.dialog[dialogType].isOpen
);
export const getCurrentData = (state: rootState, dialogType: DialogType) => get(
    getStateData(state), ['dialog', dialogType, 'dialogData'], initialState.dialog[dialogType].dialogData
);
export const getCompetences = (state: rootState): Competence[] => get(getStateData(state), 'practice.competences', initialState.practice.competences);
export const getResults = (state: rootState): ResultsType[] => get(getStateData(state), 'practice.outcomes', initialState.practice.outcomes);
export const getPracticeInChangeBlock = (state: rootState): ResultsType[] => get(getStateData(state), 'practice.practice_in_change_block', initialState.practice.practice_in_change_block);

export const getResultsForSelect = (state: rootState) => {
    const allResults = getResults(state);
    //@ts-ignore
    return allResults.map((result: any) => ({
        value: get(result, 'id'),
        label: get(result, 'item.name', ''),
    }))
};

const titlePath = 'work_program_change_in_discipline_block_module.discipline_block_module.descipline_block.0.academic_plan.academic_plan_in_field_of_study.0.title'
const yearPath = 'work_program_change_in_discipline_block_module.discipline_block_module.descipline_block.0.academic_plan.academic_plan_in_field_of_study.0.year'
const titleDirectionPath = 'work_program_change_in_discipline_block_module.discipline_block_module.descipline_block.0.academic_plan.academic_plan_in_field_of_study.0.field_of_study.0.title'
const numberDirectionPath = 'work_program_change_in_discipline_block_module.discipline_block_module.descipline_block.0.academic_plan.academic_plan_in_field_of_study.0.field_of_study.0.number'

export const getDependentDirections = (state: rootState) => get(getStateData(state), 'dependentDirections', initialState.dependentDirections).map((result: any) => ({
    value: get(result, 'id'),
    label: `${get(result, titlePath, '')} ${get(result, yearPath, '')}: ${get(result, titleDirectionPath, '')} ${get(result, numberDirectionPath, '')}`,
}));

export const getTemplateText = (state: rootState): TemplateTextState =>
    get(getStateData(state), 'templateText', initialState.templateText);

export const getPermissionsInfo = (state: rootState): PermissionsInfoState => getPractice(state).permissions_info;
export const getComments = (state: rootState) => get(getStateData(state), 'comments', initialState.comments);
