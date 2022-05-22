import React from "react";
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from "react-router-dom";

import styles from "./Practice.styles";
import connect from './Practice.connect';
import {PracticeProps} from "./types";
import get from "lodash/get";
import {PracticeFields} from "./enum";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Stepper from "@material-ui/core/Stepper";
import ErrorPage from "../../components/ErrorPage";
import Download from "./components/Download";
import SendToExpertise from "./components/SendToExpertise";
import {STEPS} from "./constants";

class Practice extends React.Component<PracticeProps> {

    state = {
        activeStep: 0,
    };

    stepList = STEPS.map(step => step.component);
    stepNameList = STEPS.map(step => step.name);

    getPracticeId = () => get(this, 'props.match.params.id');

    getTemplateText = () => {
        const id = this.props.practice[PracticeFields.PRACTICE_BASE];
        this.props.actions.getTemplateText(id);
    }

    componentDidMount() {
        this.getPractice();
        this.getTemplateText();
    }

    getPractice = () => {
        this.props.actions.getPractice(this.getPracticeId());
    }

    handleOpenStep = (index: number) => () => {
        this.setState({
            ...this.state,
            activeStep: index,
        })
    }

    openStep = (index: number) => {
        this.setState({
            ...this.state,
            activeStep: index,
        })
    }


    render() {
        const {classes, isError} = this.props;
        const {activeStep} = this.state;

        if (isError) {
            return <ErrorPage/>;
        }

        return (
            <Paper className={classes.root} component="div">
                <Stepper activeStep={activeStep}
                         orientation="vertical"
                         nonLinear
                         className={classes.stepper}
                >
                    {Object.values(this.stepNameList).map((label, index) => {
                        return (
                            <Step key={index} onClick={this.handleOpenStep(index)}>
                                <StepButton completed={false}
                                            style={{textAlign: 'left',}}
                                >
                                    {label}
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>
                <div className={classes.content}>
                    {
                        this.stepList[activeStep]
                    }
                </div>
                <div>
                    <Download/>
                    <SendToExpertise openStep={this.openStep}/>
                </div>
            </Paper>
        )
    }
}

export default connect(withStyles(styles)(withRouter(Practice)));