import {rootState} from "../../store/reducers";
import {
    getPlanQualifications,
    getWorkProgramEvaluationToolsList,
    getWorkProgramField,
    getWorkProgramIntermediateCertificationList
} from "./getters";
import {EvaluationToolFields, fields, WorkProgramGeneralFields, workProgramSectionFields} from "./enum";
import {EvaluationToolType, IntermediateCertificationType, SectionType} from "./types";
import {getAllHours, getHoursArray} from "./utils";
import {
    ALL_LEVELS_QUALIFICATION,
    BACHELOR_QUALIFICATION,
    SPECIALIST_QUALIFICATION,
    specializationObject
} from "./constants";
import {parseInt} from "lodash";


export const getValidationErrors = (state: rootState): string[] => {

    const rules = [
        // addPlanError,
        addAuthorsErrors,
        addDescriptionErrors,
        addSectionErrors,
        addTopicsErrors,
        addTotalHoursErrors,
        addEvaluationToolsErrors,
        addQualificationErrors,
        addPrerequisitesErrors,
        // addResultsErrors,
        addReferencesErrors,
        // addIntermediateCertificationErrors,
        addTotalHoursWithEvaluationCertificationHours,
    ]

    const errors: string[] = [];
    rules.forEach((rule: (state: rootState, errors: string[]) => void) => rule(state, errors))

    return errors;
}

const getTotalHours = (sections: Array<SectionType>) => {
    let count = 0;

    sections.forEach((section: SectionType) => {
        count += Boolean(section[workProgramSectionFields.TOTAL_HOURS]) ? parseFloat(String(section[workProgramSectionFields.TOTAL_HOURS])) : 0;
    })

    return count;
};

const getEvaluationToolsMaxSum = (evaluationTools: Array<EvaluationToolType>) => {
    let sum = 0;
    evaluationTools.forEach((item) => {
        sum += item[EvaluationToolFields.MAX];
    });
    return sum;
}

const getIntermediateCertificationMaxSum = (evaluationTools: Array<IntermediateCertificationType>) => {
    let sum = 0;
    evaluationTools.forEach((item) => {
        sum += item[EvaluationToolFields.MAX];
    });
    return sum;
}

const addTotalHoursWithEvaluationCertificationHours = (state: rootState, errors: string[]) => {
    const semesterCount = getWorkProgramField(state, WorkProgramGeneralFields.SEMESTER_COUNT);
    const evaluationToolsList = getWorkProgramEvaluationToolsList(state);
    const qualification = getWorkProgramField(state, fields.WORK_PROGRAM_QUALIFICATION);
    const bars = getWorkProgramField(state, WorkProgramGeneralFields.BARS);
    const fullSum = getEvaluationToolsMaxSum(evaluationToolsList) + getIntermediateCertificationMaxSum(getWorkProgramIntermediateCertificationList(state))

    if (fullSum % 100 !== 0 && qualification === BACHELOR_QUALIFICATION && bars) {
        errors.push('Сумма баллов за оценочные средства и оценочные средства промежуточной аттестации не 100 за каждый семестр');
    }
}

const addPlanError = (state: rootState, errors: string[]) => {
    const educationalPlans = getWorkProgramField(state, 'work_program_in_change_block')

    const isOffertaOn = getWorkProgramField(state, WorkProgramGeneralFields.OFFERTA);

    if (educationalPlans.length === 0 && !isOffertaOn){
        errors.push('Дисциплина не включена ни в один учебный план');
    }
}

const addSectionErrors =  (state: rootState, errors: string[]) => {
    const sections = getWorkProgramField(state, fields.WORK_PROGRAM_SECTIONS);
    if (!sections.length){
        errors.push('Кол-во разделов должно быть больше 0');
    }
}

const addTopicsErrors =  (state: rootState, errors: string[]) => {
    const sections = getWorkProgramField(state, fields.WORK_PROGRAM_SECTIONS);
    sections.forEach((section: SectionType) => {
        if (!section.topics?.length){
            errors.push(`Кол-во тем в разделе "${section.name}" должно быть больше 0`)
        }
    });
}

const addTotalHoursErrors = (state: rootState, errors: string[]) => {
    const sections = getWorkProgramField(state, fields.WORK_PROGRAM_SECTIONS);
    const lectureHours = getHoursArray(getWorkProgramField(state, 'lecture_hours_v2'));
    const practiceHours = getHoursArray(getWorkProgramField(state, 'practice_hours_v2'));
    const labHours = getHoursArray(getWorkProgramField(state, 'lab_hours_v2'));
    const srsHours = getHoursArray(getWorkProgramField(state, 'srs_hours_v2'));

    const totalHours = getWorkProgramField(state, fields.WORK_PROGRAM_ALL_HOURS) || getAllHours(lectureHours, practiceHours, labHours, srsHours);
    const currentTotalHours = getTotalHours(sections).toFixed(2);

    if (totalHours === 0){
        errors.push('Общее кол-во часов не может быть 0');
    } else if (parseFloat(totalHours) !== parseFloat(currentTotalHours)){
        errors.push('Ошибка в часах, проверьте часы в дисциплине');
    }

    if (totalHours % 36 !== 0){
        errors.push('Общее кол-во должно делиться на 36 без остатка');
    }
}

const addEvaluationToolsErrors = (state: rootState, errors: string[]) => {
    const sections = getWorkProgramField(state, fields.WORK_PROGRAM_SECTIONS);
    const evaluationToolsList = getWorkProgramEvaluationToolsList(state);
    const isBarsOn = getWorkProgramField(state, WorkProgramGeneralFields.BARS);
    const isOffertaOn = getWorkProgramField(state, WorkProgramGeneralFields.OFFERTA);

    if (!evaluationToolsList.length && !isOffertaOn){
        errors.push('В РПД отсутствуют оценочные средства');
    }

    // if (sections.some((s: any) => s.evaluation_tools.length === 0)) {
    //     errors.push('У каждого раздела должно быть оценочное средство');
    // }
    // if (isBarsOn) {
    //     addEvaluationToolsErrorsWithBars(state, errors);
    // } else {
    //     addEvaluationToolsErrorsWithoutBars(state, errors);
    // }

}

const addEvaluationToolsErrorsWithoutBars = (state: rootState, errors: string[]) => {
    const evaluationToolsList = getWorkProgramEvaluationToolsList(state);
    if (evaluationToolsList.some((tool: any) => tool.description.length < 300)) {
        errors.push('Описание каждого из оценочных средств должно быть не короче 300 знаков');
    }
}

const addEvaluationToolsErrorsWithBars = (state: rootState, errors: string[]) => {
    const evaluationToolsList = getWorkProgramEvaluationToolsList(state) as Array<any>;
    if (evaluationToolsList.length < 2) {
        errors.push(`Дисциплина реализуется в БаРС, необходимо хотя бы два оценочных средства (сейчас ${evaluationToolsList.length})`);
    }
    const maxSum = evaluationToolsList.map(t => t.max)
        .map(parseInt)
        .reduce((sum, current) => sum + current, 0); // no sum function on number[] ??
    if (maxSum < 60 || maxSum > 80) {
        errors.push(`Сумма баллов по оценочным средствам должна быть между 60 и 80, сейчас ${maxSum}`);
    }
}

const addAuthorsErrors = (state: rootState, errors: string[]) => {
    const authors = getWorkProgramField(state, WorkProgramGeneralFields.AUTHORS);

    if (!authors || !authors.length) {
        errors.push('Авторский состав не может быть пустым');
    }
}

const addDescriptionErrors = (state: rootState, errors: string[]) => {
    const description = getWorkProgramField(state, WorkProgramGeneralFields.DESCRIPTION);

    if (!description || !description.length) {
        errors.push('Описание программы не может быть пустым');
    }
}

const addQualificationErrors = (state: rootState, errors: string[]) => {
    const qualification = getWorkProgramField(state, fields.WORK_PROGRAM_QUALIFICATION);
    const isBarsOn = getWorkProgramField(state, WorkProgramGeneralFields.BARS);

    if (qualification === ALL_LEVELS_QUALIFICATION || qualification === BACHELOR_QUALIFICATION) {
        // bars must be on
        if (!isBarsOn) {
            errors.push(`Если уровень образовательной программы "${specializationObject[BACHELOR_QUALIFICATION]}" 
            или "${specializationObject[ALL_LEVELS_QUALIFICATION]}", то дисциплина должна реализовываться в БаРС`);
        }
    }

    // if (qualification !== ALL_LEVELS_QUALIFICATION) {
    //     const planQualifications = getPlanQualifications(state).filter((p: string) => p !== ALL_LEVELS_QUALIFICATION);
    //     for (const planQualification of planQualifications) {
    //         if (planQualification === BACHELOR_QUALIFICATION && qualification === SPECIALIST_QUALIFICATION) continue;
    //         if (planQualification === SPECIALIST_QUALIFICATION && qualification === BACHELOR_QUALIFICATION) continue;
            // bachelors and specialist accept each other
            // if (planQualification !== qualification) {
            //     errors.push('Уровень образовательной программы должен соответствовать уровню каждого из учебных планов')
            // }
        // }
    // }
}

const addPrerequisitesErrors = (state: rootState, errors: string[]) => {
    const prerequisites = getWorkProgramField(state, fields.WORK_PROGRAM_PREREQUISITES);

    if (!prerequisites || !prerequisites.length) {
        errors.push('Должен быть хотя бы один пререквизит');
    }
}

const addResultsErrors = (state: rootState, errors: string[]) => {
    const results = getWorkProgramField(state, fields.WORK_PROGRAM_RESULTS);
    const prerequisites = getWorkProgramField(state, fields.WORK_PROGRAM_PREREQUISITES);
    const evaluationToolsList = getWorkProgramEvaluationToolsList(state);

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

    for (const result of results) {
        const tools = result.evaluation_tool;
        if (!tools || tools.length < 1) {
            errors.push(`У результата "${result.item.name}" не указано оценочных средств`);
        }
    }

    const usedTools = new Set();
    for (const result of results) {
        for (const tool of result.evaluation_tool) {
            usedTools.add(tool.id);
        }
    }

    const unusedToolNames: string[] = [];
    for (const tool of evaluationToolsList) {
        if (!usedTools.has(tool.id)) {
            unusedToolNames.push(tool.name);
        }
    }

    if (unusedToolNames.length === 1) {
        errors.push(`Оценочное средство "${unusedToolNames[0]}" не использовано в результатах`)
    } else if (unusedToolNames.length > 1) {
        errors.push(`Оценочные средства ${unusedToolNames.map((s: string) => `"${s}"`).join(", ")} не использованы в результатах`)
    }
}

const addReferencesErrors = (state: rootState, errors: string[]) => {
    const references = getWorkProgramField(state, fields.WORK_PROGRAM_BIBLIOGRAPHIC_REFERENCE);

    if (!references || !references.length) {
        errors.push('Должен быть хотя бы один источник');
    }
}

const addIntermediateCertificationErrors = (state: rootState, errors: string[]) => {
    const certificationTools = getWorkProgramIntermediateCertificationList(state) as Array<any>;
    const evaluationTools = getWorkProgramEvaluationToolsList(state) as Array<any>;
    const isBarsOn = getWorkProgramField(state, WorkProgramGeneralFields.BARS);

    if (certificationTools.some((tool: any) => tool?.description?.length < 300)) {
        errors.push('Оценочные средства промежуточной аттестации должны иметь описание не короче 300 знаков');
    }

    if (isBarsOn) {
        const evalSum = getToolsMaxSum(evaluationTools);
        const certSum = getToolsMaxSum(certificationTools);
        if (evalSum + certSum !== 100) {
            errors.push(`Сумма баллов по разделам 6 и 7 должна быть 100, сейчас ${evalSum + certSum}`);
        }
    }
}

const getToolsMaxSum = (tools: Array<any>) => {
    return tools.map(t => t.max)
        .map(parseInt)
        .reduce((sum, current) => sum + current, 0);
}