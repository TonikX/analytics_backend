import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import {EvaluationCertificationTotalListProps} from "./types";

import connect from './EvaluationCertificationTotalList.connect';
import styles from './EvaluationCertificationTotalList.styles';
import Typography from "@material-ui/core/Typography";

class EvaluationCertificationTotalList extends React.PureComponent<EvaluationCertificationTotalListProps> {
    render() {
        const {classes, extraPoints, evaluationToolsMaxSum, intermediateCertificationMaxSum} = this.props;

        return (
            <div>
                <Typography>
                    <b>Оценочные средства:</b> {evaluationToolsMaxSum}
                </Typography>
                <Typography>
                    <b>Аттестационные оценочные средства:</b> {intermediateCertificationMaxSum}
                </Typography>
                {evaluationToolsMaxSum + intermediateCertificationMaxSum > 100 &&
                    <Typography className={classes.error}>
                        Сумма оценочных и аттестационных баллов не может быть больше 100
                    </Typography>
                }
                <Typography>
                    <b>Дополнительные баллы:</b> {extraPoints}
                </Typography>
            </div>
        );
    }
}

export default connect(withStyles(styles)(EvaluationCertificationTotalList));
