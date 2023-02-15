import React from "react";
import cn from 'classnames';
import {PracticeSteps, TemplateTextPracticeFields} from "../../enum";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../styles";
import {Typography, WithStyles} from "@material-ui/core";
import {PracticeActions, PracticeState, TemplateTextState} from "../../types";

interface GeneralProvisionsProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fields: PracticeState;
    templateText: TemplateTextState;
}

class GeneralProvisions extends React.Component<GeneralProvisionsProps> {

    render() {

        const {classes, templateText} = this.props;

        return (
            <div>
                <Typography variant='h5'>
                    {PracticeSteps.OVZ}
                </Typography>
                <div className={classes.singleColumn}>
                    <Typography className={cn(classes.generalProvisionsText, classes.preWrap)} align="justify">
                        {templateText[TemplateTextPracticeFields.OVZ]}
                    </Typography>
                </div>
            </div>
        );
    }
}

export default connect(withStyles(styles)(GeneralProvisions));
