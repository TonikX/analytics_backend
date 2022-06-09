import {CertificationFields} from "./enum";
import {PracticeFields} from "../Practice/enum";

export type Error = {
    message: string;
} | null

const presence = {
    message: 'Поле обязательно для заполнения',
}

const number = {
    message: 'Введите число',
}

const validationRules = {
    [CertificationFields.TITLE]: {
        presence,
    },
    [CertificationFields.AUTHORS]: {
        presence,
    },
    [CertificationFields.OP_LEADER]: {
        presence,
    },
    [CertificationFields.YEAR]: {
        presence,
        year: {
            min: 1990,
            max: (new Date()).getFullYear(),
            message: `Введите год между 1990 и ${(new Date()).getFullYear()}`,
        }
    },
    [CertificationFields.DISCIPLINE_CODE]: {
        presence,
        number,
    },
    [CertificationFields.ANTI_PLAGIARISM_ANALYSIS_TIME]: {
        presence,
    },
    [CertificationFields.PRE_DEFENCE_TIME]: {
        presence,
    },
    [CertificationFields.FILLING_AND_APPROVAL_TIME]: {
        presence,
    },
    [CertificationFields.WORK_ON_VKR_CONTENT_TIME]: {
        presence,
    },
    [PracticeFields.STRUCTURAL_UNIT]: {
        presence,
    }
} as any;

const validateNumber = (value: string) => {
    if (Number.isNaN(Number(value)) || !Number.isInteger(Number(value))) {
        return number;
    }
}

export const validate = (field: CertificationFields, value: any): Error => {
    const rules = validationRules[field];
    if (!rules) return null;

    if (rules.presence) {
        if (typeof value === "string") {
            if (/^\s*$/.test(value)) {
                return {
                    message: presence.message,
                };
            }
        }
        if (!value) {
            return {
                message: presence.message,
            };
        }
    }

    if (rules.year) {
        const err = validateNumber(value);
        if (err) return err;

        const regex = /^[1-9]\d{3}$/
        if (!regex.test(value)) {
            return {
                message: rules.year.message,
            }
        }
        const num = Number(value);
        const min = rules.year.min;
        const max = rules.year.max;
        if (!Number.isInteger(num) || num < min || num > max) {
            return {
                message: rules.year.message,
            }
        }
    }

    if (rules.number) {
        const err = validateNumber(value);
        if (err) return err;
    }

    return null;
}

export const getErroredFields = (state: any) => {
    const erroredFields = [];
    for (const [,field] of Object.entries(CertificationFields)) {
        const value = state[field];
        const error = validate(field, value);
        if (error) {
            erroredFields.push(field);
        }
    }
    return erroredFields;
}