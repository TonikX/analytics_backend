import React from 'react';
import get from 'lodash/get';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

import General from "./General";
import Sections from "./Sections";
import Topics from "./Topics";
import Literature from "./Literature";
import EvaluationTools from "./EvaluationTools";
import Prerequisites from "./Prerequisites";
import Results from "./Results";

import {WorkProgramProps} from './types';
import connect from './WorkProgram.connect';
import styles from './WorkProgram.styles';

class WorkProgram extends React.Component<WorkProgramProps> {
    state = {
        activeStep: 0
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
                        <General />
                    </div>
                </>;
            case 1:
                return <div className={classes.subItem}>

                    <Typography className={classes.subTitle}>
                        Пререквизиты
                    </Typography>

                    <Prerequisites />
                </div>;
            case 2:
                return <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>
                        Разделы
                    </Typography>

                    <Sections />
                </div>;
            case 3:
                return <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>
                        Содержание дисциплины
                    </Typography>

                    <Topics />
                </div>;
            case 4:
                return <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>
                        Источники
                    </Typography>

                    <Literature />
                </div>;
            case 5:
                return <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>
                        Оценочные средства
                    </Typography>

                    <EvaluationTools />
                </div>;
            case 6:
                return <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>
                        Результаты обучения
                    </Typography>

                    <Results />
                </div>;
        }
    }

    render() {
        const {classes} = this.props;
        const {activeStep} = this.state;

        const steps = ['Главное',  "Пререквизиты", 'Разделы', "Темы", "Источники", "Оценочные средства", "Результаты обучения"];

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
                                            completed={false}
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
