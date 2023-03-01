import React from 'react';
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import {useStyles} from './StatusPoint.styles';

type Props = {
  backgroundColor: string;
  status?: string;
  statusText: string;
  disabledStyle?: boolean;
  onClick?: (status: string) => void;
}

export const StatusPoint: React.FC<Props> = ({
  status = '',
  statusText,
  backgroundColor,
  onClick,
  disabledStyle,
}) => {
  const classes = useStyles()
  return (
    <div className={classNames(classes.status, {[classes.cursorPointer]: onClick})}
         onClick={() => typeof onClick === 'function' && onClick(status)}
    >
      <div
        className={classNames(classes.statusPoint, {[classes.disabledStyle]: disabledStyle})}
        style={{backgroundColor}}
      />
      <Typography> {statusText} </Typography>
    </div>
  )
}
;