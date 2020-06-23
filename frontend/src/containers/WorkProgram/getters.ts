import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {EvaluationToolFields, fields, workProgramSectionFields} from './enum';

import {workProgramState} from './types';

const getStateData = (state: rootState): workProgramState => get(state, GENERAL_PATH);
export const getWorkProgram = (state: rootState) => get(getStateData(state), fields.WORK_PROGRAM, {});
export const getWorkProgramEvaluationToolsList = (state: rootState) => get(getStateData(state), fields.WORK_PROGRAM_EVALUATION_TOOLS, []);
export const getWorkProgramId = (state: rootState) => get(getStateData(state), fields.WORK_PROGRAM_ID, '');
export const getWorkProgramField = (state: rootState, field: string) => get(getWorkProgram(state), field);

export const getDialogs = (state: rootState) => get(getStateData(state), fields.DIALOGS, {});

export const isOpenDialog = (state: rootState, dialog: string) => get(getDialogs(state), [dialog, fields.IS_OPEN_DIALOG], false);
export const getDialogData = (state: rootState, dialog: string) => get(getDialogs(state), [dialog, fields.DIALOG_DATA], {});

export const getAllSectionsForSelect = (state: rootState) => {
    const allSections = getWorkProgramField(state, fields.WORK_PROGRAM_SECTIONS);

    return allSections.map((section: any) => ({
        label: section[workProgramSectionFields.NAME],
        value: section[workProgramSectionFields.ID],
    }))
};

export const getEvaluationToolsForSelect = (state: rootState) => {
    const evaluationToolsList = getWorkProgramEvaluationToolsList(state);
    //@ts-ignore
    return evaluationToolsList.map((evaluationTool: any) => ({
        label: evaluationTool[EvaluationToolFields.NAME],
        value: evaluationTool[EvaluationToolFields.ID],
    }))
};
