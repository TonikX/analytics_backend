import React from "react";
import {WithStyles} from "@material-ui/core";
import styles from "../Input/styles";
import {PracticeActions, PracticeState, Validation} from "../../types";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import {fieldToStep, STEPS} from "../../constants";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

interface SendToExpertiseProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fields: PracticeState;
    openStep: (index: number) => void;
    validation: Validation;
}

class SendToExpertise extends React.Component<SendToExpertiseProps> {

    handleClick = () => {
        this.props.actions.showErrors();
        const erroredFields = this.props.validation.erroredFields;

        for (let i = 0; i < STEPS.length; i++) {
            const step = STEPS[i];
            for (const erroredField of erroredFields) {
                const erroredStepName = fieldToStep.get(erroredField)!!;
                if (erroredStepName === step.name) {
                    this.props.openStep(i);
                    return;
                }
            }
        }
    }

    render() {

        const {validation} = this.props;

        if (validation.erroredFields.length === 0) {
            return (
                <Button variant='outlined'>
                    Отправить на экспертизу
                </Button>
            )
        }
        return (
            <Tooltip title={
                <Typography variant='body1'>
                    Для отправления на экспертизу нужно исправить ошибки. Нажмите, чтобы к ним перейти
                </Typography>
            }>
                <Button variant='outlined' onClick={this.handleClick}>
                    Перейти к ошибкам
                </Button>
            </Tooltip>
        )
    }
}

export default connect(withStyles(styles)(SendToExpertise))