import {createAction} from "@reduxjs/toolkit";

import {WorkProgramActions} from './types';

const getWorkProgram = createAction('GET_WORK_PROGRAM');
const setWorkProgram = createAction('SET_WORK_PROGRAM');
const saveWorkProgram = createAction('SAVE_WORK_PROGRAM');
const setWorkProgramPart = createAction('SET_WORK_PROGRAM_PART');

const cloneWorkProgram = createAction('CLONE_WORK_PROGRAM');

const saveSection = createAction('WORK_PROGRAM_SAVE_SECTION');
const deleteSection = createAction('WORK_PROGRAM_DELETE_SECTION');
const changeSectionNumber = createAction('WORK_PROGRAM_CHANGE_SECTION_NUMBER');

const saveTopic = createAction('WORK_PROGRAM_SAVE_TOPIC');
const deleteTopic = createAction('WORK_PROGRAM_DELETE_TOPIC');
const changeTopicNumber = createAction('WORK_PROGRAM_CHANGE_TOPIC_NUMBER');
const addTopicMaterial = createAction('WORK_PROGRAM_ADD_TOPIC_MATERIAL');
const updateTopicMaterial = createAction('WORK_PROGRAM_UPDATE_TOPIC_MATERIAL');
const deleteTopicMaterial = createAction('WORK_PROGRAM_DELETE_TOPIC_MATERIAL');

const openDialog = createAction('WORK_PROGRAM_OPEN_DIALOG');
const closeDialog = createAction('WORK_PROGRAM_CLOSE_DIALOG')

const deleteLiterature = createAction('WORK_PROGRAM_DELETE_LITERATURE');
const addLiterature = createAction('WORK_PROGRAM_ADD_LITERATURE');

const deletePrerequisite = createAction('WORK_PROGRAM_DELETE_PREREQUISITE');
const addPrerequisite = createAction('WORK_PROGRAM_ADD_PREREQUISITE');
const changePrerequisite = createAction('WORK_PROGRAM_CHANGE_PREREQUISITE');

const deleteResult = createAction('WORK_PROGRAM_DELETE_RESULT');
const addResult = createAction('WORK_PROGRAM_ADD_RESULT');
const changeResult = createAction('WORK_PROGRAM_CHANGE_RESULT');
const getResults = createAction('WORK_PROGRAM_GET_RESULTS');
const setResults = createAction('WORK_PROGRAM_SET_RESULTS');

const getWorkProgramEvaluationTools = createAction('GET_WORK_PROGRAM_EVALUATION_TOOLS');
const getWorkProgramEvaluationTool = createAction('GET_WORK_PROGRAM_EVALUATION_TOOL');
const setWorkProgramEvaluationTool = createAction('SET_WORK_PROGRAM_EVALUATION_TOOL');
const setWorkProgramEvaluationTools = createAction('SET_WORK_PROGRAM_EVALUATION_TOOLS');

const deleteEvaluationTool = createAction('WORK_PROGRAM_DELETE_EVALUATION_TOOL');
const addEvaluationTool = createAction('WORK_PROGRAM_ADD_EVALUATION_TOOL');
const changeEvaluationTool = createAction('WORK_PROGRAM_CHANGE_EVALUATION_TOOL');

const deleteIntermediateCertification = createAction('WORK_PROGRAM_DELETE_INTERMEDIATE_CERTIFICATION');
const addIntermediateCertification = createAction('WORK_PROGRAM_ADD_INTERMEDIATE_CERTIFICATION');
const changeIntermediateCertification = createAction('WORK_PROGRAM_CHANGE_INTERMEDIATE_CERTIFICATION');
const getIntermediateCertification = createAction('WORK_PROGRAM_GET_INTERMEDIATE_CERTIFICATION');
const setIntermediateCertification = createAction('WORK_PROGRAM_SET_INTERMEDIATE_CERTIFICATION');

const sendWorkProgramToArchive = createAction('WORK_PROGRAM_SEND_TO_ARCHIVE');
const sendWorkProgramToExpertise = createAction('WORK_PROGRAM_SEND_TO_EXPERTIZE');
const sendWorkProgramToIsu = createAction('WORK_PROGRAM_SEND_TO_ISU');
const returnWorkProgramToWork = createAction('WORK_PROGRAM_RETURN_TO_WORK');
const approveWorkProgram = createAction('WORK_PROGRAM_APPROVE');

const getComments = createAction('WORK_PROGRAM_GET_COMMENTS');
const setComments = createAction('WORK_PROGRAM_SET_COMMENTS');
const createComment = createAction('WORK_PROGRAM_CREATE_COMMENT');
const updateUnreadCommentStatus = createAction('WORK_PROGRAM_UPDATE_UNREAD_COMMENT_STATUS');

const saveZUN = createAction('WORK_PROGRAM_SAVE_ZUN');
const deleteZUN = createAction('WORK_PROGRAM_DELETE_ZUN');
const updateZUN = createAction('WORK_PROGRAM_UPDATE_ZUN');

const pageDown = createAction('WORK_PROGRAM_PAGE_DOWN');

const getRecommendedPrerequisites = createAction('GET_RECOMMENDED_PREREQUISITES');
const getRecommendedOutcomes = createAction('GET_RECOMMENDED_OUTCOMES');

const setRecommendedPrerequisites = createAction('SET_RECOMMENDED_PREREQUISITES');

const actions: WorkProgramActions = {
    saveZUN,
    deleteZUN,
    updateZUN,

    pageDown,

    addTopicMaterial,
    updateTopicMaterial,
    deleteTopicMaterial,

    getComments,
    setComments,
    createComment,
    updateUnreadCommentStatus,

    sendWorkProgramToArchive,
    sendWorkProgramToExpertise,
    sendWorkProgramToIsu,
    returnWorkProgramToWork,
    approveWorkProgram,

    cloneWorkProgram,

    getResults,
    setResults,
    deleteResult,
    addResult,
    changeResult,

    deleteIntermediateCertification,
    addIntermediateCertification,
    changeIntermediateCertification,
    getIntermediateCertification,
    setIntermediateCertification,

    getWorkProgramEvaluationTools,
    setWorkProgramEvaluationTools,
    getWorkProgramEvaluationTool,
    setWorkProgramEvaluationTool,

    deleteEvaluationTool,
    addEvaluationTool,
    changeEvaluationTool,

    deletePrerequisite,
    addPrerequisite,
    changePrerequisite,

    getWorkProgram,
    setWorkProgram,
    setWorkProgramPart,
    saveWorkProgram,

    saveSection,
    deleteSection,
    changeSectionNumber,

    saveTopic,
    deleteTopic,
    changeTopicNumber,

    openDialog,
    closeDialog,

    deleteLiterature,
    addLiterature,

    getRecommendedOutcomes,
    getRecommendedPrerequisites,
    setRecommendedPrerequisites,
};

export default actions;
