import {EvaluationToolType, IntermediateCertificationType} from "./types";
import {EvaluationToolFields} from "./enum";

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