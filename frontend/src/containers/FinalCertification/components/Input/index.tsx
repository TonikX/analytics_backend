import {WithStyles} from "@material-ui/core";
import styles from "./styles";
import {CertificationActions, CertificationState} from "../../types";
import {CertificationFields} from "../../enum";
import React from "react";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import get from "lodash/get";

interface InputProps extends WithStyles<typeof styles> {
    actions: CertificationActions;
    label: string;
    fieldName: CertificationFields;
    fields: CertificationState;
    multiline?: boolean;
    rows?: number;
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

    saveInput = (field: CertificationFields) => (e: React.ChangeEvent) => {
        const value = get(e, 'target.value')

        // const error = validate(field, value);
        //
        // if (error) {
        //     this.setErrorMessage(error.message);
        //     return;
        // }

        this.props.actions.saveField({field, value});
    }


    render() {
        const {fields, fieldName, label, classes, multiline, rows} = this.props as any;
        const {errorMessage} = this.state;

        return (
            <TextField label={label}
                       onBlur={this.saveInput(fieldName)}
                       onChange={this.setInput(fieldName)}
                       variant="outlined"
                       className={classes.input}
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
        );
    }
}

export default connect(withStyles(styles)(Input));