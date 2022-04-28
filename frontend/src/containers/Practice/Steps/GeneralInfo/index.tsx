import React from "react";
import {PracticeFields, PracticeStepsRussian} from "../../enum";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import {Typography, WithStyles} from "@material-ui/core";
import {PracticeActions, PracticeState} from "../../types";
import {languageArray, specialization} from "../../../WorkProgram/constants";
import Input from "../../components/Input";
import Select from "../../components/Select";

interface GeneralInfoProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fields: PracticeState;
}

class GeneralInfo extends React.Component<GeneralInfoProps> {

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.content}>
                <Typography variant='h5'>
                    {PracticeStepsRussian.GENERAL}
                </Typography>
                <Input label='Название' fieldName={PracticeFields.TITLE}/>
                <Input label='Год проведения' fieldName={PracticeFields.YEAR}/>
                <Input label='Руководитель образовательной программы' fieldName={PracticeFields.OP_LEADER}/>
                <Select label='Язык реализации' fieldName={PracticeFields.LANGUAGE} metaList={languageArray}/>
                <Input label='Авторский состав' fieldName={PracticeFields.AUTHORS}/>
                <Select label='Уровень образования' fieldName={PracticeFields.QUALIFICATION} metaList={specialization}/>
                <Input label='Вид практики' fieldName={PracticeFields.KIND_OF_PRACTICE}/>
                <Input label='Тип практики' fieldName={PracticeFields.TYPE_OF_PRACTICE}/>
            </div>
        );
    }
}

export default connect(withStyles(styles)(GeneralInfo));