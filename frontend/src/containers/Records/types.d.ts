import { fields} from './enum'
import {WithStyles} from "@material-ui/core";
import styles from "./Records.styles";
export interface StatisticsActions {
    GetSimpleStat: any;
    SetSimpleStat:any;
    ChangeCH: any;
    changeQualification: any;
    GetQuantityRPD: any;
    SetQuantityRPD: any;
    changeYear: any;
    GetQuantityOP: any;
    SetQuantityOP: any;
    GetQuantityOPAll: any;
    SetQuantityOPAll: any;
    GetRPDwithoutSU: any;
    SetRPDwithoutSU: any;
    GetRPDinSU: any;
    SetRPDinSU: any;
    ChangeStatus: any;
    ChangeSemester: any;
    GetSU:any;
    SetSU:any;
    GetAP:any;
    SetAP:any;
    ChangeAP:any;
    GetRPDinAP:any;
    SetRPDinAP:any;
    ChangeSU:any;
    GetRPDinSEMESTER:any;
    SetRPDinSEMESTER:any;
}

export interface IQuantityOpItem {
    quantity: number
}
export interface IQuantityOpAll {
    [qualification: string]: [IQuantityOpItem] | null
}

export interface SimpleStatState {
    [fields.SIMPLE_STATE]: any;
    [fields.CURRENT_CH]: any;
    [fields.IS_VISIBLE]: any;
    [fields.QUALIFICATION]: any;
    [fields.QUALIFICATIONS_ALL]: string[];
    [fields.QUANTITY_RPD]: any;
    [fields.YEAR]: any;
    [fields.YEARS_ALL]: string[];
    [fields.QUANTITY_OP]: any;
    [fields.QUANTITY_OP_ALL]: IQuantityOpAll
    [fields.RPD_WITHOUT_SU]: any;
    [fields.RPD_IN_SU]: any;
    [fields.STATUS]: any;
    [fields.SEMESTER]:any;
    [fields.SU]:any;
    [fields.AP]:any;
    [fields.APuse]:any;
    [fields.RPD_IN_AP]:any;
    [fields.SUuse]: any;
    [fields.RPD_IN_SEMESTER]:any;
}
export interface StructuralUnitsSelectorProps {
    onChange: (value: number) => void,
    value: number
}

export interface RecordsProops extends WithStyles<typeof styles>{
    actions: StatisticsActions;
    CURRENT_CH: any;
    SIMPLE_STATE:any;
    IS_VISIBLE:any;
    QUALIFICATION: any;
    QUALIFICATIONS_ALL: any;
    QUANTITY_RPD: any;
    YEAR: any;
    YEARS_ALL: string[];
    QUANTITY_OP: any;
    QUANTITY_OP_ALL: any;
    RPD_WITHOUT_SU:any;
    RPD_IN_SU: any;
    STATUS: any;
    SEMESTER: any;
    SU:any;
    AP:any;
    APuse:any;
    RPD_IN_AP:any;
    SUuse:any;
    RPD_IN_SEMESTER: any;
}