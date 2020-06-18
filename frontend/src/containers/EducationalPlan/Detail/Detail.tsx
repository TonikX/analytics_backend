import React from 'react';
import get from "lodash/get";
import Paper from '@material-ui/core/Paper';

import withStyles from '@material-ui/core/styles/withStyles';

import {EducationalPlanDetailProps} from './types';

import connect from './Detail.connect';
import styles from './Detail.styles';

class Detail extends React.Component<EducationalPlanDetailProps> {
    componentDidMount() {
        const planId = get(this, 'props.match.params.id');
        this.props.actions.getEducationalDetail(planId);
    }

    render() {
        const {classes} = this.props;

        return (
            <Paper className={classes.root}>
                DetailDetailDetail
            </Paper>
        );
    }
}

export default connect(withStyles(styles)(Detail));
