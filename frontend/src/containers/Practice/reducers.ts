import {practicePageState} from "./types";
import createReducer from "../../store/createReducer";
import {PracticeFields} from "./enum";
import actions from "./actions";

export const GENERAL_PATH = 'practice';

export const initialState: practicePageState = {
    practice: {
        [PracticeFields.ID]: 1,
        [PracticeFields.YEAR]: 2022,
        [PracticeFields.AUTHORS]: "Denis Reznichenko",
        [PracticeFields.OP_LEADER]: "Denis",
        [PracticeFields.LANGUAGE]: "Russian",
        [PracticeFields.QUALIFICATION]: "Bachelors",
        [PracticeFields.KIND_OF_PRACTICE]: "kind of",
        [PracticeFields.TYPE_OF_PRACTICE]: "type of",
        [PracticeFields.WAY_OF_DOING_PRACTICE]: "way of",
        [PracticeFields.FORMAT_PRACTICE]: "format",
        [PracticeFields.FEATURES_CONTENT_AND_INTERNSHIP]: "features",
        [PracticeFields.ADDITIONAL_REPORTING_MATERIALS]: "no materials",
        [PracticeFields.FORM_OF_CERTIFICATION_TOOLS]: "exams",
        [PracticeFields.PASSED_GREAT_MARK]: "errthan good",
        [PracticeFields.PASSED_GOOD_MARK]: "some mistakes",
        [PracticeFields.PASSED_SATISFACTORILY_MARK]: "so-so",
        [PracticeFields.NOT_PASSED_MARK]: "bad af",
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