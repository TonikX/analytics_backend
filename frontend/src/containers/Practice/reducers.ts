import {practicePageState} from "./types";
import createReducer from "../../store/createReducer";
import {PracticeFields, TemplateTextPracticeFields} from "./enum";
import actions from "./actions";

export const GENERAL_PATH = 'practice';

export const initialState: practicePageState = {
    validation: {
        shownErroredFields: [],
        erroredFields: [],
    },
    isError: false,
    practice: {
        [PracticeFields.ID]: 1,
        [PracticeFields.PRACTICE_BASE]: 1,
        [PracticeFields.DISCIPLINE_CODE]: '',
        [PracticeFields.TITLE]: '',
        [PracticeFields.YEAR]: 0,
        [PracticeFields.AUTHORS]: '',
        [PracticeFields.OP_LEADER]: '',
        [PracticeFields.LANGUAGE]: '',
        [PracticeFields.QUALIFICATION]: '',
        [PracticeFields.KIND_OF_PRACTICE]: '',
        [PracticeFields.TYPE_OF_PRACTICE]: '',
        [PracticeFields.WAY_OF_DOING_PRACTICE]: '',
        [PracticeFields.FORMAT_PRACTICE]: '',
        [PracticeFields.FEATURES_CONTENT_AND_INTERNSHIP]: '',
        [PracticeFields.FEATURES_INTERNSHIP]: '',
        [PracticeFields.ADDITIONAL_REPORTING_MATERIALS]: '',
        [PracticeFields.FORM_OF_CERTIFICATION_TOOLS]: '',
        [PracticeFields.PASSED_GREAT_MARK]: '',
        [PracticeFields.PASSED_GOOD_MARK]: '',
        [PracticeFields.PASSED_SATISFACTORILY_MARK]: '',
        [PracticeFields.NOT_PASSED_MARK]: '',
        [PracticeFields.STRUCTURAL_UNIT]: null,
        [PracticeFields.BIBLIOGRAPHIC_REFERENCE]: [],
        [PracticeFields.EDITORS]: [],
    },
    templateText: {
        [TemplateTextPracticeFields.ID]: 1,
        [TemplateTextPracticeFields.GENERAL_PROVISIONS]: '',
        [TemplateTextPracticeFields.STRUCTURE_AND_CONTENT]: '',
        [TemplateTextPracticeFields.REPORTING_MATERIALS]: '',
        [TemplateTextPracticeFields.OVZ]: '',
        [TemplateTextPracticeFields.EVALUATION_TOOLS_CURRENT_CONTROL]: '',
    }
}

const setPractice = (state: practicePageState, {payload}: any): practicePageState => ({
    ...state,
    practice: {
        ...state?.practice,
        ...payload,
    }
});

const setField = (state: practicePageState, {payload}: any): practicePageState => ({
    ...state,
    practice: {
        ...state?.practice,
        [payload.field]: payload.value,
    }
});

const setTemplateText = (state: practicePageState, {payload}: any): practicePageState => ({
    ...state,
    templateText: {
        ...state?.templateText,
        ...payload,
    }
});

const setError = (state: practicePageState, {payload}: any): practicePageState => ({
    ...state,
    isError: payload,
});

const setErroredFields = (state: practicePageState, {payload}: any): practicePageState => ({
    ...state,
    validation: {
        ...state.validation,
        erroredFields: payload,
    },
});

const addToErroredFields = (state: practicePageState, {payload}: any): practicePageState => {
    let erroredFields = state.validation.erroredFields;
    if (!erroredFields.includes(payload)) {
        erroredFields = erroredFields.concat([payload]);
    }
    return {
        ...state,
        validation: {
            ...state.validation,
            erroredFields,
        },
    }
};

const removeFromErroredFields = (state: practicePageState, {payload}: any): practicePageState => {
    return {
        ...state,
        validation: {
            ...state.validation,
            erroredFields: state.validation.erroredFields.filter(field => field !== payload),
            shownErroredFields: state.validation.shownErroredFields.filter(field => field !== payload),
        },
    }
};

const showErrors = (state: practicePageState): practicePageState => {
    return {
        ...state,
        validation: {
            ...state.validation,
            shownErroredFields: [...state.validation.erroredFields],
        },
    }
};

const showErroredField = (state: practicePageState, {payload}: any): practicePageState => {
    if (!state.validation.erroredFields.includes(payload)) throw new Error('trying to show a correct field as errored')
    if (state.validation.shownErroredFields.includes(payload)) return state; // already shown
    return {
        ...state,
        validation: {
            ...state.validation,
            shownErroredFields: [...state.validation.shownErroredFields, payload],
        },
    }
};

const hideErroredField = (state: practicePageState, {payload}: any): practicePageState => {
    return {
        ...state,
        validation: {
            ...state.validation,
            shownErroredFields: state.validation.shownErroredFields.filter(field => field !== payload),
        },
    }
};

export const reducer = createReducer(initialState, {
    [actions.setPractice.type]: setPractice,
    [actions.setField.type]: setField,
    [actions.setTemplateText.type]: setTemplateText,
    [actions.setError.type]: setError,
    [actions.setErroredFields.type]: setErroredFields,
    [actions.addToErroredFields.type]: addToErroredFields,
    [actions.removeFromErroredFields.type]: removeFromErroredFields,
    [actions.showErrors.type]: showErrors,
    [actions.showErroredField.type]: showErroredField,
    [actions.hideErroredField.type]: hideErroredField,
});