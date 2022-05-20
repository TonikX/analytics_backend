import React from "react";
import {PracticeFields, PracticeStepsRussian, TemplateTextPracticeFields} from "../../enum";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../styles";
import {Typography, WithStyles} from "@material-ui/core";
import {PracticeActions, PracticeState, TemplateTextState} from "../../types";
import Input from "../../components/Input";

interface AssessmentProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fields: PracticeState;
    templateText: TemplateTextState;
}

class Assessment extends React.Component<AssessmentProps> {

    render() {

        const {classes, templateText} = this.props;

        return (
            <div className={classes.content}>
                <Typography variant='h5'>
                    {PracticeStepsRussian.EVALUATION_METHODS}
                </Typography>
                <Typography className={classes.generalProvisionsText}>
                    {templateText[TemplateTextPracticeFields.REPORTING_MATERIALS]}
                </Typography>
                <Input fieldName={PracticeFields.FORM_OF_CERTIFICATION_TOOLS}/>
                <div className={classes.columns}>
                    <div className={classes.leftColumn}>
                        <Input
                            fieldName={PracticeFields.PASSED_GREAT_MARK}
                            multiline
                            rows={10}/>
                        <Input
                            fieldName={PracticeFields.PASSED_GOOD_MARK}
                            multiline
                            rows={10}/>
                    </div>
                    <div className={classes.rightColumn}>
                        <Input
                            fieldName={PracticeFields.PASSED_SATISFACTORILY_MARK}
                            multiline
                            rows={10}/>
                        <Input
                            fieldName={PracticeFields.NOT_PASSED_MARK}
                            multiline
                            rows={10}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Assessment));
