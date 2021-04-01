import React from 'react';
import {shallowEqual} from "recompose";
import get from "lodash/get";

import {StructuralUnitsCreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import withStyles from '@material-ui/core/styles/withStyles';

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

        if (!shallowEqual(structuralUnit, prevProps.structuralUnit)){
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
                <DialogContent>
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
