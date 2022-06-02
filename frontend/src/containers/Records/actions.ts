import {createAction} from "@reduxjs/toolkit";

import {StatisticsActions} from './types';


const GetSimpleStat = createAction('GET_SIMPLESTAT');
const SetSimpleStat = createAction('SET_SIMPLESTAT');
const changeQualification = createAction('CHANGE_QUALIFICATION');
const GetQuantityRPD = createAction('GET_QUANTITY_RPD');
const SetQuantityRPD = createAction('SET_QUANTITY_RPD');
const changeYear = createAction('CHANGE_YEAR');
const GetQuantityOP = createAction('GET_QUANTITY_OP');
const GetQuantityOPAll = createAction('GET_QUANTITY_OP_ALL');
const SetQuantityOPAll = createAction('SET_QUANTITY_OP_ALL');
const SetQuantityOP = createAction('SET_QUANTITY_OP');
const ChangeCH = createAction("CHANGE_CH");
const GetRPDwithoutSU = createAction('GET_RPD_WITHOUT_SU');
const SetRPDwithoutSU = createAction('SET_RPD_WITHOUT_SU');
const GetRPDinSU = createAction('GET_RPD_IN_SU');
const SetRPDinSU = createAction('SET_RPD_IN_SU');
const GetSU = createAction('GET_SU');
const SetSU = createAction('SET_SU');
const GetAP = createAction('GET_AP');
const SetAP = createAction('SET_AP');
const ChangeStatus = createAction('CHANGE_STATUS');
const ChangeSemester = createAction('CHANGE_SEMESTER');
const ChangeAP = createAction("CHANGE_AP");
const GetRPDinAP = createAction('GET_RPD_IN_AP');
const SetRPDinAP = createAction('SET_RPD_IN_AP');
const ChangeSU = createAction("CHANGE_SU");
const GetRPDinSEMESTER = createAction('GET_RPD_IN_SEMESTER');
const SetRPDinSEMESTER = createAction('SET_RPD_IN_SEMESTER');
const actions: StatisticsActions = {
   GetSimpleStat,
   SetSimpleStat,
   ChangeCH,
   changeQualification,
   GetQuantityRPD,
   SetQuantityRPD,
   changeYear,
   GetQuantityOP,
   SetQuantityOP,
   GetQuantityOPAll,
   SetQuantityOPAll,
   GetRPDwithoutSU,
   SetRPDwithoutSU,
   GetRPDinSU,
   SetRPDinSU,
   ChangeStatus,
   ChangeSemester,
   GetSU,
   SetSU,
   GetAP,
   SetAP,
   ChangeAP,
   GetRPDinAP,
   SetRPDinAP,
   ChangeSU,
   GetRPDinSEMESTER,
   SetRPDinSEMESTER
};

export default actions;