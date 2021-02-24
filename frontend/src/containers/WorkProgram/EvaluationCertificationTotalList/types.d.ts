import {WithStyles} from "@material-ui/core";
import styles from "./EvaluationCertificationTotalList.styles";

export interface EvaluationCertificationTotalListProps extends WithStyles<typeof styles>{
    extraPoints: number;
    evaluationToolsMaxSum: number;
    intermediateCertificationMaxSum: number;
}