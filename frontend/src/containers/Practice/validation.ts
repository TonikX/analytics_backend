import {PracticeFields} from "./enum";

export type Error = {
    message: string;
} | null

const presence = {
    message: 'Поле обязательно для заполнения',
}

const validationRules = {
    [PracticeFields.TITLE]: {
        presence,
    },
    [PracticeFields.AUTHORS]: {
        presence,
    },
    [PracticeFields.OP_LEADER]: {
        presence,
    },
    [PracticeFields.YEAR]: {
        presence,
        range: {
            min: 1990,
            max: 2030,
            message: 'Введите год между 1990 и 2030',
        }
    }
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

    if (rules.range) {
        if (Number.isNaN(Number(value))) {
            return {
                message: 'Введите число',
            };
        }
        const regex = /^[1-9]\d{3}$/
        if (!regex.test(value)) {
            return {
                message: rules.range.message,
            }
        }
        const num = Number(value);
        const min = rules.range.min;
        const max = rules.range.max;
        if (!Number.isInteger(num) || num < min || num > max) {
            return {
                message: rules.range.message,
            }
        }
    }

    return null;
}