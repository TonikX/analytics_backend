import React from "react";
import {PracticeFields, PracticeStepsRussian} from "../../enum";
import TextField from "@material-ui/core/TextField";
import get from "lodash/get";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import {Typography, WithStyles} from "@material-ui/core";
import {AssessmentState} from "../../types";

interface AssessmentProps extends WithStyles<typeof styles> {

}

class Assessment extends React.Component<AssessmentProps> {
    state = {
        fields: {
            [PracticeFields.FORM_OF_CERTIFICATION_TOOLS]: '',
            [PracticeFields.PASSED_GREAT_MARK]: '',
            [PracticeFields.PASSED_GOOD_MARK]: '',
            [PracticeFields.PASSED_SATISFACTORILY_MARK]: '',
            [PracticeFields.NOT_PASSED_MARK]: '',
        } as AssessmentState
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
                    {PracticeStepsRussian.ASSESSMENT}
                </Typography>
                <TextField label="Форма аттестации"
                           onChange={this.saveNumberField(PracticeFields.FORM_OF_CERTIFICATION_TOOLS)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.FORM_OF_CERTIFICATION_TOOLS]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
                <TextField label='Критерий оценки "отлично"'
                           onChange={this.saveField(PracticeFields.PASSED_GREAT_MARK)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.PASSED_GREAT_MARK]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
                <TextField label='Критерий оценки "хорошо"'
                           onChange={this.saveField(PracticeFields.PASSED_GOOD_MARK)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.PASSED_GOOD_MARK]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
                <TextField label='Критерий оценки "удовлетворительно"'
                           onChange={this.saveField(PracticeFields.PASSED_SATISFACTORILY_MARK)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.PASSED_SATISFACTORILY_MARK]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
                <TextField label='Критерий оценки "неудовлетворительно"'
                           onChange={this.saveField(PracticeFields.NOT_PASSED_MARK)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.NOT_PASSED_MARK]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
            </div>
        );
    }
}

export default connect(withStyles(styles)(Assessment));