import React from "react";
import {Paper, WithStyles} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {CertificationActions, CertificationState} from "./types";
import connect from "./connect";
import get from "lodash/get";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import {CertificationFields} from "./enum";
import ErrorPage from "../../components/ErrorPage";
import Download from "./components/Download";
import SendToExpertise from "./components/SendToExpertise";
import {STEPS} from "./constants";

export interface FinalCertificationProps extends WithStyles<typeof styles>, RouteComponentProps {
    actions: CertificationActions,
    certification: CertificationState,
    isError: boolean,
}

class FinalCertification extends React.Component<FinalCertificationProps> {

    state = {
        activeStep: 0,
    };

    stepList = STEPS.map(step => step.component);
    stepNameList = STEPS.map(step => step.name);

    getCertificationId = () => get(this, 'props.match.params.id');

    componentDidMount() {
        this.getCertification();
        this.getTemplateText();
    }

    getTemplateText = () => {
        const id = this.props.certification[CertificationFields.GIA_BASE];
        this.props.actions.getTemplateText(id);
    }

    getCertification = () => {
        this.props.actions.getCertification(this.getCertificationId());
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
            return <ErrorPage/>
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
                    <Download/>
                    <div className={classes.sendToExpertise}>
                        <SendToExpertise openStep={this.openStep} certificationId={this.getCertificationId()}/>
                    </div>
                </div>
            </Paper>
        )
    }
}

export default connect(withStyles(styles)(withRouter(FinalCertification)));