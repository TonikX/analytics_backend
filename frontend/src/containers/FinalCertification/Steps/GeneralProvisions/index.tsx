import React from "react";
import {CertificationFields, CertificationSteps, TemplateTextCertificationFields} from "../../enum";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../styles";
import {Typography, WithStyles} from "@material-ui/core";
import {TemplateTextState} from "../../types";
import InputList from "../../components/InputList";

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
                    <Typography className={classes.generalProvisionsText}>
                        {templateText[TemplateTextCertificationFields.GENERAL_PROVISIONS]}
                    </Typography>
                    <InputList fieldName={CertificationFields.GENERAL_PROVISIONS_OTHER_DOCUMENTS}/>
                </div>
            </div>
        );
    }
}

export default connect(withStyles(styles)(GeneralProvisions));