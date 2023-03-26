import React, {useCallback, useEffect, useState, useMemo} from 'react'
import {Dialog} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Chip from '@material-ui/core/Chip'
import CompetenceSelector from '../../../../Competences/CompetenceSelector'
import IndicatorSelector from '../../../../Competences/Indicators/IndicatorSelector'
import {useStyles} from './IndicatorDialog.styles'
import actions from '../../../actions'
import {useDispatch} from 'react-redux'
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
interface IndicatorsProps {
    workProgramId: number;
    isOpen: boolean;
    defaultCompetence?: {
        value: number;
        label: string;
    };
    defaultIndicator?: {
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

export default ({isOpen, handleClose, defaultCompetence, defaultIndicator, workProgramId, addedIndicators, onDeleteZun}: IndicatorsProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [competence, setCompetence] = useState<{ value: number; label: string }>({value: 0, label: ''});
    const [indicator, setIndicator] = useState<{ value: number; label: string }>({value: 0, label: ''});

    const addIndicator = (value: number, label: string) => {
        setIndicator({
            value,
            label
        })
    };

    const removeIndicator = (value: number) => {
        onDeleteZun(value);
        dispatch(actions.deleteZun(value));
    };

    const addCompetence = (value: number, label: string) => {
        setCompetence({
            value,
            label
        })
    };

    const saveZun = useCallback(() => {
        dispatch(actions.saveZun({
            indicator: indicator.value,
            workprogram_id: workProgramId
        }));
        handleClose()
    }, [indicator, competence]);

    const disableButton = useMemo(() => (indicator.value === 0 || competence.value === 0),
        [indicator, competence]
    );


    useEffect(() => {
        setIndicator({value: 0, label: ''})
    }, [competence]);

    useEffect(() => {
        if (defaultCompetence) {
            setCompetence(defaultCompetence)
        }
    }, [defaultCompetence]);

    useEffect(() => {
        if (defaultIndicator) {
            setIndicator(defaultIndicator)
        }
    }, [defaultIndicator]);

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
                value={0}
                label="Индикатор"
                className={classes.marginBottom10}
                competenceId={competence.value}
                disabled={competence.value === 0 || Boolean(defaultIndicator)}
            />
            <div className={classes.chipsList}>
                {addedIndicators.map(item => (
                    <Tooltip title={item.label}>
                    <Chip key={`indicator-${item.value}`} className={classes.chip} onDelete={() => removeIndicator(item.value)}
                          label={`${item.label.slice(0, 30)}...`}/>
                    </Tooltip>
                ))}
            </div>
            <DialogActions className={classes.actions}>
                <Button onClick={handleClose}
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
