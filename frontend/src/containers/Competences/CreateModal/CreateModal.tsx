import React from 'react';
import {shallowEqual} from "recompose";
import get from "lodash/get";

import {CourseCreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import withStyles from '@material-ui/core/styles/withStyles';

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

        if (!shallowEqual(competence, prevProps.competence)){
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
                    <TextField label="Название компетенции *"
                               onChange={this.saveField(CompetenceFields.TITLE)}
                               variant="outlined"
                               className={classNames(classes.input, classes.marginBottom30)}
                               fullWidth
                               value={competence[CompetenceFields.TITLE]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Номер компетенции *"
                               onChange={this.saveField(CompetenceFields.NUMBER)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={competence[CompetenceFields.NUMBER]}
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

export default connect(withStyles(styles)(CreateModal));
