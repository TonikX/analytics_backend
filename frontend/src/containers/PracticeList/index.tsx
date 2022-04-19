import React from "react";
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import PracticeListProps from "../PracticeList/types";
import styles from "./PracticeList.styles";
import connect from './PracticeList.connect';

class PracticeList extends React.Component<PracticeListProps> {

    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.root}>
                Hello
            </Paper>
        )
    }
}

export default connect(withStyles(styles)(PracticeList));