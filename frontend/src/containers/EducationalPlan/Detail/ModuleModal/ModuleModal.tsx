import React from 'react';
import {shallowEqualObjects} from "shallow-equal";
import get from "lodash/get";

import {ModuleModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import withStyles from '@mui/material/styles/withStyles';

import {EducationalPlanBlockFields, ModuleFields} from '../../enum';

import connect from './ModuleModal.connect';
import styles from './ModuleModal.styles';

class ModuleModal extends React.Component<ModuleModalProps> {
    state = {
        block: {
            [EducationalPlanBlockFields.ID]: null
        },
        module: {
            [ModuleFields.ID]: null,
            [ModuleFields.NAME]: '',
        },
    };

    componentDidUpdate(prevProps: Readonly<ModuleModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {module} = this.props;

        if (!shallowEqualObjects(module, prevProps.module)){
            this.setState({
                module: {
                    [ModuleFields.ID]: get(module, ModuleFields.ID),
                    [ModuleFields.NAME]: get(module, ModuleFields.NAME, ''),
                },
                block: {
                    [EducationalPlanBlockFields.ID]: get(module, 'blockId', ''),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeCreateModuleDialog();
    }

    handleSave = () => {
        const {module, block} = this.state;

        if (module[ModuleFields.ID]){
            this.props.actions.changeModule({...module, blockId: block[EducationalPlanBlockFields.ID]});
        } else {
            this.props.actions.createModule({...module, blockId: block[EducationalPlanBlockFields.ID]});
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {module} = this.state;

        this.setState({
            module: {
                ...module,
                [field]: get(e, 'target.value')
            }
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {module} = this.state;

        const disableButton = module[ModuleFields.NAME].length === 0;

        const isEditMode = Boolean(module[ModuleFields.ID]);

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} модуль</DialogTitle>
                <DialogContent>
                    <TextField label="Название *"
                               onChange={this.saveField(ModuleFields.NAME)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={module[ModuleFields.NAME]}
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

export default connect(withStyles(styles)(ModuleModal));
