import React from "react";
import cn from "classnames";
import {CertificationFields, CertificationSteps, TemplateTextCertificationFields} from "../../enum";
import connect from "./connect";
import withStyles from "@mui/material/styles/withStyles";
import styles from "../styles";
import {Typography, WithStyles} from "@mui/material";
import {TemplateTextState} from "../../types";
import InputList from "../../components/InputList";
import QuestionIcon from "@material-ui/icons/HelpOutline";
import Tooltip from "@mui/material/Tooltip/Tooltip";

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
                    <Typography className={cn(classes.generalProvisionsText, classes.preWrap)} align="justify">
                        {templateText[TemplateTextCertificationFields.GENERAL_PROVISIONS]}
                    </Typography>
                    <div className={classes.inputWrapperRelative}>
                        <InputList fieldName={CertificationFields.GENERAL_PROVISIONS_OTHER_DOCUMENTS}/>
                        <Tooltip title="По желанию можно указать другие документы, которые использовались при написании рабочей программы">
                            <QuestionIcon color="secondary" className={cn(classes.tooltipIconAbsolute, classes.tooltipTop)}/>
                        </Tooltip>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(withStyles(styles)(GeneralProvisions));
