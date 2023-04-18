import React from 'react';

import classNames from "classnames";

import Typography from "@mui/material/Typography";

import {
  simpleWorkProgramStatusesRussian,
  workProgramStatusesColors,
  workProgramStatusesRussian
} from "../../containers/WorkProgram/constants";
import {WorkProgramStatusProps} from './types';

import useStyles from './WorkProgramStatus.styles';

const WorkProgramStatus: React.FC<WorkProgramStatusProps> = ({status, onClick, disabledStyle}: WorkProgramStatusProps) => {
  const classes = useStyles()
  return (
    <div className={classNames(classes.status, {[classes.cursorPointer]: onClick})}
         onClick={() => typeof onClick === 'function' && onClick(status)}
    >
      <div className={classes.statusPoint} style={{backgroundColor: disabledStyle ? 'grey' : workProgramStatusesColors[status]}}/>
      <Typography> {workProgramStatusesRussian[status] || simpleWorkProgramStatusesRussian[status]} </Typography>
    </div>
  );
}

export default WorkProgramStatus;
