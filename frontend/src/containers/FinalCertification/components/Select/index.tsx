import {FormHelperText, Select as MuiSelect, withStyles} from "@mui/material";
import styles from "./styles";
import {CertificationActions, Validation} from "../../types";
import {CertificationFields} from "../../enum";
import React, {ReactText} from "react";
import connect from "./connect";
import {WithStyles} from "@mui/styles";
import InputsLoader from "../../../../components/InputsLoader";
import {validate} from "../../validation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import get from "lodash/get";
import {RussianCertificationFields} from "../../constants";

type SelectOption = {
    label: string;
    value: ReactText;
}

interface SelectProps extends WithStyles<typeof styles> {
    actions: CertificationActions;
    fieldName: CertificationFields;
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

    saveSelect = (e: React.ChangeEvent<any>) => {
        const field = this.props.fieldName;
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
        const {fields, classes, metaList, fieldName, getLoading} = this.props;
        const {errorMessage} = this.state;
        //@ts-ignore
        const label = RussianCertificationFields[fieldName];
        const value = fields[fieldName];

        return (
            <div style={{marginTop: '20px'}}>
                <InputLabel error={!!errorMessage} shrink>
                    {label}
                </InputLabel>
                <InputsLoader loading={getLoading(fieldName)}>
                    <FormControl error={!!errorMessage} className={classes.selectorWrap} fullWidth style={{marginTop: '3px'}}>
                        <MuiSelect
                            value={value}
                            onChange={this.saveSelect}
                            fullWidth
                            variant='outlined'
                        >
                            {metaList.map(item =>
                                <MenuItem value={item.value} key={item.value}>
                                    {item.label}
                                </MenuItem>
                            )}
                        </MuiSelect>
                        {
                            errorMessage && <FormHelperText style={{margin: '0 14px'}}>{errorMessage}</FormHelperText>
                        }
                    </FormControl>
                </InputsLoader>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Select));
