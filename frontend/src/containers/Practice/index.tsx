import React from "react";
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from "react-router-dom";

import styles from "./Practice.styles";
import connect from './Practice.connect';
import {PracticeProps} from "./types";
import get from "lodash/get";
import {ExpertiseStatus, PermissionsInfoFields, PracticeFields} from "./enum";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Stepper from "@material-ui/core/Stepper";
import ErrorPage from "../../components/ErrorPage";
import Download from "./components/Download";
import {STEPS} from "./constants";
import WorkProgramStatus from "../../components/WorkProgramStatus/WorkProgramStatus";
import SendToExpertise from "./components/SendToExpertise";
import Button from "@material-ui/core/Button";

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

    handleSendToRework = (userExpertiseId: number) => () => {
        this.props.actions.sendPracticeToRework(userExpertiseId);
    }

    handleApprovePractice = (userExpertiseId: number) => () => {
        this.props.actions.approvePractice(userExpertiseId);
    }


    render() {
        const {classes, isError, permissionsInfo} = this.props;
        const {activeStep} = this.state;

        const workProgramStatus = permissionsInfo[PermissionsInfoFields.EXPERTISE_STATUS] ?? ExpertiseStatus.WORK;

        const expertiseStatus = permissionsInfo[PermissionsInfoFields.EXPERTISE_STATUS];

        const userExpertiseStatus = permissionsInfo[PermissionsInfoFields.YOUR_APPROVE_STATUS];

        const showSendToExpertise = expertiseStatus === ExpertiseStatus.WORK
            || expertiseStatus === ExpertiseStatus.REWORK
            || expertiseStatus === null;

        const userExpertiseId =
            this.props.practice[PracticeFields.PERMISSIONS_INFO][PermissionsInfoFields.USER_EXPERTISE_ID];

        const showApproveAndRework = Boolean(permissionsInfo[PermissionsInfoFields.CAN_APPROVE])
            && Boolean(userExpertiseId)
            && expertiseStatus === ExpertiseStatus.EXPERTISE
            && userExpertiseStatus === ExpertiseStatus.EXPERTISE;

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
                <div className={classes.rightButtons}>
                    <WorkProgramStatus status={workProgramStatus}/>
                    <div className={classes.rightButton}>
                        <Download/>
                    </div>
                    {
                        (showSendToExpertise &&
                            <div className={classes.rightButton}>
                                <SendToExpertise openStep={this.openStep} practiceId={this.getPracticeId()}/>
                            </div>
                        )
                    }
                    {
                        (
                            showApproveAndRework &&
                            <>
                                <Button variant="outlined"
                                        className={classes.rightButton}
                                        onClick={this.handleSendToRework(userExpertiseId!!)}>
                                    Вернуть на доработку
                                </Button>
                                <Button variant="outlined"
                                        className={classes.rightButton}
                                        onClick={this.handleApprovePractice(userExpertiseId!!)}>
                                    Одобрить рабочую программу
                                </Button>
                            </>
                        )
                    }
                </div>
            </Paper>
        )
    }
}

export default connect(withStyles(styles)(withRouter(Practice)));