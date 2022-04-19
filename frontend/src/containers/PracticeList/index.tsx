import React from "react";
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from "./PracticeList.styles";
import connect from './PracticeList.connect';
import {PracticeListProps} from "./types";

class PracticeList extends React.Component<PracticeListProps> {

    componentDidMount() {
        this.props.actions.getPracticeList();
    }

    render() {
        const {classes, practiceList} = this.props;
        return (
            <Paper className={classes.root}>
                Hello, found {practiceList.length} items!
            </Paper>
        )
    }
}

export default connect(withStyles(styles)(PracticeList));