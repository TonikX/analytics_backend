import {WithStyles} from "@material-ui/core";
import styles from "./styles";
import {PracticeActions, PracticeState, Validation} from "../../types";
import {PracticeFields} from "../../enum";
import React from "react";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import get from "lodash/get";
import {validate} from "../../validation";
import InputsLoader from "../../../../components/InputsLoader";
import {RussianPracticeFields} from "../../constants";
import InputLabel from "@material-ui/core/InputLabel";

interface InputProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fieldName: PracticeFields;
    fields: PracticeState;
    multiline?: boolean;
    rows?: number;
    getLoading: (fieldName: string) => boolean,
    validation: Validation;
    label?: React.ReactNode;
    disabled?: boolean;
}

class Input extends React.Component<InputProps> {

    state = {
        value: '',
        errorMessage: '',
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

    saveInput = (field: PracticeFields) => (e: React.ChangeEvent) => {
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
        const {fieldName, classes, multiline, rows, getLoading, label, disabled} = this.props;
        const {errorMessage} = this.state;

        return (
            <div className={classes.input}>
                <InputLabel error={!!errorMessage} shrink>
                    {label ?? RussianPracticeFields[fieldName]}
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
                               disabled={disabled}
                               style={{marginTop: '3px'}} // margin between label and the field itself
                    />
                </InputsLoader>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Input));
