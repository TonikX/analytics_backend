import React from 'react';
import {shallowEqual} from "recompose";
import get from "lodash/get";
import classNames from "classnames";

import {IndicatorCreateModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import withStyles from '@mui/material/styles/withStyles';

import { IndicatorsFields } from '../../../Indicators/enum';

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';

class CreateModal extends React.PureComponent<IndicatorCreateModalProps> {
    state = {
        indicator: {
            [IndicatorsFields.ID]: null,
            [IndicatorsFields.TITLE]: '',
            [IndicatorsFields.NUMBER]: '',
            [IndicatorsFields.COMPETENCE]: '',
        },
    };

    componentDidUpdate(prevProps: Readonly<IndicatorCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {indicator} = this.props;

        if (!shallowEqual(indicator, prevProps.indicator)){
            this.setState({
                indicator: {
                    [IndicatorsFields.ID]: get(indicator, IndicatorsFields.ID),
                    [IndicatorsFields.TITLE]: get(indicator, IndicatorsFields.TITLE, ''),
                    [IndicatorsFields.NUMBER]: get(indicator, IndicatorsFields.NUMBER, ''),
                    [IndicatorsFields.COMPETENCE]: get(indicator, IndicatorsFields.COMPETENCE, ''),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {indicator} = this.state;

        if (indicator[IndicatorsFields.ID]){
            this.props.actions.changeIndicator(indicator);
        } else {
            this.props.actions.createIndicator(indicator);
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {indicator} = this.state;

        this.setState({
            indicator: {
                ...indicator,
                [field]: get(e, 'target.value')
            }
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {indicator} = this.state;

        const disableButton = indicator[IndicatorsFields.TITLE].length === 0
            || indicator[IndicatorsFields.NUMBER].length === 0
        ;

        const isEditMode = Boolean(indicator[IndicatorsFields.ID]);

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} индикатор</DialogTitle>
                <DialogContent>
                    <TextField label="Название индикатора *"
                               onChange={this.saveField(IndicatorsFields.TITLE)}
                               variant="outlined"
                               className={classNames(classes.input, classes.marginBottom30)}
                               fullWidth
                               value={indicator[IndicatorsFields.TITLE]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Номер индикатора *"
                               onChange={this.saveField(IndicatorsFields.NUMBER)}
                               variant="outlined"
                               className={classNames(classes.input, classes.marginBottom30)}
                               fullWidth
                               value={indicator[IndicatorsFields.NUMBER]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={this.handleClose}
                            variant="text">
                        Отмена
                    </Button>
                    <Button onClick={this.handleSave}
                            variant="contained"
                            disabled={disableButton}
                            color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

// @ts-ignore
export default connect(withStyles(styles)(CreateModal));