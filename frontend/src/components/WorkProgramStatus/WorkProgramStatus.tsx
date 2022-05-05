import React from 'react';

import classNames from "classnames";

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from "@material-ui/core/Typography";

import {
    simpleWorkProgramStatusesRussian,
    workProgramStatusesColors,
    workProgramStatusesRussian
} from "../../containers/WorkProgram/constants";
import {WorkProgramStatusProps} from './types';

import styles from './WorkProgramStatus.styles';

const WorkProgramStatus = ({classes, status, onClick, disabledStyle}: WorkProgramStatusProps) =>
    <div className={classNames(classes.status, {[classes.cursorPointer]: onClick})}
         onClick={() => typeof onClick === 'function' && onClick(status)}
    >
        <div className={classes.statusPoint} style={{backgroundColor: disabledStyle ? 'grey' : workProgramStatusesColors[status]}}/>
        <Typography> {workProgramStatusesRussian[status] || simpleWorkProgramStatusesRussian[status]} </Typography>
    </div>
;

export default withStyles(styles)(WorkProgramStatus);
