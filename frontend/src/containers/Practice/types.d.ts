import {PracticeFields} from "./enum";

export type Id = number;

export interface practiceState {
    [PracticeFields.ID]: Id,
    [PracticeFields.YEAR]: number,
    [PracticeFields.AUTHORS]: string,
    [PracticeFields.OP_LEADER]: string,
    [PracticeFields.LANGUAGE]: string,
    [PracticeFields.QUALIFICATION]: string,
    [PracticeFields.KIND_OF_PRACTICE]: string,
    [PracticeFields.TYPE_OF_PRACTICE]: string,
    [PracticeFields.WAY_OF_DOING_PRACTICE]: string,
    [PracticeFields.FORMAT_PRACTICE]: string,
    [PracticeFields.FEATURES_CONTENT_AND_INTERNSHIP]: string,
    [PracticeFields.FEATURES_INTERNSHIP]: string,
    [PracticeFields.ADDITIONAL_REPORTING_MATERIALS]: string,
    [PracticeFields.FORM_OF_CERTIFICATION_TOOLS]: string,
    [PracticeFields.PASSED_GREAT_MARK]: string,
    [PracticeFields.PASSED_GOOD_MARK]: string,
    [PracticeFields.PASSED_SATISFACTORILY_MARK]: string,
    [PracticeFields.NOT_PASSED_MARK]: string,
    [PracticeFields.PRACTICE_BASE]: number,
    [PracticeFields.STRUCTURAL_UNIT]: number,
    [PracticeFields.BIBLIOGRAPHIC_REFERENCE]: Array<Id>,
}

export interface MinimalPracticeState {
    [PracticeFields.YEAR]: number,
    [PracticeFields.OP_LEADER]: string,
    [PracticeFields.AUTHORS]: string,
    [PracticeFields.FORM_OF_CERTIFICATION_TOOLS]: string,
}

export interface PracticeActions {
    createPractice: any
}