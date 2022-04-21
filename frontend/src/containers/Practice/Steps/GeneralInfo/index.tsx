import React from "react";
import {PracticeFields, PracticeStepsRussian} from "../../enum";
import TextField from "@material-ui/core/TextField";
import get from "lodash/get";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import {Typography, WithStyles} from "@material-ui/core";
import {GeneralInfoState} from "../../types";

interface GeneralInfoProps extends WithStyles<typeof styles> {
    generalInfo: GeneralInfoState;
}

class GeneralInfo extends React.Component<GeneralInfoProps> {
    state = {
        fields: {
            [PracticeFields.YEAR]: 0,
            [PracticeFields.AUTHORS]: '',
            [PracticeFields.OP_LEADER]: '',
            [PracticeFields.LANGUAGE]: '',
            [PracticeFields.QUALIFICATION]: '',
            [PracticeFields.KIND_OF_PRACTICE]: '',
            [PracticeFields.TYPE_OF_PRACTICE]: '',
        } as GeneralInfoState
    }

    componentDidMount() {
        this.updateState()
    }

    componentDidUpdate(prevProps: Readonly<GeneralInfoProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps !== this.props) {
            this.updateState();
        }
    }

    updateState() {
        const generalInfo = this.props.generalInfo;
        this.setState({
            ...this.state,
            fields: {
                ...generalInfo,
            }
        })
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {fields} = this.state;

        this.setState({
            ...this.state,
            fields: {
                ...fields,
                [field]: get(e, 'target.value')
            }
        })
    }

    saveNumberField = (field: string) => (e: React.ChangeEvent) => {
        const {fields} = this.state;
        const parsedValue = parseInt(get(e, 'target.value'));
        if (Number.isNaN(parsedValue)) return;

        this.setState({
            ...this.state,
            fields: {
                ...fields,
                [field]: parsedValue,
            }
        })
    }

    render() {

        const {classes} = this.props;
        const {fields} = this.state;

        return (
            <div className={classes.content}>
                <Typography variant='h5'>
                    {PracticeStepsRussian.GENERAL}
                </Typography>
                <TextField label="Год проведения"
                           onChange={this.saveNumberField(PracticeFields.YEAR)}
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