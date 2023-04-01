import React from "react";
import cn from 'classnames';
import {PracticeFields, PracticeSteps, TemplateTextPracticeFields} from "../../enum";
import connect from "./connect";
import {WithStyles} from "@mui/styles";
import styles from "../styles";
import {withStyles} from '@mui/styles'; import {Typography} from "@mui/material";
import {PracticeActions, PracticeState, TemplateTextState} from "../../types";
import Input from "../../components/Input";

interface StructureProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fields: PracticeState;
    templateText: TemplateTextState;
}

class Structure extends React.Component<StructureProps> {

    render() {

        const {classes, templateText} = this.props;

        return (
            <div>
                <Typography variant='h5'>
                    {PracticeSteps.STRUCTURE}
                </Typography>
                <div className={classes.singleColumn}>
                    <Typography className={cn(classes.generalProvisionsText, classes.preWrap)} align="justify">
                        {templateText[TemplateTextPracticeFields.STRUCTURE_AND_CONTENT]}
                    </Typography>
                    <Input fieldName={PracticeFields.FEATURES_INTERNSHIP}
                           multiline
                           rows={2}/>
                </div>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Structure));
