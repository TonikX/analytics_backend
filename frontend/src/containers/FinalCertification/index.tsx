import React from "react";
import {Paper, WithStyles} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {CertificationActions, CertificationState} from "./types";
import connect from "./connect";

export interface FinalCertificationProps extends WithStyles<typeof styles>, RouteComponentProps {
    actions: CertificationActions,
    certification: CertificationState,
}

class FinalCertification extends React.Component<FinalCertificationProps> {

    render() {
        const {classes, certification} = this.props;
        return (
            <Paper className={classes.root} component="div">
                Hello on gia page, my author is {certification.authors}
            </Paper>
        )

    }
}

export default connect(withStyles(styles)(withRouter(FinalCertification)));