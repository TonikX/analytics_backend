import React, {ReactText} from 'react';
import {shallowEqualObjects} from "shallow-equal";
import get from "lodash/get";

import {AddUserToStructuralUnitModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {withStyles} from '@mui/styles';

import SimpleSelector from "../../../../components/SimpleSelector/SimpleSelector";
import UserSelector from "../../../Profile/UserSelector";

import {getUserFullName} from "../../../../common/utils";
import {structuralUnitUserFields} from '../../enum';

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';

import {positionsListArray} from '../constants';

class CreateModal extends React.PureComponent<AddUserToStructuralUnitModalProps> {
    state = {
        structuralUnit: {
            [structuralUnitUserFields.ID]: null,
            [structuralUnitUserFields.STRUCTURAL_UNIT]: '',
            [structuralUnitUserFields.USER]: {},
            [structuralUnitUserFields.STATUS]: '',
        },
    };

    componentDidUpdate(prevProps: Readonly<AddUserToStructuralUnitModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {structuralUnit} = this.props;

        if (!shallowEqualObjects(structuralUnit, prevProps.structuralUnit)){
            this.setState({
                structuralUnit: {
                    [structuralUnitUserFields.ID]: get(structuralUnit, structuralUnitUserFields.ID),
                    [structuralUnitUserFields.STRUCTURAL_UNIT]: get(structuralUnit, structuralUnitUserFields.STRUCTURAL_UNIT),
                    [structuralUnitUserFields.USER]: get(structuralUnit, structuralUnitUserFields.USER, {}),
                    [structuralUnitUserFields.STATUS]: get(structuralUnit, structuralUnitUserFields.STATUS),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {structuralUnit} = this.state;

        if (structuralUnit[structuralUnitUserFields.ID]){
            this.props.actions.changeUserFromStructuralUnit(structuralUnit);
        } else {
            this.props.actions.addUserToStructuralUnit(structuralUnit);
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

    saveUser = (value: ReactText) => {
        const {structuralUnit} = this.state;

        this.setState({
            structuralUnit: {
                ...structuralUnit,
                [structuralUnitUserFields.USER]: {
                    ...structuralUnit[structuralUnitUserFields.USER],
                    id: value
                }
            }
        });
    }

    handleChangePosition = (value: string) => {
        const {structuralUnit} = this.state;

        this.setState({
            structuralUnit: {
                ...structuralUnit,
                [structuralUnitUserFields.STATUS]: value
            }
        });
    }

    render() {
        const {isOpen, classes} = this.props;
        const {structuralUnit} = this.state;

        const disableButton = !get(structuralUnit[structuralUnitUserFields.USER], 'id', '') || !structuralUnit[structuralUnitUserFields.STATUS];

        const isEditMode = Boolean(structuralUnit[structuralUnitUserFields.ID])

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Добавить'} пользователя </DialogTitle>
                <DialogContent>
                    <UserSelector selectorLabel='Сотрудник'
                                  value={get(structuralUnit[structuralUnitUserFields.USER], 'id', '')}
                                  handleChange={this.saveUser}
                                  //@ts-ignore
                                  label={getUserFullName(structuralUnit[structuralUnitUserFields.USER])}
                                  fullWidth
                    />
                    <SimpleSelector label="Должность *"
                                    value={structuralUnit[structuralUnitUserFields.STATUS]}
                                    onChange={this.handleChangePosition}
                                    metaList={positionsListArray}
                                    wrapClass={classes.wrapSelector}
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

export default connect(withStyles(styles)(CreateModal));
