import React from 'react';
import {shallowEqualObjects} from "shallow-equal";
import get from "lodash/get";

import {StructuralUnitsCreateModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {withStyles} from '@mui/styles';

import {structuralUnitFields} from '../enum';

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';

class CreateModal extends React.PureComponent<StructuralUnitsCreateModalProps> {
    state = {
        structuralUnit: {
            [structuralUnitFields.ID]: null,
            [structuralUnitFields.TITLE]: '',
        },
    };

    componentDidUpdate(prevProps: Readonly<StructuralUnitsCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {structuralUnit} = this.props;

        if (!shallowEqualObjects(structuralUnit, prevProps.structuralUnit)){
            this.setState({
                structuralUnit: {
                    [structuralUnitFields.ID]: get(structuralUnit, structuralUnitFields.ID),
                    [structuralUnitFields.TITLE]: get(structuralUnit, structuralUnitFields.TITLE, ''),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {structuralUnit} = this.state;

        if (structuralUnit[structuralUnitFields.ID]){
            this.props.actions.changeStructuralUnit(structuralUnit);
        } else {
            this.props.actions.createNewStructuralUnit(structuralUnit);
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {structuralUnit} = this.state;

        this.setState({
            structuralUnit: {
                ...structuralUnit,
                [field]: get(e, 'target.value')
            }
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {structuralUnit} = this.state;

        const disableButton = structuralUnit[structuralUnitFields.TITLE].length === 0;

        const isEditMode = Boolean(structuralUnit[structuralUnitFields.ID]);

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'}  структурное подразделение </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <TextField label="Название *"
                               onChange={this.saveField(structuralUnitFields.TITLE)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={structuralUnit[structuralUnitFields.TITLE]}
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
export default withStyles(styles)(connect(CreateModal));
