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
import Literature from "./Steps/Literature";
import GeneralProvisions from "./Steps/GeneralProvisions";
import Structure from "./Steps/Structure";
import ReportingMaterials from "./Steps/ReportingMaterials";
import DisabledPeopleInfo from "./Steps/DisabledPeopleInfo";
import ErrorPage from "../../components/ErrorPage";

class Practice extends React.Component<PracticeProps> {

    state = {
        activeStep: 0,
    };

    stepNameList = PracticeStepsRussianList;

    stepList = [<GeneralInfo/>, <GeneralProvisions/>, <Structure/>, <ReportingMaterials/>, <DisabledPeopleInfo/>,
        <Assessment/>, <Literature/>]

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

    openStep = (index: number) => () => {
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
                    {
                        this.stepList[activeStep]
                    }
                </div>
            </Paper>
        )
    }
}

export default connect(withStyles(styles)(withRouter(Practice)));