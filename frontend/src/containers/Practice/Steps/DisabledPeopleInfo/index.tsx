import React from "react";
import cn from 'classnames';
import {PracticeSteps, TemplateTextPracticeFields} from "../../enum";
import connect from "./connect";
import {WithStyles} from "@mui/styles";
import styles from "../styles";
import {withStyles} from '@mui/styles'; import {Typography} from "@mui/material";
import {PracticeActions, PracticeState, TemplateTextState} from "../../types";

interface GeneralProvisionsProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fields: PracticeState;
    templateText: TemplateTextState;
}

class GeneralProvisions extends React.Component<GeneralProvisionsProps> {

    render() {
      //@ts-ignore
      const {classes} = this.props;

        const {templateText} = this.props;

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

// @ts-ignore
export default connect(withStyles(styles)(GeneralProvisions));
