import React from "react";
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from "react-router-dom";

import styles from "./Practice.styles";
import connect from './Practice.connect';
import {PracticeProps} from "./types";
import get from "lodash/get";
import {PracticeFields, PracticeStepsRussianList} from "./enum";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Stepper from "@material-ui/core/Stepper";
import GeneralInfo from "./Steps/GeneralInfo";
import Assessment from "./Steps/Assessment";
import Features from "./Steps/Features";

class Practice extends React.Component<PracticeProps> {

    state = {
        activeStep: 0,
    };

    stepNameList = PracticeStepsRussianList;

    stepList = [<GeneralInfo/>, <Features/>, <Assessment/>, undefined]

    getPracticeId = () => get(this, 'props.match.params.id');

    componentDidMount() {
        this.props.actions.getPractice(this.getPracticeId());
    }

    openStep = (index: number) => () => {
        this.setState({
            ...this.state,
            activeStep: index,
        })
    }

    render() {
        const {classes, practice} = this.props;
        const {activeStep} = this.state;

        return (
            <Paper className={classes.root} component="div">
                <Stepper activeStep={activeStep}
                         orientation="vertical"
                         nonLinear
                         className={classes.stepper}
                >
                    {Object.values(this.stepNameList).map((label, index) => {
                        return (
                            <Step key={index} onClick={this.openStep(index)}>
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
                    Welcome to practice page,
                    id: {practice[PracticeFields.ID]},
                    authors: {practice[PracticeFields.AUTHORS]}
                    {
                        this.stepList[activeStep]
                    }

                </div>
            </Paper>
        )
    }
}

export default connect(withStyles(styles)(withRouter(Practice)));