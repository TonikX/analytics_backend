import React from "react";
import {PracticeFields, PracticeSteps, TemplateTextPracticeFields} from "../../enum";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../styles";
import {Typography, WithStyles} from "@material-ui/core";
import {PracticeActions, PracticeState, TemplateTextState} from "../../types";
import Input from "../../components/Input";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Tooltip from "@material-ui/core/Tooltip";
import {RussianPracticeFields} from "../../constants";

interface ReportingMaterialsProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fields: PracticeState;
    templateText: TemplateTextState;
}

class Structure extends React.Component<ReportingMaterialsProps> {

    render() {

        const {classes, templateText} = this.props;

        return (
            <div className={classes.content}>
                <Typography variant='h5'>
                    {PracticeSteps.REPORTING_MATERIALS}
                </Typography>
                <div className={classes.singleColumn}>
                    <Typography className={classes.generalProvisionsText}>
                        {templateText[TemplateTextPracticeFields.REPORTING_MATERIALS]}
                    </Typography>
                    <Input fieldName={PracticeFields.ADDITIONAL_REPORTING_MATERIALS}
                           multiline
                           label={
                               <div style={{display: "flex", justifyContent: 'start', alignItems: 'center'}}>
                                   {RussianPracticeFields[PracticeFields.ADDITIONAL_REPORTING_MATERIALS]}
                                   <Tooltip title={
                                       <Typography>
                                           По решению руководителей практики возможны требования к дополнительным отчетным материалам. Укажите, какие документы и требования к ним предъявляются (дневник практики, отзыв руководителя практики, презентация и др.).
                                           Пример: презентация, отчет на 20 страниц.
                                       </Typography>
                                   }>
                                       <HelpOutlineIcon fontSize='small' style={{marginLeft: '5px'}}/>
                                   </Tooltip>
                               </div>

                           }
                           rows={2}/>
                </div>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Structure));