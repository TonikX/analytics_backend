import React from "react";
import {PracticeFields, PracticeStepsRussian, TemplateTextPracticeFields} from "../../enum";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../styles";
import {Typography, WithStyles} from "@material-ui/core";
import {PracticeActions, PracticeState, TemplateTextState} from "../../types";
import Input from "../../components/Input";

interface GeneralProvisionsProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fields: PracticeState;
    templateText: TemplateTextState;
}

class GeneralProvisions extends React.Component<GeneralProvisionsProps> {

    render() {

        const {classes, templateText} = this.props;

        return (
            <div className={classes.content}>
                <Typography variant='h5'>
                    {PracticeStepsRussian.OVZ}
                </Typography>
                <div className={classes.singleColumn}>
                    <Typography className={classes.generalProvisionsText}>
                        {templateText[TemplateTextPracticeFields.OVZ]}
                    </Typography>
                </div>
            </div>
        );
    }
}

export default connect(withStyles(styles)(GeneralProvisions));