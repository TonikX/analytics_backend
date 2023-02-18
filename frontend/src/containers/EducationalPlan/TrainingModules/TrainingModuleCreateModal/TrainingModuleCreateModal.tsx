import React, {ReactText} from 'react';
import {shallowEqual} from "recompose";
import get from "lodash/get";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import withStyles from '@material-ui/core/styles/withStyles';

import SimpleSelector from "../../../../components/SimpleSelector";

import {TrainingModuleFields} from '../enum';
import {typesListArray} from '../constants'

import {TrainingModuleCreateModalProps} from './types';

import connect from './TrainingModuleCreateModal.connect';
import styles from './TrainingModuleCreateModal.styles';

class TrainingModuleCreateModal extends React.PureComponent<TrainingModuleCreateModalProps> {
    state = {
        trainingModule: {
            [TrainingModuleFields.ID]: null,
            [TrainingModuleFields.NAME]: '',
            [TrainingModuleFields.DESCRIPTION]: '',
            // [TrainingModuleFields.TYPE]: '',
            father: undefined,
        },
    };

    componentDidUpdate(prevProps: Readonly<TrainingModuleCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {trainingModule} = this.props;

        if (!shallowEqual(trainingModule, prevProps.trainingModule)){
            this.setState({
                trainingModule: {
                    [TrainingModuleFields.ID]: get(trainingModule, TrainingModuleFields.ID),
                    [TrainingModuleFields.NAME]: get(trainingModule, TrainingModuleFields.NAME, ''),
                    [TrainingModuleFields.DESCRIPTION]: get(trainingModule, TrainingModuleFields.DESCRIPTION, ''),
                    [TrainingModuleFields.TYPE]: get(trainingModule, TrainingModuleFields.TYPE, ''),
                    father: get(trainingModule, 'father', undefined),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {trainingModule} = this.state;

        if (trainingModule[TrainingModuleFields.ID]){
            this.props.actions.changeTrainingModule({data: trainingModule});
        } else {
            this.props.actions.createTrainingModule({data: trainingModule});
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {trainingModule} = this.state;

        this.setState({
            trainingModule: {
                ...trainingModule,
                [field]: get(e, 'target.value')
            }
        })
    }

    handleChangeType = (value: ReactText) => {
        this.setState({
            trainingModule: {
                ...this.state.trainingModule,
                [TrainingModuleFields.TYPE]: value
            }
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {trainingModule} = this.state;

        const disableButton = trainingModule[TrainingModuleFields.NAME].length === 0;
        const isEditMode = trainingModule[TrainingModuleFields.ID];

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} учебный модуль </DialogTitle>
                <DialogContent>
                    <TextField label="Название *"
                               onChange={this.saveField(TrainingModuleFields.NAME)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={trainingModule[TrainingModuleFields.NAME]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    {/*<SimpleSelector label="Тип *"*/}
                    {/*                value={trainingModule[TrainingModuleFields.TYPE]}*/}
                    {/*                onChange={this.handleChangeType}*/}
                    {/*                metaList={typesListArray}*/}
                    {/*                wrapClass={classes.selectorWrap}*/}
                    {/*/>*/}
                    <TextField label="Описание"
                               onChange={this.saveField(TrainingModuleFields.DESCRIPTION)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={trainingModule[TrainingModuleFields.DESCRIPTION]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               rows={5}
                               rowsMax={5}
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

export default connect(withStyles(styles)(TrainingModuleCreateModal));
