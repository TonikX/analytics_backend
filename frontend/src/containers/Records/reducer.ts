import createReducer from "../../store/createReducer";

import actions from "./actions";
import { fields } from './enum'
import { IQuantityOpAll, SimpleStatState } from "./types";


export const GENERAL_PATH = 'records';

export const initialSimpleStatState: SimpleStatState = {
    [fields.SIMPLE_STATE]: [],
    [fields.CURRENT_CH]: 1,
    [fields.IS_VISIBLE]: false,
    [fields.QUALIFICATION]: "bachelor",
    [fields.QUALIFICATIONS_ALL]: ["bachelor", "master", "specialist"],
    [fields.QUANTITY_RPD]: [],
    [fields.YEAR]: "2021",
    [fields.YEARS_ALL]: ["2022", "2021", "2020", "2019"],
    [fields.QUANTITY_OP]: [],
    [fields.QUANTITY_OP_ALL]: {},
    [fields.RPD_WITHOUT_SU]: [],
    [fields.RPD_IN_SU]: [],
    [fields.STATUS]: "all",
    [fields.SEMESTER]: "1",
    [fields.SU]: [],
    [fields.AP]: [],
    [fields.APuse]: -1,
    [fields.RPD_IN_AP]: [],
    [fields.SUuse]: -1,
    [fields.RPD_IN_SEMESTER]: [],

};

const SetSimpleStat = (state: SimpleStatState, {payload}: any): SimpleStatState=> ({
    ...state,
    [fields.SIMPLE_STATE]: payload,
    [fields.IS_VISIBLE]: true,
});

const ChangeSemester = (state: SimpleStatState, {payload}: any): SimpleStatState=> ({
    ...state,
    [fields.SEMESTER]: payload,
});

const ChangeAP = (state: SimpleStatState, {payload}: any): SimpleStatState=> ({
    ...state,
    [fields.APuse]: payload,
});

const ChangeSU = (state: SimpleStatState, {payload}: any): SimpleStatState=> ({
    ...state,
    [fields.SUuse]: payload,
});

const ChangeStatus = (state: SimpleStatState, {payload}: any): SimpleStatState=> ({
    ...state,
    [fields.STATUS]: payload,
});



const ChangeCH = (state: SimpleStatState, {payload}: any): SimpleStatState=> ({
    ...state,
    [fields.CURRENT_CH]: payload,
});

const ChangeQualification = (state: SimpleStatState, {payload}: any): SimpleStatState => ({
    ...state,
    [fields.QUALIFICATION]: payload,
});

const ChangeYear = (state: SimpleStatState, {payload}: any): SimpleStatState => ({
    ...state,
    [fields.YEAR]: payload,
});

const SetQuantityRPD = (state: SimpleStatState, {payload}: any): SimpleStatState=>({
    ...state,
    [fields.QUANTITY_RPD]: payload,
});

const SetQuantityOP = (state: SimpleStatState, {payload}: any): SimpleStatState=>({
    ...state,
    [fields.QUANTITY_OP]: payload,
});

interface IPayload {
    qualification: 'bachelor' | 'master' | 'specialist',
    data: {
        quantity: number
    }
}
/**
 * {QUANTITY_OP_ALL: {
 *       bachelor: [{quantity: 1}],
 *       master: [{quantity: 1}]
 *   }
 * }
 * */
const SetQuantityOPAll = (state: SimpleStatState, { payload }: {payload: IPayload}): SimpleStatState => {
    const cloneQuantityOpAll: IQuantityOpAll = {...state[fields.QUANTITY_OP_ALL]}
    const cloneQuantity = cloneQuantityOpAll[payload.qualification]

    if(cloneQuantity?.length) {
        return {
            ...state,
            // @ts-ignore
            [fields.QUANTITY_OP_ALL]: {
                ...cloneQuantityOpAll,
                [payload.qualification]: [
                    ...cloneQuantity,
                    {quantity: payload.data.quantity}
                ]
            },
        }
    } else {
        return {
            ...state,
            [fields.QUANTITY_OP_ALL]: {
                ...cloneQuantityOpAll,
                [payload.qualification]: [
                    {quantity: payload.data.quantity}
                ]
            },
        }
    }
};

const SetRPDwithoutSU = (state: SimpleStatState, {payload}: any): SimpleStatState=>({
    ...state,
    [fields.RPD_WITHOUT_SU]: payload,
});

const SetRPDinSU = (state: SimpleStatState, {payload}: any): SimpleStatState=>({
    ...state,
    [fields.RPD_IN_SU]: payload,
});

const SetRPDinAP = (state: SimpleStatState, {payload}: any): SimpleStatState=>({
    ...state,
    [fields.RPD_IN_AP]: payload,
});

const SetSU = (state: SimpleStatState, {payload}: any): SimpleStatState=>({
    ...state,
    [fields.SU]: payload,
});

const SetAP = (state: SimpleStatState, {payload}: any): SimpleStatState=>({
    ...state,
    [fields.AP]: payload,
});

const SetRPDinSEMESTER = (state: SimpleStatState, {payload}: any): SimpleStatState=>({
    ...state,
    [fields.RPD_IN_SEMESTER]: payload,
});

export const reducer = createReducer(initialSimpleStatState,{
    [actions.SetSimpleStat.type]: SetSimpleStat,
    [actions.ChangeCH.type]: ChangeCH,
    [actions.changeQualification.type]: ChangeQualification,
    [actions.SetQuantityRPD.type]: SetQuantityRPD,
    [actions.changeYear.type]: ChangeYear,
    [actions.SetQuantityOP.type] :SetQuantityOP,
    [actions.SetQuantityOPAll.type] :SetQuantityOPAll,
    [actions.SetRPDwithoutSU.type]: SetRPDwithoutSU,
    [actions.SetRPDinSU.type]: SetRPDinSU,
    [actions.ChangeStatus.type]: ChangeStatus,
    [actions.ChangeSemester.type]: ChangeSemester,
    [actions.SetSU.type]:SetSU,
    [actions.SetAP.type]:SetAP,
    [actions.ChangeAP.type]:ChangeAP,
    [actions.SetRPDinAP.type]:SetRPDinAP,
    [actions.ChangeSU.type]:ChangeSU,
    [actions.SetRPDinSEMESTER.type]:SetRPDinSEMESTER,
});