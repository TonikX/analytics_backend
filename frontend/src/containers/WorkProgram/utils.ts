import get from 'lodash/get';
import {EvaluationToolType, IntermediateCertificationType, SectionType} from "./types";
import {EvaluationToolFields, fields, WorkProgramGeneralFields, workProgramSectionFields} from "./enum";
import {rootState} from "../../store/reducers";
import {
    getPlanQualifications,
    getWorkProgramEvaluationToolsList,
    getWorkProgramField,
    getWorkProgramIntermediateCertificationList
} from "./getters";
import {
    ALL_LEVELS_QUALIFICATION,
    BACHELOR_QUALIFICATION,
    MASTER_QUALIFICATION,
    specializationObject
} from "./constants";
import {parseInt} from "lodash";


export const getEvaluationToolsMaxSum = (evaluationTools: Array<EvaluationToolType>) => {
    let sum = 0;

    evaluationTools.forEach((item) => {
        sum += item[EvaluationToolFields.MAX];
    });

    return sum;
}
export const getIntermediateCertificationMaxSum = (evaluationTools: Array<IntermediateCertificationType>) => {
    let sum = 0;

    evaluationTools.forEach((item) => {
        sum += item[EvaluationToolFields.MAX];
    });

    return sum;
}


export const getHoursArray = (items: string): Array<string> => {
    if (!items || !items?.split) return [];
    const splitterArray = items.split(',');
    const hoursArray = []

    for (let index = 0; index < 10; index++){
        hoursArray[index] = splitterArray[index] ? parseFloat(splitterArray[index]).toFixed(2) : "0";
    }

    return hoursArray;
}

export const getAllHours = (lectureHours: Array<string>, practiceHours: Array<string>, labHours: Array<string>, srsHours: Array<string>) => {
    const lectureHoursTotal = lectureHours.reduce((count: number, item: string): number => count + parseFloat(item), 0);
    const practiceHoursTotal = practiceHours.reduce((count: number, item: string): number => count + parseFloat(item), 0);
    const labHoursTotal = labHours.reduce((count: number, item: string): number => count + parseFloat(item), 0);
    const srsHoursTotal = srsHours.reduce((count: number, item: string): number => count + parseFloat(item), 0);

    return (lectureHoursTotal + practiceHoursTotal + labHoursTotal) * 1.1 + srsHoursTotal;
}

const getTotalHours = (sections: Array<SectionType>) => {
    let count = 0;

    sections.forEach((section: SectionType) => {
        count += Boolean(section[workProgramSectionFields.TOTAL_HOURS]) ? parseFloat(String(section[workProgramSectionFields.TOTAL_HOURS])) : 0;
    })

    return count;
};

export const getValidateProgramErrors = (state: rootState): Array<string> => {
    const sections = getWorkProgramField(state, fields.WORK_PROGRAM_SECTIONS);
    const qualification = getWorkProgramField(state, fields.WORK_PROGRAM_QUALIFICATION);
    const semesterCount = getWorkProgramField(state, WorkProgramGeneralFields.SEMESTER_COUNT);
    const errors = [];
    const evaluationToolsList = getWorkProgramEvaluationToolsList(state);

    const lectureHours = getHoursArray(getWorkProgramField(state, 'lecture_hours_v2'));
    const practiceHours = getHoursArray(getWorkProgramField(state, 'practice_hours_v2'));
    const labHours = getHoursArray(getWorkProgramField(state, 'lab_hours_v2'));
    const srsHours = getHoursArray(getWorkProgramField(state, 'srs_hours_v2'));
    const totalHours = getWorkProgramField(state, fields.WORK_PROGRAM_ALL_HOURS) || getAllHours(lectureHours, practiceHours, labHours, srsHours);
    const currentTotalHours = getTotalHours(sections).toFixed(2);
    const educationalPlans = getWorkProgramField(state, 'work_program_in_change_block')

    const authors = getWorkProgramField(state, WorkProgramGeneralFields.AUTHORS);
    const description = getWorkProgramField(state, WorkProgramGeneralFields.DESCRIPTION);
    const isBarsOn = getWorkProgramField(state, WorkProgramGeneralFields.BARS);
    const prerequisites = getWorkProgramField(state, fields.WORK_PROGRAM_PREREQUISITES);
    const references = getWorkProgramField(state, fields.WORK_PROGRAM_BIBLIOGRAPHIC_REFERENCE);
    const results = getWorkProgramField(state, fields.WORK_PROGRAM_RESULTS);


    if (educationalPlans.length === 0){
        errors.push('PLAN_ERROR');
        return errors
    }

    if (!sections.length){
        errors.push('Кол-во разделов должно быть больше 0');
    }

    if (totalHours === 0){
        errors.push('Общее кол-во часов не может быть 0');
    } else if (parseFloat(totalHours) !== parseFloat(currentTotalHours)){
        errors.push('Ошибка в часах, проверьте часы в дисциплине');
    }

    if (totalHours % 36 !== 0){
        errors.push('Общее кол-во должно делиться на 36 без остатка');
    }

    sections.forEach((section: SectionType) => {
        if (!section.topics?.length){
            errors.push(`Кол-во тем в разделе "${section.name}" должно быть больше 0`)
        }
    });

    if (!evaluationToolsList.length){
        errors.push('В РПД отсутствуют оценочные средства');
    }

    const fullSum = getEvaluationToolsMaxSum(evaluationToolsList) + getIntermediateCertificationMaxSum(getWorkProgramIntermediateCertificationList(state))

    // if (fullSum / semesterCount !== 100 && qualification !== MASTER_QUALIFICATION){
    //     errors.push('Заполните до конца раздел оценочные средства');
    // }

    if (!authors || !authors.length) {
        errors.push('Авторский состав не может быть пустым');
    }

    if (!description || description.length < 700) {
        errors.push('Описание не может быть меньше 700 знаков');
    }

    if (qualification === ALL_LEVELS_QUALIFICATION || qualification === BACHELOR_QUALIFICATION) {
        // bars must be on
        if (!isBarsOn) {
            errors.push(`Если уровень образовательной программы "${specializationObject[BACHELOR_QUALIFICATION]}" 
            или "${specializationObject[ALL_LEVELS_QUALIFICATION]}", то дисциплина должна реализовываться в БаРС`);
        }
    }

    if (!prerequisites || !prerequisites.length) {
        errors.push('Должен быть хотя бы один пререквизит');
    }

    if (!references || !references.length) {
        errors.push('Должен быть хотя бы один источник');
    }

    if (qualification !== ALL_LEVELS_QUALIFICATION) {
        const planQualifications = getPlanQualifications(state).filter((p: string) => p !== ALL_LEVELS_QUALIFICATION);
        if (planQualifications.some((q: string) => q !== qualification)) {
            errors.push('Уровень образовательной программы должен соответствовать уровню каждого из учебных планов')
        }
    }

    if (!results || !results.length) {
        errors.push('Должен быть хотя бы один результат обучения');
    }

    for (const result of results) {
        for (const prerequisite of prerequisites) {
            const resLevel = parseInt(result.masterylevel);
            const preLevel = parseInt(prerequisite.masterylevel);
            if (result.item.id == prerequisite.item.id && resLevel <= preLevel) {
                const resultName = result.item.name;
                errors.push(`Уровень освоения "${resultName}" в результате обучения должен повыситься`);
            }
        }
    }

    return errors;
}