import React from "react";
import {PracticeFields, PracticeSteps} from "../../enum";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../styles";
import {Typography, WithStyles} from "@material-ui/core";
import {PracticeActions, PracticeState} from "../../types";
import Input from "../../components/Input";
import Select from "../../components/Select";
import {SelectorListType} from "../../../../components/SearchSelector/types";
import {StructuralUnitsActions} from "../../../StructuralUnits/types";
import {
    LANGUAGES,
    PRACTICE_FORMATS,
    PRACTICE_KINDS,
    PRACTICE_TYPES,
    PRACTICE_WAYS,
    QUALIFICATIONS
} from "../../constants";
import StructuralUnit from "../../components/StructuralUnit";

interface GeneralInfoProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fields: PracticeState;
    structuralUnitsList: SelectorListType;
    structuralUnitActions: StructuralUnitsActions;
}

class GeneralInfo extends React.Component<GeneralInfoProps> {

    componentDidMount() {
        this.props.structuralUnitActions.getStructuralUnits();
    }

    handleChangeStructuralUnitSearchText = (search: string) => {
        this.props.structuralUnitActions.changeSearchQuery(search);
        this.props.structuralUnitActions.getStructuralUnits();
    }

    changeStructuralUnit = (value: string) => {
        this.props.actions.saveField({field: PracticeFields.STRUCTURAL_UNIT, value})
    }

    render() {

        const {classes, structuralUnitsList, fields} = this.props;

        return (
            <div className={classes.content}>
                <Typography variant='h5'>
                    {PracticeSteps.GENERAL}
                </Typography>
                <div className={classes.columns}>
                    <div className={classes.leftColumn}>
                        <Input fieldName={PracticeFields.PRAC_ISU_ID} disabled/>
                        <Input fieldName={PracticeFields.TITLE}/>
                        <Input fieldName={PracticeFields.YEAR}/>
                        <Input fieldName={PracticeFields.OP_LEADER}/>
                        <Select fieldName={PracticeFields.LANGUAGE} metaList={LANGUAGES}/>
                        <Input fieldName={PracticeFields.AUTHORS}/>
                    </div>
                    <div className={classes.rightColumn}>
                        <Select fieldName={PracticeFields.QUALIFICATION}
                                metaList={QUALIFICATIONS}/>
                        <Select fieldName={PracticeFields.KIND_OF_PRACTICE}
                                metaList={PRACTICE_KINDS}/>
                        <Select fieldName={PracticeFields.TYPE_OF_PRACTICE}
                                metaList={PRACTICE_TYPES}/>
                        <Select fieldName={PracticeFields.WAY_OF_DOING_PRACTICE}
                                metaList={PRACTICE_WAYS}/>
                        <Select fieldName={PracticeFields.FORMAT_PRACTICE}
                                metaList={PRACTICE_FORMATS}/>
                        <StructuralUnit/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(withStyles(styles)(GeneralInfo));
