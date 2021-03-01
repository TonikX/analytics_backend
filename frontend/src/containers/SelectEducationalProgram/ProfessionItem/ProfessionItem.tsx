import React from 'react'

import {useStyles} from './ProfessionItem.styles'

import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import CancelOutlined from "@material-ui/icons/CancelOutlined";

import {ProfessionItemProps} from './types'
import {ProfessionType} from '../types'
import {professionFields, selectListModes} from '../enum'


export const ProfessionItem: React.FC<ProfessionItemProps> = ({ style, profession, selectProfession, mode, unselectProfession}) => {
  const classes = useStyles()
  const addProfession = (profession: ProfessionType) => selectProfession(profession)
  const removeProfession = (profession: ProfessionType) => unselectProfession(profession)
  const onHandle = () => mode === selectListModes.SELECT 
    ? addProfession(profession) 
    : removeProfession(profession)

  if (profession) {
    return (
      <div
        style={style}
        className={classes.professionListItem}
        onClick={onHandle}
      >
        <Typography className={classes.professionTitle}>{profession[professionFields.TITLE]}</Typography>
        <IconButton className={classes.iconButton}>
          {mode === selectListModes.SELECT
            ? <CheckCircleOutline className={classes.addIcon} />
            : <CancelOutlined className={classes.removeIcon} />
          }
        </IconButton>
      </div>
    )
  } else return null
}
