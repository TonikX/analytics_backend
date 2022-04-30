import {practicePageState} from "./types";
import createReducer from "../../store/createReducer";
import {PracticeFields} from "./enum";
import actions from "./actions";

export const GENERAL_PATH = 'practice';

export const initialState: practicePageState = {
    practice: {
        [PracticeFields.ID]: 1,
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
        [PracticeFields.ADDITIONAL_REPORTING_MATERIALS]: '',
        [PracticeFields.FORM_OF_CERTIFICATION_TOOLS]: '',
        [PracticeFields.PASSED_GREAT_MARK]: '',
        [PracticeFields.PASSED_GOOD_MARK]: '',
        [PracticeFields.PASSED_SATISFACTORILY_MARK]: '',
        [PracticeFields.NOT_PASSED_MARK]: '',
        [PracticeFields.STRUCTURAL_UNIT]: null,
        [PracticeFields.BIBLIOGRAPHIC_REFERENCE]: [],
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

export const reducer = createReducer(initialState, {
    [actions.setPractice.type]: setPractice,
    [actions.setField.type]: setField,
});