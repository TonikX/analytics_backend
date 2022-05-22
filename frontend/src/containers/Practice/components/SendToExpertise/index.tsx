import React from "react";
import {WithStyles} from "@material-ui/core";
import styles from "../Input/styles";
import {PracticeActions, PracticeState, Validation} from "../../types";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import {fieldToStep, STEPS} from "../../constants";

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
         // todo тултип с информацией про кнопку
        // Для отправления на экспертизу нужно исправить ошибки. Нажмите, чтобы к ним перейти
        return (
            <Button variant='outlined' onClick={this.handleClick}>
                Перейти к ошибкам
            </Button>
        )
    }
}

export default connect(withStyles(styles)(SendToExpertise))