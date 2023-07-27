import React, {useCallback, useEffect, useState, useMemo} from 'react'
import {Dialog, Select} from '@mui/material'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Chip from '@mui/material/Chip'
import CompetenceSelector from '../../../../Competences/CompetenceSelector'
import IndicatorSelector from '../../../../Competences/Indicators/IndicatorSelector'
import {useStyles} from './IndicatorDialog.styles'
import actions from '../../../actions'
import {useDispatch} from 'react-redux'
import Tooltip from "@mui/material/Tooltip/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface IndicatorsProps {
    workProgramId?: number;
    practiceId?: number;
    isOpen: boolean;
    defaultCompetence?: {
        value: number;
        label: string;
    };
    addedIndicators: {
        value: number;
        label: string;
    }[];
    isEditMode?: boolean;
    handleClose: () => void;
    onDeleteZun: (id: number) => void;
}

export default ({isOpen, handleClose, defaultCompetence, practiceId, workProgramId, addedIndicators, onDeleteZun}: IndicatorsProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [skipReload, setSkipReload] = useState(true);
    const [competence, setCompetence] = useState<{ value: number; label: string }>({value: 0, label: ''});
    const [indicators, setIndicators] = useState<{ value: number; label: string }[]>(addedIndicators);

    const [onlyCurrentGh, setOnlyCurrentGh] = useState(true);
    const addIndicator = (value: number|string, label: string) => {
        if (typeof value === 'string' || indicators.find((indicator) => indicator.value === value)) return
        setIndicators([
          ...indicators,
          {value, label}
        ])
    };

    const close = () => {
        handleClose();
        setOnlyCurrentGh(true);
    };

    const removeIndicator = (value: number) => {
        // если индикатор был ранее добавлен, нужно удалить его на беке
        if (addedIndicators.find((item: any) => item.value === value)) {
            onDeleteZun(value);
            dispatch(actions.deleteZun({
                practice_id: practiceId,
                id: value,
                skipReload,
            }));
        }

        setIndicators(indicators.filter((indicator) => indicator.value !== value))
    };

    const addCompetence = (value: number, label: string) => {
        setCompetence({
            value,
            label
        })
    };

    const saveZun = useCallback(() => {
        dispatch(actions.saveZun({
            indicators: indicators,
            workprogram_id: workProgramId,
            practice_id: practiceId,
            onlyCurrentGh: onlyCurrentGh,
            skipReload,
        }));
        close()
    }, [indicators, competence, onlyCurrentGh, skipReload]);

    const disableButton = useMemo(() => (indicators.length === 0 || competence.value === 0),
        [indicators, competence]
    );

    useEffect(() => {
        if (defaultCompetence) {
            setCompetence(defaultCompetence)
        }
    }, [defaultCompetence]);

    // useEffect(() => {
    //     if (defaultIndicator) {
    //         setIndicators(defaultIndicator)
    //     }
    // }, [defaultIndicator]);

    const selectOptions = [
        {
            label: 'Связать индикатор только с этой ОХ',
            value: true
        },
        {
            label: 'Связать индикатор со всеми ОХ',
            value: false
        },
    ];

    return (
        <Dialog
            open={isOpen}
            fullWidth
            maxWidth="sm"
            classes={{
                paper: classes.dialog
            }}
        >
            <DialogTitle className={classes.title}> {addedIndicators.length > 0 ? 'Редактировать' : 'Добавить'} индикатор</DialogTitle>
            <CompetenceSelector
                onChange={addCompetence}
                value={competence.value}
                valueLabel={competence.label}
                label="Компетенция"
                className={classes.marginBottom30}
                disabled={Boolean(defaultCompetence)}
            />
            <IndicatorSelector
                onChange={addIndicator}
                label="Индикатор"
                competenceId={competence.value}
                disabled={competence.value === 0}
                value={0}
                cleanLabelAfterSelect
            />
            <div className={classes.chipsList}>
                {indicators.map(item => (
                    <Tooltip title={item.label}>
                    <Chip key={`indicator-${item.value}`} className={classes.chip} onDelete={() => removeIndicator(item.value)}
                          label={`${item.label.slice(0, 30)}...`}/>
                    </Tooltip>
                ))}
            </div>
            <Select
                value={onlyCurrentGh}
                // @ts-ignore
                onChange={(event) => setOnlyCurrentGh(event.target.value)}
                variant="outlined"
                fullWidth
            >
                {selectOptions.map((item: {label: string; value: any}, index) =>
                    <MenuItem value={item.value} key={`block-${index}`}>
                        {item.label}
                    </MenuItem>
                )}
            </Select>
            <FormControlLabel
              style={{marginTop: 10}}
              control={<Checkbox checked={skipReload} onChange={(e, checked) => setSkipReload(checked)} />}
              label={<b style={{fontSize: 16}}>Не перезагружать страницу после добавления индикатора (изменения отобразятся после перезагрузки страницы вручную)</b>}
            />
            <DialogActions className={classes.actions}>
                <Button onClick={close}
                        variant="text">
                    Отмена
                </Button>
                <Button onClick={saveZun}
                        variant="contained"
                        disabled={disableButton}
                        color="primary">
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    )
}
