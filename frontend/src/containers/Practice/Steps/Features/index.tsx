import React from "react";
import {PracticeFields, PracticeStepsRussian} from "../../enum";
import TextField from "@material-ui/core/TextField";
import get from "lodash/get";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import {Typography, WithStyles} from "@material-ui/core";
import {PracticeActions, PracticeState} from "../../types";

interface FeaturesProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fields: PracticeState;
}

class Features extends React.Component<FeaturesProps> {
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
                <TextField label="Способ прохождения практики"
                           onChange={this.saveField(PracticeFields.WAY_OF_DOING_PRACTICE)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.WAY_OF_DOING_PRACTICE]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
                <TextField label='Формат прохождения практики'
                           onChange={this.saveField(PracticeFields.FORMAT_PRACTICE)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.FORMAT_PRACTICE]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
                <TextField label='Особенности содержания и прохождения практики'
                           onChange={this.saveField(PracticeFields.FEATURES_CONTENT_AND_INTERNSHIP)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.FEATURES_CONTENT_AND_INTERNSHIP]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
                <TextField label='Дополнительные отчетные материалы'
                           onChange={this.saveField(PracticeFields.ADDITIONAL_REPORTING_MATERIALS)}
                           variant="outlined"
                           className={classes.input}
                           fullWidth
                           value={fields[PracticeFields.ADDITIONAL_REPORTING_MATERIALS]}
                           InputLabelProps={{
                               shrink: true,
                           }}
                />
            </div>
        );
    }
}

export default connect(withStyles(styles)(Features));