import React from 'react';
import get from 'lodash/get';

import Typography from '@material-ui/core/Typography';
import CopyIcon from "@material-ui/icons/FileCopyOutlined";
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
import PlansAndDirections from "./PlansAndDirections";

import {WorkProgramProps} from './types';
import connect from './WorkProgram.connect';
import styles from './WorkProgram.styles';

class WorkProgram extends React.Component<WorkProgramProps> {
    state = {
        activeStep: 0
    };

    componentDidMount() {
        const workProgramId = this.getWorkProgramId();

        this.props.actions.getWorkProgram(workProgramId);
        this.props.actions.setWorkProgramId(workProgramId);
    }

    componentWillUnmount() {
        this.props.actions.pageDown();
    }

    handleStep = (number: number) => () => {
        this.setState({activeStep: number})
    };

    handleCloneProgram = () => {
        this.props.actions.cloneWorkProgram(this.getWorkProgramId());
    }

    getWorkProgramId = () => get(this, 'props.match.params.id');

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
            case 7:
                return <div className={classes.subItem}>
                    <Typography className={classes.subTitle}>
                        Связанные с рпд учебные планы и направления
                    </Typography>

                    <PlansAndDirections />
                </div>;
        }
    }

    render() {
        const {classes, workProgramTitle} = this.props;
        const {activeStep} = this.state;

        const steps = ['Главное',  "Пререквизиты", 'Разделы', "Темы", "Источники", "Оценочные средства", "Результаты обучения", "Cвязанные с рпд учебные планы и направления"];

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
                                            style={{textAlign: 'left'}}
                                >
                                    {label}
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>

                <div className={classes.content}>
                    <Typography className={classes.title}>
                        <div>Описание рабочей программы дисциплины <span style={{fontWeight: 500}}>"{workProgramTitle}"</span></div>
                        <div className={classes.cloneButton} onClick={this.handleCloneProgram}> <CopyIcon/> Клонировать</div>
                    </Typography>

                    {this.renderContent()}
                </div>

            </Paper>
        );
    }
}

export default connect(withStyles(styles)(WorkProgram));
