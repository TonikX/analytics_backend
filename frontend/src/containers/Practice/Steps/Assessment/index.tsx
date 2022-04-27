import React from "react";
import {PracticeFields, PracticeStepsRussian} from "../../enum";
import TextField from "@material-ui/core/TextField";
import get from "lodash/get";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import {Typography, WithStyles} from "@material-ui/core";
import {PracticeActions, PracticeState} from "../../types";

interface AssessmentProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fields: PracticeState;
}

class Assessment extends React.Component<AssessmentProps> {

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const value = get(e, 'target.value')

        this.props.actions.setField({field, value});
    }

    render() {

        const {classes, fields} = this.props;

        return (
            <div className={classes.content}>
                <Typography variant='h5'>
                    {PracticeStepsRussian.ASSESSMENT}
                </Typography>
                <TextField label="Форма аттестации"
                           onChange={this.saveField(PracticeFields.FORM_OF_CERTIFICATION_TOOLS)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.FORM_OF_CERTIFICATION_TOOLS]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
                <div className={classes.columns}>
                    <div>
                        <TextField label='Критерий оценки "отлично"'
                                   onChange={this.saveField(PracticeFields.PASSED_GREAT_MARK)}
                                   variant="outlined"
                                   className={classes.input}
                                   fullWidth
                                   multiline
                                   rows={10}
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
                                   multiline
                                   rows={10}
                                   value={fields[PracticeFields.PASSED_GOOD_MARK]}
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                        />
                    </div>
                    <div className={classes.rightColumn}>
                        <TextField label='Критерий оценки "удовлетворительно"'
                                   onChange={this.saveField(PracticeFields.PASSED_SATISFACTORILY_MARK)}
                                   variant="outlined"
                                   className={classes.input}
                                   fullWidth
                                   multiline
                                   rows={10}
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
                                   multiline
                                   rows={10}
                                   value={fields[PracticeFields.NOT_PASSED_MARK]}
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Assessment));
