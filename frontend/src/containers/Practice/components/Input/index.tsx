import {WithStyles} from "@material-ui/core";
import styles from "./styles";
import {PracticeActions, PracticeState} from "../../types";
import {PracticeFields} from "../../enum";
import React from "react";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import get from "lodash/get";
import {validate} from "../../validation";
import InputsLoader from "../../../../components/InputsLoader";
import {RussianPracticeFields} from "../../constants";

interface InputProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fieldName: PracticeFields;
    fields: PracticeState;
    multiline?: boolean;
    rows?: number;
    getLoading: (fieldName: string) => boolean,
}

class Input extends React.Component<InputProps> {

    state = {
        errorMessage: '',
    }

    setErrorMessage = (errorMessage: string) => {
        this.setState({
            ...this.state,
            errorMessage,
        });
    }

    setInput = (field: string) => (e: React.ChangeEvent) => {
        this.setErrorMessage('');

        const value = get(e, 'target.value')

        this.props.actions.setField({field, value});
    }

    saveInput = (field: PracticeFields) => (e: React.ChangeEvent) => {
        const value = get(e, 'target.value')

        const error = validate(field, value);

        if (error) {
            this.setErrorMessage(error.message);
            return;
        }

        this.props.actions.saveField({field, value});
    }


    render() {
        const {fields, fieldName, classes, multiline, rows, getLoading} = this.props;
        const {errorMessage} = this.state;

        return (
            <div className={classes.input}>
                <InputsLoader loading={getLoading(fieldName)}>
                    <TextField label={RussianPracticeFields[fieldName]}
                               onBlur={this.saveInput(fieldName)}
                               onChange={this.setInput(fieldName)}
                               variant="outlined"
                               fullWidth
                               multiline={multiline}
                               rows={rows ? rows : 1}
                               value={fields[fieldName]}
                               error={Boolean(errorMessage)}
                               helperText={errorMessage}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                </InputsLoader>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Input));