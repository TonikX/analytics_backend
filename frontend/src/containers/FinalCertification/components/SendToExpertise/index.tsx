import React from "react";
import {withStyles} from '@mui/styles';
import styles from "./styles";
import {CertificationActions, CertificationState, Validation} from "../../types";
import connect from "./connect";
import {WithStyles} from "@mui/styles";
import Button from "@mui/material/Button";
import {fieldToStep, STEPS} from "../../constants";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

interface SendToExpertiseProps extends WithStyles<typeof styles> {
    actions: CertificationActions;
    fields: CertificationState;
    openStep: (index: number) => void;
    validation: Validation;
    certificationId: number;
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

    handleSend = () => {
        this.props.actions.createExpertise({id: this.props.certificationId});
    }

    render() {

        const {validation, classes} = this.props;

        if (validation.erroredFields.length === 0) {
            return (
                <Button className={classes.button} variant='outlined' onClick={this.handleSend}>
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
                <Button className={classes.button} variant='outlined' onClick={this.handleClick}>
                    Перейти к ошибкам
                </Button>
            </Tooltip>
        )
    }
}
// @ts-ignore
export default connect(withStyles(styles)(SendToExpertise))
