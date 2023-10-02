import React from 'react';

import classNames from "classnames";

import Typography from "@mui/material/Typography";
import Tooltip from '@mui/material/Tooltip';

import {
  simpleWorkProgramStatusesRussian,
  workProgramStatusesColors,
  workProgramStatusesRussian
} from "../../containers/WorkProgram/constants";
import {WorkProgramStatusProps} from './types';

import useStyles from './WorkProgramStatus.styles';
import {useSelector} from "react-redux";
import {rootState} from "../../store/reducers";
import {getExpertiseLogAccept} from "../../containers/WorkProgram/getters";
import moment from "moment/moment";
import get from "lodash/get";
import {FULL_DATE_FORMAT_WITH_TIME} from "../../common/utils";

const WorkProgramStatus: React.FC<WorkProgramStatusProps> = ({status, onClick, disabledStyle}: WorkProgramStatusProps) => {
  const classes = useStyles()
  const expertiseLogAccept = useSelector((state: rootState) => getExpertiseLogAccept(state))

  return (
    <div className={classNames(classes.status, {[classes.cursorPointer]: onClick})}
         onClick={() => typeof onClick === 'function' && onClick(status)}
    >
      <Tooltip
        title={
          <div className={classes.statusPointTooltip}>
            <div>Дата: {moment(get(expertiseLogAccept?.expertise?.approval_date, 'basic.notification_date')).format(FULL_DATE_FORMAT_WITH_TIME)}</div>
            <div>Имя: {expertiseLogAccept?.user?.first_name}</div>
            <div>Фамилия: {expertiseLogAccept?.user?.last_name}</div>
            <div>
              {expertiseLogAccept?.user?.isu_number && (
                 `Номер ИСУ: ${expertiseLogAccept?.user?.isu_number}`
              )}
            </div>
          </div>
        }
      >
        <div className={classes.statusPointBlock}>
          <div className={classes.statusPoint} style={{backgroundColor: disabledStyle ? 'grey' : workProgramStatusesColors[status]}}/>
          <Typography> {workProgramStatusesRussian[status] || simpleWorkProgramStatusesRussian[status]} </Typography>
        </div>
      </Tooltip>
    </div>
  );
}

export default WorkProgramStatus;
