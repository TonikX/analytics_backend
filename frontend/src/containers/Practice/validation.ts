import {PracticeFields} from "./enum";

export type Error = {
    message: string;
} | null

const presence = {
    message: 'Поле обязательно для заполнения',
}

const validationRules = {
    [PracticeFields.TITLE] : {
        presence,
    },
    [PracticeFields.AUTHORS] : {
        presence,
    },
    [PracticeFields.OP_LEADER]: {
        presence,
    },
} as any;

export const validate = (field: PracticeFields, value: string): Error => {
    const rules = validationRules[field];
    if (!rules) return null;

    if (rules.presence) {
        if (!value) {
            return {
                message: presence.message,
            };
        }
    }

    return null;
}