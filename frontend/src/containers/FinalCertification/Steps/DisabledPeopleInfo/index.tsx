import React from "react";
import cn from 'classnames';
import {CertificationSteps, TemplateTextCertificationFields} from "../../enum";
import connect from "./connect";
import withStyles from "@mui/material/styles/withStyles";
import styles from "../styles";
import {Typography, WithStyles} from "@mui/material";
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
                    {CertificationSteps.DISABLED_PEOPLE}
                </Typography>
                <div className={classes.singleColumn}>
                    <Typography className={cn(classes.generalProvisionsText, classes.preWrap)} align="justify">
                        {templateText[TemplateTextCertificationFields.GIA_OVZ]}
                    </Typography>
                </div>
            </div>
        );
    }
}

export default connect(withStyles(styles)(DisabledPeopleInfo));
