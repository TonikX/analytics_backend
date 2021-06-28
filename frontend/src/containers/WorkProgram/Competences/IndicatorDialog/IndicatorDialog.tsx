import React from 'react'
import { Dialog } from '@material-ui/core'
import SearchSelector from '../../../../components/SearchSelector'
import { useStyles } from './IndicatorDialog.styles'
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Chip from "@material-ui/core/Chip";

interface IndicatorsProps {
  isOpen: boolean;
  isEditMode?: boolean;
  handleClose: () => void;
}

export default ({ isOpen, isEditMode, handleClose }: IndicatorsProps) => {
  const classes = useStyles()

  return (
    <Dialog
      open={isOpen}
      fullWidth
      maxWidth="sm"
      classes={{
        paper: classes.dialog
      }}
    >
      <DialogTitle className={classes.title}> {isEditMode ? 'Редактировать' : 'Добавить'} индикатор</DialogTitle>
      <SearchSelector
        label="Индикатор * "
        changeSearchText={() => {}}
        list={[]}
        changeItem={() => {}}
        value={''}
        valueLabel={'Тестовый индикатор'}
        className={classes.marginBottom30}
      />
      <SearchSelector
        label="Результаты * "
        changeSearchText={() => {}}
        list={[]}
        changeItem={() => {}}
        value={''}
        valueLabel={'Найти результат'}
      />
      <div className={classes.marginBottom30} style={{display: 'flex', marginTop: '10px'}}>
        <Chip style={{marginRight: '10px'}} onDelete={() => {}} label="Результат 1" />
        <Chip style={{marginRight: '10px'}} onDelete={() => {}} label="Результат 2" />
      </div>
      <SearchSelector
        label="Учебный план * "
        changeSearchText={() => {}}
        list={[]}
        changeItem={() => {}}
        value={''}
        valueLabel={'Найти учебный план'}
      />
      <div style={{display: 'flex', marginTop: '10px'}}>
        <Chip style={{marginRight: '10px'}} onDelete={() => {}} label="Учебный план 1" />
        <Chip style={{marginRight: '10px'}} onDelete={() => {}} label="Учебный план  2" />
      </div>
      <DialogActions className={classes.actions}>
        <Button onClick={handleClose}
                variant="text">
          Отмена
        </Button>
        <Button onClick={() => {}}
                variant="contained"
                //disabled={disableButton}
                color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  )
}