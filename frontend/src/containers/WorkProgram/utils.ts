import {EvaluationToolType, IntermediateCertificationType, SectionType} from "./types";
import {EvaluationToolFields, fields, WorkProgramGeneralFields, workProgramSectionFields} from "./enum";


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
