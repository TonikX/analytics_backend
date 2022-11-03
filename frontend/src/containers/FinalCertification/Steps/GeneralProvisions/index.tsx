import React from "react";
import {CertificationFields, CertificationSteps, TemplateTextCertificationFields} from "../../enum";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../styles";
import {Typography, WithStyles} from "@material-ui/core";
import {TemplateTextState} from "../../types";
import InputList from "../../components/InputList";
import QuestionIcon from "@material-ui/icons/HelpOutline";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

interface GeneralProvisionsProps extends WithStyles<typeof styles> {
    templateText: TemplateTextState,
}

class GeneralProvisions extends React.Component<GeneralProvisionsProps> {

    render() {

        const {classes, templateText} = this.props;

        return (
            <div className={classes.content}>
                <Typography variant='h5'>
                    {CertificationSteps.GENERAL_PROVISIONS}
                </Typography>
                <div className={classes.singleColumn}>
                    <Typography className={classes.generalProvisionsText} align="justify">
                        {templateText[TemplateTextCertificationFields.GENERAL_PROVISIONS]}
                    </Typography>
                    <div className={classes.inputWrapper}>
                        <InputList fieldName={CertificationFields.GENERAL_PROVISIONS_OTHER_DOCUMENTS}/>
                        <Tooltip title="По желанию можно указать другие документы, которые использовались при написании рабочей программы">
                            <QuestionIcon color="secondary" className={classes.tooltipIcon}/>
                        </Tooltip>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(withStyles(styles)(GeneralProvisions));
