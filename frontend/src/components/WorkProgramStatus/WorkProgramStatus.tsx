import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from "@material-ui/core/Typography";

import {workProgramStatusesColors, workProgramStatusesRussian} from "../../containers/WorkProgram/constants";
import {WorkProgramStatusProps} from './types';

import styles from './WorkProgramStatus.styles';

const WorkProgramStatus = ({classes, status}: WorkProgramStatusProps) => {
    return <div className={classes.status} key={status}>
        <div className={classes.statusPoint} style={{backgroundColor: workProgramStatusesColors[status]}}/>
        <Typography> {workProgramStatusesRussian[status]} </Typography>
    </div>;
}

export default withStyles(styles)(WorkProgramStatus);
