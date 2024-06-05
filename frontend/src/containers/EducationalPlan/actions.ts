import {createAction} from "@reduxjs/toolkit";

import {EducationalPlanActions} from './types';

const getEducationalPlans = createAction('GET_EDUCATIONAL_PLANS');
const setEducationalPlans = createAction('SET_EDUCATIONAL_PLANS');

const getEducationalDetail = createAction('GET_EDUCATIONAL_PLAN_DETAIL');
const setEducationalDetail = createAction('SET_EDUCATIONAL_PLAN_DETAIL');

const setIsTrajectoryRoute = createAction('SET_EDUCATIONAL_PLAN_IS_TRAJECTORY_ROUTE');

const createNewEducationalPlan = createAction('CREATE_NEW_EDUCATIONAL_PLAN');
const changeEducationalPlan = createAction('CHANGE_EDUCATIONAL_PLAN');
const changeEditorsEducationalPlan = createAction('CHANGE_PATCH_EDUCATIONAL_PLAN');
const deleteEducationalPlan = createAction('DELETE_EDUCATIONAL_PLAN');

const openDialog = createAction('OPEN_EDUCATIONAL_PLAN_DIALOG');
const closeDialog = createAction('CLOSE_EDUCATIONAL_PLAN_DIALOG');

const openModuleDialog = createAction('OPEN_EDUCATIONAL_PLAN_MODULE_DIALOG');
const closeModuleDialog = createAction('CLOSE_EDUCATIONAL_PLAN_MODULE_DIALOG');

const openAddModuleDialog = createAction('OPEN_EDUCATIONAL_PLAN_ADD_MODULE_DIALOG');
const closeAddModuleDialog = createAction('CLOSE_EDUCATIONAL_PLAN_ADD_MODULE_DIALOG');

const openDetailDialog = createAction('OPEN_DETAIL_EDUCATIONAL_PLAN_DIALOG');
const closeDetailDialog = createAction('CLOSE_DETAIL_EDUCATIONAL_PLAN_DIALOG');

const changeSearchQuery = createAction('EDUCATIONAL_PLAN_CHANGE_SEARCH_QUERY');
const changeCurrentPage = createAction('EDUCATIONAL_PLAN_CHANGE_CURRENT_PAGE');
const changeAllCount = createAction('EDUCATIONAL_PLAN_CHANGE_ALL_COUNT');
const changeSorting = createAction('EDUCATIONAL_PLAN_CHANGE_SORTING');

const createBlockOfWorkPrograms = createAction('CREATE_BLOCK_OF_WORK_PROGRAM');
const changeBlockOfWorkPrograms = createAction('CHANGE_BLOCK_OF_WORK_PROGRAM');
const deleteBlockOfWorkPrograms = createAction('DELETE_BLOCK_OF_WORK_PROGRAM');

const createModule = createAction('EDUCATIONAL_PLAN_CREATE_MODULE');
const changeModule = createAction('EDUCATIONAL_PLAN_CHANGE_MODULE');
const deleteModule = createAction('EDUCATIONAL_PLAN_DELETE_MODULE');
const addModule = createAction('EDUCATIONAL_PLAN_ADD_MODULE');

const getCompetenceDirectionsDependedOnWorkProgram = createAction('GET_COMPETENCE_DIRECTIONS_DEPENDED_ON_WORK_PROGRAM');
const getDirectionsDependedOnWorkProgram = createAction('GET_DIRECTIONS_DEPENDED_ON_WORK_PROGRAM');
const setDirectionsDependedOnWorkProgram = createAction('SET_DIRECTIONS_DEPENDED_ON_WORK_PROGRAM');

const openDownloadModal = createAction('OPEN_DOWNLOAD_MODAL');
const closeDownloadModal = createAction('CLOSE_DOWNLOAD_MODAL');

const saveCompetenceBlock = createAction('SAVE_COMPETENCE_BLOCK');
const deleteCompetenceBlock = createAction('DELETE_COMPETENCE_BLOCK');

const deleteWorkProgramFromZun = createAction('DELETE_WP_FROM_ZUN');
const pageDown = createAction('EDUCATIONAL_PLAN_PAGE_DOWN');

const planTrajectorySetUserData = createAction('EDUCATIONAL_PLAN_TRAJECTORY_SET_USER_DATA');
const planTrajectorySetDirection = createAction('EDUCATIONAL_PLAN_TRAJECTORY_SET_DIRECTION');

const planTrajectorySelectOptionalWp = createAction('EDUCATIONAL_PLAN_TRAJECTORY_SELECT_OPTIONAL_WP');
const planTrajectorySelectElectives = createAction('EDUCATIONAL_PLAN_TRAJECTORY_SELECT_ELECTIVES');
const planTrajectorySelectSpecialization = createAction('EDUCATIONAL_PLAN_TRAJECTORY_SPECIALIZATION');

const educationalPlanConnectModules = createAction('EDUCATIONAL_PLAN_CONNECT_MODULES');
const educationalPlanDisconnectModule = createAction('EDUCATIONAL_PLAN_DISCONNECT_MODULE');
const setNewPlanIdForRedirect = createAction('SET_NEW_PLAN_ID_FOR_REDIRECT');

const sendPlanToValidate = createAction('SEND_PLAN_TO_VALIDATE');
const approvePlan = createAction('APPROVE_PLAN');
const sendPlanToRework = createAction('SEND_PLAN_TO_REWORK');

const changeModulePosition = createAction('CHANGE_MODULE_POSITION');

const actions: EducationalPlanActions = {
  approvePlan,
  sendPlanToRework,
  sendPlanToValidate,
  changeEditorsEducationalPlan,
  setNewPlanIdForRedirect,
  educationalPlanConnectModules,
  educationalPlanDisconnectModule,
  planTrajectorySelectSpecialization,
  planTrajectorySelectOptionalWp,
  planTrajectorySelectElectives,
  openAddModuleDialog,
  closeAddModuleDialog,
  pageDown,
  deleteWorkProgramFromZun,
  deleteCompetenceBlock,
  saveCompetenceBlock,
  createModule,
  openDownloadModal,
  closeDownloadModal,
  getCompetenceDirectionsDependedOnWorkProgram,
  getDirectionsDependedOnWorkProgram,
  setDirectionsDependedOnWorkProgram,
  openCreateModuleDialog: openModuleDialog,
  closeCreateModuleDialog: closeModuleDialog,
  changeModule,
  deleteModule,
  addModule,
  createBlockOfWorkPrograms,
  changeBlockOfWorkPrograms,
  deleteBlockOfWorkPrograms,
  openDetailDialog,
  closeDetailDialog,
  getEducationalDetail,
  setEducationalDetail,
  setIsTrajectoryRoute,
  getEducationalPlans,
  setEducationalPlans,
  createNewEducationalPlan,
  changeEducationalPlan,
  deleteEducationalPlan,
  openDialog,
  closeDialog,
  changeSearchQuery,
  changeCurrentPage,
  changeAllCount,
  changeSorting,
  planTrajectorySetUserData,
  planTrajectorySetDirection,
  changeModulePosition
}

export default actions;
