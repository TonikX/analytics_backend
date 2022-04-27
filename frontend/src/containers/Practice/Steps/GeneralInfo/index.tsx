import React from "react";
import {PracticeFields, PracticeStepsRussian} from "../../enum";
import TextField from "@material-ui/core/TextField";
import get from "lodash/get";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import {Typography, WithStyles} from "@material-ui/core";
import {PracticeActions, PracticeState} from "../../types";
import SimpleSelector from "../../../../components/SimpleSelector/SimpleSelector";
import {languageArray, specialization} from "../../../WorkProgram/constants";

interface GeneralInfoProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fields: PracticeState;
}

class GeneralInfo extends React.Component<GeneralInfoProps> {

    saveInput = (field: string) => (e: React.ChangeEvent) => {
        const value = get(e, 'target.value')

        this.props.actions.setField({field, value});
    }

    saveSelect = (field: string) => (value: string) => {
        this.props.actions.setField({field, value})
    }

    render() {

        const {classes, fields} = this.props;

        return (
            <div className={classes.content}>
                <Typography variant='h5'>
                    {PracticeStepsRussian.GENERAL}
                </Typography>
                <TextField label="Название"
                           onChange={this.saveInput(PracticeFields.TITLE)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.TITLE]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
                <TextField label="Год проведения"
                           onChange={this.saveInput(PracticeFields.YEAR)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.YEAR]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
                <TextField label="Руководитель образовательной программы"
                           onChange={this.saveInput(PracticeFields.OP_LEADER)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.OP_LEADER]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
                <SimpleSelector label="Язык реализации"
                                metaList={languageArray}
                                value={fields[PracticeFields.LANGUAGE]}
                                wrapClass={classes.selectorWrap}
                                onChange={this.saveSelect(PracticeFields.LANGUAGE)}
                />
                <TextField label="Авторский состав"
                           onChange={this.saveInput(PracticeFields.AUTHORS)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.AUTHORS]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
                <SimpleSelector label="Уровень образования"
                                metaList={specialization}
                                value={fields[PracticeFields.QUALIFICATION]}
                                wrapClass={classes.selectorWrap}
                                onChange={this.saveSelect(PracticeFields.QUALIFICATION)}
                />
                <TextField label="Вид практики"
                           onChange={this.saveInput(PracticeFields.KIND_OF_PRACTICE)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.KIND_OF_PRACTICE]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
                <TextField label="Тип практики"
                           onChange={this.saveInput(PracticeFields.TYPE_OF_PRACTICE)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.TYPE_OF_PRACTICE]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />


            </div>
        );
    }
}

export default connect(withStyles(styles)(GeneralInfo));