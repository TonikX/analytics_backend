import React from "react";
import {PracticeFields, PracticeStepsRussian} from "../../enum";
import TextField from "@material-ui/core/TextField";
import get from "lodash/get";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import {Typography, WithStyles} from "@material-ui/core";
import {PracticeActions, PracticeState} from "../../types";

interface GeneralInfoProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fields: PracticeState;
}

class GeneralInfo extends React.Component<GeneralInfoProps> {

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const value = get(e, 'target.value')

        this.props.actions.setField({field, value});
    }

    render() {

        const {classes, fields} = this.props;

        return (
            <div className={classes.content}>
                <Typography variant='h5'>
                    {PracticeStepsRussian.GENERAL}
                </Typography>
                <TextField label="Название"
                           onChange={this.saveField(PracticeFields.TITLE)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.TITLE]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
                <TextField label="Год проведения"
                           onChange={this.saveField(PracticeFields.YEAR)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.YEAR]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
                <TextField label="Руководитель образовательной программы"
                           onChange={this.saveField(PracticeFields.OP_LEADER)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.OP_LEADER]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
                <TextField label="Язык реализации"
                           onChange={this.saveField(PracticeFields.LANGUAGE)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.LANGUAGE]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
                <TextField label="Авторский состав"
                           onChange={this.saveField(PracticeFields.AUTHORS)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.AUTHORS]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
                <TextField label="Квалификация"
                           onChange={this.saveField(PracticeFields.QUALIFICATION)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.QUALIFICATION]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
                <TextField label="Вид практики"
                           onChange={this.saveField(PracticeFields.KIND_OF_PRACTICE)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.KIND_OF_PRACTICE]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
                <TextField label="Тип практики"
                           onChange={this.saveField(PracticeFields.TYPE_OF_PRACTICE)}
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