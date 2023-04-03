import {WithStyles} from '@mui/styles';
import styles from "./EvaluationCertificationTotalList.styles";
import {EvaluationToolType} from "../types";

export interface EvaluationCertificationTotalListProps extends WithStyles<typeof styles>{
    extraPoints: number;
    semesterCount: number;
    intermediateCertificationList: Array<EvaluationToolType>
    evaluationToolsList: Array<EvaluationToolType>
}