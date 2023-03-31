import {WithStyles} from "@mui/material";
import styles from "./styles";
import {CertificationActions, CertificationState, Validation} from "../../types";
import {CertificationFields} from "../../enum";
import React from "react";
import connect from "./connect";
import withStyles from "@mui/material/styles/withStyles";
import TextField from "@mui/material/TextField";
import get from "lodash/get";
import {validate} from "../../validation";
import InputsLoader from "../../../../components/InputsLoader";
import {RussianCertificationFields} from "../../constants";
import InputLabel from "@mui/material/InputLabel";

interface InputProps extends WithStyles<typeof styles> {
    actions: CertificationActions;
    fieldName: CertificationFields;
    fields: CertificationState;
    multiline?: boolean;
    rows?: number;
    getLoading: (fieldName: string) => boolean,
    validation: Validation,
    label?: React.ReactNode;
}

class Input extends React.Component<InputProps> {

    state = {
        value: '',
        errorMessage: '',
    }

    componentDidUpdate(prevProps: Readonly<InputProps>, prevState: Readonly<{}>, snapshot?: any) {
        const field = this.props.fieldName;
        const newValue = this.props.fields[field];
        if (prevProps.fields[field] !== newValue || this.props.validation !== prevProps.validation) {
            let errorMessage = '';
            if (this.props.validation.shownErroredFields.includes(field)) {
                const error = validate(field, newValue);
                errorMessage = error?.message ?? '';
            }
            this.setState({
                ...this.state,
                value: newValue,
                errorMessage,
            })
        }
    }

    componentDidMount() {
        const field = this.props.fieldName;
        const newValue = this.props.fields[field]
        let errorMessage = '';
        if (this.props.validation.shownErroredFields.includes(field)) {
            const value = this.props.fields[field];
            const error = validate(field, value);
            errorMessage = error?.message ?? '';
        }
        this.setState({
            ...this.state,
            value: newValue,
            errorMessage,
        });
    }

    setErrorMessage = (errorMessage: string) => {
        this.setState({
            ...this.state,
            errorMessage,
        });
    }

    setInput = (e: React.ChangeEvent) => {
        const value = get(e, 'target.value')

        this.setState({
            ...this.state,
            value,
            errorMessage: '',
        })
    }

    saveInput = (field: CertificationFields) => (e: React.ChangeEvent) => {
        const value = get(e, 'target.value')

        const error = validate(field, value);
        this.props.actions.setField({field, value});

        if (error) {
            this.setErrorMessage(error.message ?? '');
            this.props.actions.addToErroredFields(field);
            this.props.actions.showErroredField(field);
            return;
        }

        this.props.actions.removeFromErroredFields(field);
        this.props.actions.saveField({field, value});
    }


    render() {
        const {fieldName, classes, multiline, rows, getLoading, label} = this.props;
        const {errorMessage} = this.state;
        //@ts-ignore
        const labelText = label ?? RussianCertificationFields[fieldName]

        return (
            <div className={classes.input}>
                <InputLabel error={!!errorMessage} shrink>
                    {labelText}
                </InputLabel>
                <InputsLoader loading={getLoading(fieldName)}>
                    <TextField
                        onBlur={this.saveInput(fieldName)}
                        onChange={this.setInput}
                        variant="outlined"
                        fullWidth
                        multiline={multiline}
                        rows={rows ? rows : 1}
                        value={this.state.value}
                        error={Boolean(errorMessage)}
                        helperText={errorMessage}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{marginTop: '3px'}} // margin between label and the field itself
                    />
                </InputsLoader>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Input));