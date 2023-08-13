import get from 'lodash/get';

import {rootState} from '../../store/reducers';

import {GENERAL_PATH} from "./reducer";

import {EvaluationToolFields, fields, WorkProgramGeneralFields, workProgramSectionFields} from './enum';

import {workProgramState} from './types';

const getStateData = (state: rootState): workProgramState => get(state, GENERAL_PATH);
export const getWorkProgramComments = (state: rootState) => get(getStateData(state), fields.WORK_PROGRAM_COMMENTS, {});
export const getWorkProgramCompetenceFilters = (state: rootState) => get(getStateData(state), 'competenceFilters', {});
export const getWorkProgramCompetenceFiltersYear = (state: rootState) => get(getWorkProgramCompetenceFilters(state), 'year', 2023);
export const getWorkProgramCompetenceFiltersAP = (state: rootState) => get(getWorkProgramCompetenceFilters(state), 'ap', null);
export const getWorkProgramCompetenceFiltersImp = (state: rootState) => get(getWorkProgramCompetenceFilters(state), 'imp', null);

export const getWorkProgram = (state: rootState) => get(getStateData(state), fields.WORK_PROGRAM, {});
export const getWorkProgramResults = (state: rootState) => get(getWorkProgram(state), fields.WORK_PROGRAM_RESULTS, []);
export const getWorkProgramEvaluationToolsList = (state: rootState) => get(getStateData(state), fields.WORK_PROGRAM_EVALUATION_TOOLS, []);
export const getWorkProgramEvaluationTool = (state: rootState) => get(getStateData(state), fields.WORK_PROGRAM_EVALUATION_TOOL, {});
export const getApWithCompetencesAndIndicatorsToWp = (state: rootState) => get(getStateData(state), fields.AP_WITH_COMPETENCES_AND_INDICATORS_TO_WP, {});
export const getAllCompetencesAndIndicatorsForWp = (state: rootState) => get(getStateData(state), fields.ALL_COMPETENCES_AND_INDICATORS_FOR_WP, {});
export const getWorkProgramCompetences = (state: rootState) => get(getWorkProgram(state), fields.WORK_PROGRAM_COMPETENCES, []);
export const getWorkProgramIntermediateCertificationList = (state: rootState) => get(getWorkProgram(state), fields.WORK_PROGRAM_INTERMEDIATE_CERTIFICATION_TOOLS, []);
export const getWorkProgramIntermediateCertification = (state: rootState) => get(getStateData(state), fields.WORK_PROGRAM_INTERMEDIATE_CERTIFICATION_TOOL, {});
export const getWorkProgramId = (state: rootState) => get(getWorkProgram(state), 'id', '');
export const getWorkProgramExpertiseStatus = (state: rootState) => get(getWorkProgram(state), WorkProgramGeneralFields.EXPERTISE_STATUS, '');
export const getWorkProgramExpertiseId = (state: rootState) => get(getWorkProgram(state), 'expertise_with_rpd.0.id', null) || get(getWorkProgram(state), WorkProgramGeneralFields.EXPERTISE_ID_2);
export const getWorkProgramUserExpertiseId = (state: rootState) => get(getWorkProgram(state), WorkProgramGeneralFields.USER_EXPERTISE_ID) || get(getWorkProgram(state), WorkProgramGeneralFields.EXPERTISE_ID_2);
export const getWorkProgramField = (state: rootState, field: string) => get(getWorkProgram(state), field, '');
export const getWorkProgramNotificationsUnread = (state: rootState) => (
  (getWorkProgramField(state, 'read_notifications')?.split(', ') || []).map((item: 'False'|'True') => item === 'True')
);

export const isCanEdit = (state: rootState) => get(getWorkProgram(state), WorkProgramGeneralFields.CAN_EDIT);
export const isCanApprove = (state: rootState) => get(getWorkProgram(state), WorkProgramGeneralFields.CAN_APPROVE);
export const isCanSendToIsu = (state: rootState) => get(getWorkProgram(state), WorkProgramGeneralFields.CAN_SEND_TO_ISU);
export const isCanArchive = (state: rootState) => get(getWorkProgram(state), WorkProgramGeneralFields.CAN_ARCHIVE);
export const isCanComment = (state: rootState) => get(getWorkProgram(state), WorkProgramGeneralFields.CAN_COMMENT);
export const isStudent = (state: rootState) => get(getWorkProgram(state), WorkProgramGeneralFields.CAN_COMMENT);
export const isCanAddToFolder = (state: rootState) => get(getWorkProgram(state), WorkProgramGeneralFields.CAN_ADD_TO_FOLDER);

export const getIsHoursError = (state: rootState) => {
    //const totalHours = getWorkProgramField(state, fields.WORK_PROGRAM_ALL_HOURS);
    //const sections = getWorkProgramField(state, fields.WORK_PROGRAM_SECTIONS);
    // const currentTotalHours = (parseFloat(totalSPOHours) + parseFloat(totalContactWorkHours)).toFixed(2);

    return false;
};

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
export const getResultsForSelect = (state: rootState) => {
    const allResults = getWorkProgramResults(state);

    //@ts-ignore
    return allResults.map((result: any) => ({
        value: get(result, 'id'),
        label: get(result, 'item.name', ''),
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

export const getPlanQualifications = (state: rootState) => {
    const plans = getWorkProgramField(state, 'work_program_in_change_block');
    const path = 'discipline_block_module.descipline_block.0.academic_plan.academic_plan_in_field_of_study.0.field_of_study.0.qualification';
    if (plans) {
        return plans.map((p: any) => get(p, path, ''));
    }
    return [];
}
