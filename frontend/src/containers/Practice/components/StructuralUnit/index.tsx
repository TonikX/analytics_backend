import {withStyles} from '@mui/styles';
import styles from "./styles";
import {PracticeActions, PracticeState, Validation} from "../../types";
import {PracticeFields} from "../../enum";
import React from "react";
import connect from "./connect";
import {WithStyles} from "@mui/styles";
import {validate} from "../../validation";
import {RussianPracticeFields} from "../../constants";
import SearchSelector from "../../../../components/SearchSelector/SearchSelector";
import {SelectorListType} from "../../../../components/SearchSelector/types";
import {StructuralUnitsActions} from "../../../StructuralUnits/types";

interface StructuralUnitProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fields: PracticeState;
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
        const field = PracticeFields.STRUCTURAL_UNIT;
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
            const field = PracticeFields.STRUCTURAL_UNIT;
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
        const field = PracticeFields.STRUCTURAL_UNIT;
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
        //@ts-ignore
        const {classes} = this.props;
        const {structuralUnitsList, fields} = this.props;
        const {errorMessage} = this.state;

        return (
            <SearchSelector label={RussianPracticeFields[PracticeFields.STRUCTURAL_UNIT]}
                            changeSearchText={this.handleChangeStructuralUnitSearchText}
                            list={structuralUnitsList}
                            className={classes.structuralUnit}
                            changeItem={this.changeStructuralUnit}
                            value={String(fields[PracticeFields.STRUCTURAL_UNIT]?.id)}
                            valueLabel={fields[PracticeFields.STRUCTURAL_UNIT]?.title ?? ''}
                            errorMessage={errorMessage}
            />
        );
    }
}

// @ts-ignore
export default connect(withStyles(styles)(StructuralUnit));