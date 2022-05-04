import React from "react";
import {CertificationStepsRussian} from "../../enum";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import {Typography, WithStyles} from "@material-ui/core";
import {CertificationActions, CertificationState} from "../../types";

interface AssessmentProps extends WithStyles<typeof styles> {
    actions: CertificationActions;
    fields: CertificationState;
}

class Assessment extends React.Component<AssessmentProps> {

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.content}>
                <Typography variant='h5'>
                    {CertificationStepsRussian.ASSESSMENT}
                </Typography>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Assessment));
