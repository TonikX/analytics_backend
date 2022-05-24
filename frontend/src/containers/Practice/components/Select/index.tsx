import {WithStyles} from "@material-ui/core";
import styles from "./styles";
import {PracticeActions, Validation} from "../../types";
import {PracticeFields} from "../../enum";
import React, {ReactText} from "react";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import SimpleSelector from "../../../../components/SimpleSelector";
import InputsLoader from "../../../../components/InputsLoader";
import {RussianPracticeFields} from "../../constants";
import {validate} from "../../validation";

type SelectOption = {
    label: string;
    value: ReactText;
}

interface SelectProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fieldName: PracticeFields;
    fields: any;
    metaList: Array<SelectOption>;
    getLoading: (fieldName: string) => boolean,
    validation: Validation,
}

class Select extends React.Component<SelectProps> {

    state = {
        errorMessage: '',
    }

    componentDidMount() {
        const field = this.props.fieldName;
        let errorMessage = '';
        if (this.props.validation.shownErroredFields.includes(field)) {
            const value = this.props.fields[field];
            const error = validate(field, value);
            errorMessage = error?.message ?? '';
        }
        this.setState({
            ...this.state,
            errorMessage,
        });
    }

    componentDidUpdate(prevProps: Readonly<SelectProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.validation !== prevProps.validation) {
            let errorMessage = '';
            const field = this.props.fieldName;
            const value = this.props.fields[field];
            if (this.props.validation.shownErroredFields.includes(field)) {
                const error = validate(field, value);
                errorMessage = error?.message ?? '';
            }
            this.setState({
                ...this.state,
                value,
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

    saveSelect = (field: PracticeFields) => (value: string) => {
        const error = validate(field, value);
        this.props.actions.setField({field, value});

        if (error) {
            this.setErrorMessage(error.message ?? '');
            this.props.actions.addToErroredFields(field);
            this.props.actions.showErroredField(field);
            return;
        }

        this.props.actions.removeFromErroredFields(field);
        this.props.actions.saveField({field, value})
    }

    render() {
        const {fields, classes, metaList, fieldName, getLoading} = this.props;
        const {errorMessage} = this.state;

        return (
            <div style={{marginTop: '30px'}}>
                <InputsLoader loading={getLoading(fieldName)}>
                    <SimpleSelector label={RussianPracticeFields[fieldName]}
                                    metaList={metaList}
                                    value={fields[fieldName]}
                                    wrapClass={classes.selectorWrap}
                                    noMargin
                                    onChange={this.saveSelect(fieldName)}
                                    errorMessage={errorMessage}
                    />
                </InputsLoader>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Select));