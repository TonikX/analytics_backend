import {CertificationFields} from "./enum";

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
            max: 2030,
            message: 'Введите год между 1990 и 2030',
        }
    },
    [CertificationFields.DISCIPLINE_CODE]: {
        presence,
        number,
    }
} as any;

const validateNumber = (value: string) => {
    if (Number.isNaN(Number(value)) || !Number.isInteger(Number(value))) {
        return number;
    }
}

export const validate = (field: CertificationFields, value: string): Error => {
    const rules = validationRules[field];
    if (!rules) return null;

    if (rules.presence) {
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