import React from "react";
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from "react-router-dom";

import styles from "./Practice.styles";
import connect from './Practice.connect';
import {PracticeProps} from "./types";
import get from "lodash/get";
import {PracticeFields} from "./enum";

class Practice extends React.Component<PracticeProps> {

    getPracticeId = () => get(this, 'props.match.params.id');

    componentDidMount() {
        console.log("did mount")
        this.props.actions.getPractice(this.getPracticeId());
    }

    render() {
        const {classes, practice} = this.props;

        return (
            <Paper className={classes.root}>
                Welcome to practice page, id: {practice[PracticeFields.ID]}, authors: {practice[PracticeFields.AUTHORS]}
            </Paper>
        )
    }
}

export default connect(withStyles(styles)(withRouter(Practice)));