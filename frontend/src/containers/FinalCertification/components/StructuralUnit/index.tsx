import {withStyles} from '@mui/styles';
import styles from "./styles";
import {CertificationActions, CertificationState, Validation} from "../../types";
import {CertificationFields} from "../../enum";
import React from "react";
import connect from "./connect";
import {WithStyles} from "@mui/styles";
import {validate} from "../../validation";
import {RussianCertificationFields} from "../../constants";
import SearchSelector from "../../../../components/SearchSelector/SearchSelector";
import {SelectorListType} from "../../../../components/SearchSelector/types";
import {StructuralUnitsActions} from "../../../StructuralUnits/types";

interface StructuralUnitProps extends WithStyles<typeof styles> {
    actions: CertificationActions;
    fields: CertificationState;
    structuralUnitsList: SelectorListType;
    structuralUnitActions: StructuralUnitsActions;
    validation: Validation;
}

class StructuralUnit extends React.Component<StructuralUnitProps> {

    state = {
        errorMessage: '',
    }

    handleChangeStructuralUnitSearchText = (search: string) => {
        this.props.structuralUnitActions.changeSearchQuery(search);
        this.props.structuralUnitActions.getStructuralUnits();
    }

    componentDidMount() {
        this.props.structuralUnitActions.getStructuralUnits();
        const field = CertificationFields.STRUCTURAL_UNIT;
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

    componentDidUpdate(prevProps: Readonly<StructuralUnitProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.validation !== prevProps.validation) {
            let errorMessage = '';
            const field = CertificationFields.STRUCTURAL_UNIT;
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

    changeStructuralUnit = (value: string) => {
        const field = CertificationFields.STRUCTURAL_UNIT;
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
        const {classes, structuralUnitsList, fields} = this.props;
        const {errorMessage} = this.state;

        return (
            <SearchSelector label={RussianCertificationFields[CertificationFields.STRUCTURAL_UNIT]}
                            changeSearchText={this.handleChangeStructuralUnitSearchText}
                            list={structuralUnitsList}
                            className={classes.structuralUnit}
                            changeItem={this.changeStructuralUnit}
                            value={String(fields[CertificationFields.STRUCTURAL_UNIT]?.id)}
                            valueLabel={fields[CertificationFields.STRUCTURAL_UNIT]?.title ?? ''}
                            errorMessage={errorMessage}
            />
        );
    }
}

export default connect(withStyles(styles)(StructuralUnit));