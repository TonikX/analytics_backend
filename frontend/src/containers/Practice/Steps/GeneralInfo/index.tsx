import React from "react";
import {PracticeFields, PracticeStepsRussian} from "../../enum";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import {Typography, WithStyles} from "@material-ui/core";
import {PracticeActions, PracticeState} from "../../types";
import Input from "../../components/Input";
import Select from "../../components/Select";
import SearchSelector from "../../../../components/SearchSelector/SearchSelector";
import {SelectorListType} from "../../../../components/SearchSelector/types";
import {StructuralUnitsActions} from "../../../StructuralUnits/types";
import {LANGUAGES, PRACTICE_KINDS, PRACTICE_TYPES, QUALIFICATIONS} from "../../constants";

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
                    {PracticeStepsRussian.GENERAL}
                </Typography>
                <div className={classes.columns}>
                    <div>
                        <Input label='Код дисциплины' fieldName={PracticeFields.DISCIPLINE_CODE}/>
                        <Input label='Название' fieldName={PracticeFields.TITLE}/>
                        <Input label='Год проведения' fieldName={PracticeFields.YEAR}/>
                        <Input label='Руководитель образовательной программы' fieldName={PracticeFields.OP_LEADER}/>
                        <Select label='Язык реализации' fieldName={PracticeFields.LANGUAGE} metaList={LANGUAGES}/>
                    </div>
                    <div className={classes.rightColumn}>
                        <Input label='Авторский состав' fieldName={PracticeFields.AUTHORS}/>
                        <Select label='Уровень образования' fieldName={PracticeFields.QUALIFICATION}
                                metaList={QUALIFICATIONS}/>
                        <Select label='Вид практики' fieldName={PracticeFields.KIND_OF_PRACTICE}
                                metaList={PRACTICE_KINDS}/>
                        <Select label='Тип практики' fieldName={PracticeFields.TYPE_OF_PRACTICE}
                                metaList={PRACTICE_TYPES}/>
                        <SearchSelector label="Структурное подразделение"
                                        changeSearchText={this.handleChangeStructuralUnitSearchText}
                                        list={structuralUnitsList}
                                        className={classes.input}
                                        changeItem={this.changeStructuralUnit}
                                        value={String(fields[PracticeFields.STRUCTURAL_UNIT]?.id)}
                                        valueLabel={fields[PracticeFields.STRUCTURAL_UNIT]?.title ?? ''}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(withStyles(styles)(GeneralInfo));