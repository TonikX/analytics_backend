import React from 'react';
import get from 'lodash/get';

import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

import {WorkProgramProps} from './types';

import connect from './WorkProgram.connect';
import styles from './WorkProgram.styles';
import FourthStep from "./FourthStep";

class WorkProgram extends React.Component<WorkProgramProps> {
    componentDidMount() {
        const workProgramId = get(this, 'props.match.params.id');

        this.props.actions.getWorkProgram(workProgramId);
        this.props.actions.setWorkProgramId(workProgramId);
    }

    render() {
        // @ts-ignore
        const {classes} = this.props;

        return (
            <>
                <Typography className={classes.title}>Описание рабочей программы дисциплины</Typography>

                <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>1. Введите код программы и название дисциплины </Typography>

                    <FirstStep />
                </div>

                <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>
                        2. Место дисциплины в структуре образовательной программы высшего образования (ОП ВО)
                    </Typography>

                    <SecondStep />
                </div>

                <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>
                        3. Разделы
                    </Typography>

                    <ThirdStep />
                </div>

                <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>
                        4. Содержание дисциплины
                    </Typography>

                    <FourthStep />
                </div>
            </>
        );
    }
}

export default connect(withStyles(styles)(WorkProgram));
