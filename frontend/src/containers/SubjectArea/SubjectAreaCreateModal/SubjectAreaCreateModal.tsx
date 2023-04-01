import React from 'react';
import {shallowEqualObjects} from "shallow-equal";
import get from "lodash/get";

import {SubjectAreaCreateModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {withStyles} from '@mui/styles';

import {SubjectAreaFields} from '../enum';

import connect from './SubjectAreaCreateModal.connect';
import styles from './SubjectAreaCreateModal.styles';

class SubjectAreaCreateModal extends React.PureComponent<SubjectAreaCreateModalProps> {
    state = {
        subjectArea: {
            [SubjectAreaFields.ID]: null,
            [SubjectAreaFields.TITLE]: '',
        },
    };

    componentDidUpdate(prevProps: Readonly<SubjectAreaCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {subjectArea} = this.props;

        if (!shallowEqualObjects(subjectArea, prevProps.subjectArea)){
            this.setState({
                subjectArea: {
                    [SubjectAreaFields.ID]: get(subjectArea, SubjectAreaFields.ID),
                    [SubjectAreaFields.TITLE]: get(subjectArea, SubjectAreaFields.TITLE, ''),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {subjectArea} = this.state;

        if (subjectArea[SubjectAreaFields.ID]){
            this.props.actions.changeSubjectArea(subjectArea);
        } else {
            this.props.actions.createNewSubjectArea(subjectArea);
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {subjectArea} = this.state;

        this.setState({
            subjectArea: {
                ...subjectArea,
                [field]: get(e, 'target.value')
            }
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {subjectArea} = this.state;

        const disableButton = subjectArea[SubjectAreaFields.TITLE].length === 0;

        const isEditMode = Boolean(subjectArea[SubjectAreaFields.ID]);
        return <></>
        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} предметную область</DialogTitle>
                <DialogContent>
                    <TextField label="Название *"
                               onChange={this.saveField(SubjectAreaFields.TITLE)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={subjectArea[SubjectAreaFields.TITLE]}
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

export default connect(withStyles(styles)(SubjectAreaCreateModal));
