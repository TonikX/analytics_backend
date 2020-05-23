import React from 'react';
import get from 'lodash/get';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

import FirstStep from "./FirstStep";
import SecondStep from "./FirstStep/Selector";
import ThirdStep from "./ThirdStep";

import {WorkProgramProps} from './types';

import connect from './WorkProgram.connect';
import styles from './WorkProgram.styles';
import FourthStep from "./FourthStep";

class WorkProgram extends React.Component<WorkProgramProps> {
    state = {
        activeStep: 2
    };

    componentDidMount() {
        const workProgramId = get(this, 'props.match.params.id');

        this.props.actions.getWorkProgram(workProgramId);
        this.props.actions.setWorkProgramId(workProgramId);
    }

    handleStep = (number: number) => () => {
        this.setState({activeStep: number})
    };

    renderContent = () => {
        const {classes} = this.props;
        const {activeStep} = this.state;

        switch (activeStep) {
            case 0:
                return <>
                    <div className={classes.subItem}>
                        <FirstStep />
                    </div>
                </>;
            case 1:
                return <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>
                        Разделы
                    </Typography>

                    <ThirdStep />
                </div>;
            case 2:
                return <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>
                        Содержание дисциплины
                    </Typography>

                    <FourthStep />
                </div>;
        }
    }

    render() {
        const {classes} = this.props;
        const {activeStep} = this.state;

        const steps = ['Главное', 'Разделы', "Темы", "Содержание", "Оценочные средства", "Пререквизиты", "Результаты обучения"];

        return (
            <Paper className={classes.root}>
                <Stepper activeStep={activeStep}
                         orientation="vertical"
                         nonLinear
                         className={classes.stepper}
                >
                    {steps.map((label, index) => {

                        return (
                            <Step key={label}>
                                <StepButton onClick={this.handleStep(index)}
                                            completed={index === 1 || index === 0}
                                >
                                    {label}
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>

                <div className={classes.content}>
                    <Typography className={classes.title}>Описание рабочей программы дисциплины</Typography>

                    {this.renderContent()}
                </div>

            </Paper>
        );
    }
}

export default connect(withStyles(styles)(WorkProgram));
