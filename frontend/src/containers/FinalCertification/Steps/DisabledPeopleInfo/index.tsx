import React from "react";
import {CertificationStepsRussian, TemplateTextCertificationFields} from "../../enum";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../styles";
import {Typography, WithStyles} from "@material-ui/core";
import {TemplateTextState} from "../../types";

interface DisabledPeopleInfoProps extends WithStyles<typeof styles> {
    templateText: TemplateTextState,
}

class DisabledPeopleInfo extends React.Component<DisabledPeopleInfoProps> {

    render() {

        const {classes, templateText} = this.props;

        return (
            <div className={classes.content}>
                <Typography variant='h5'>
                    {CertificationStepsRussian.DISABLED_PEOPLE}
                </Typography>
                <div className={classes.singleColumn}>
                    <Typography className={classes.generalProvisionsText}>
                        {templateText[TemplateTextCertificationFields.GIA_OVZ]}
                    </Typography>
                </div>
            </div>
        );
    }
}

export default connect(withStyles(styles)(DisabledPeopleInfo));