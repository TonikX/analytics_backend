import { PersonalityType } from "../Personalities/types";
import { fields, GroupFields } from "./enum";
import {groupType} from '../Personalities/types'

export interface personalityState extends PersonalityType {
    [fields.ID]: number | undefined,
    [fields.EMAIL]: string,
    [fields.FIRST_NAME]: string,
    [fields.LAST_NAME]: string,
    [fields.USERNAME]: string,
    [fields.GROUPS]: Array<groupType> | [],
    [fields.ISU_NUMBER]: number | string
}

export interface PersonalityActions {
    getPersonality: any;
    setPersonality: any;
    updateGroups: any;
}