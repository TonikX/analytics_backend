import React from 'react';
import {shallowEqualObjects} from "shallow-equal";
import get from "lodash/get";

import {CourseCreateModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {withStyles} from '@mui/styles';

import {CompetenceFields} from '../enum';

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';
import classNames from "classnames";

class CreateModal extends React.PureComponent<CourseCreateModalProps> {
    state = {
        competence: {
            [CompetenceFields.ID]: null,
            [CompetenceFields.TITLE]: '',
            [CompetenceFields.NUMBER]: '',
        },
    };

    componentDidUpdate(prevProps: Readonly<CourseCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {competence} = this.props;

        if (!shallowEqualObjects(competence, prevProps.competence)){
            this.setState({
                competence: {
                    [CompetenceFields.ID]: get(competence, CompetenceFields.ID),
                    [CompetenceFields.TITLE]: get(competence, CompetenceFields.TITLE, ''),
                    [CompetenceFields.NUMBER]: get(competence, CompetenceFields.NUMBER, ''),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {competence} = this.state;

        if (competence[CompetenceFields.ID]){
            this.props.actions.changeCompetence(competence);
        } else {
            this.props.actions.createNewCompetence(competence);
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {competence} = this.state;

        this.setState({
            competence: {
                ...competence,
                [field]: get(e, 'target.value')
            }
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {competence} = this.state;

        const disableButton = competence[CompetenceFields.TITLE].length === 0 || competence[CompetenceFields.NUMBER].length === 0;

        const isEditMode = Boolean(competence[CompetenceFields.ID]);

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} компетенцию</DialogTitle>
                <DialogContent>
                    <TextField label="Номер компетенции *"
                               onChange={this.saveField(CompetenceFields.NUMBER)}
                               variant="outlined"
                               className={classNames(classes.input, classes.marginBottom30)}
                               fullWidth
                               value={competence[CompetenceFields.NUMBER]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Название компетенции *"
                               onChange={this.saveField(CompetenceFields.TITLE)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={competence[CompetenceFields.TITLE]}
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
