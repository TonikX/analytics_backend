import React from 'react';
import get from "lodash/get";

import {CreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import withStyles from '@material-ui/core/styles/withStyles';

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';
import {MinimalPracticeState} from "../../types";
import {PracticeFields} from "../../enum";

class CreateModal extends React.PureComponent<CreateModalProps> {
    state = {
        minimalPracticeState: {
            [PracticeFields.YEAR]: 2022, // todo current year using moment
            [PracticeFields.OP_LEADER]: '',
            [PracticeFields.AUTHORS]: '',
            [PracticeFields.FORM_OF_CERTIFICATION_TOOLS]: '',
        } as MinimalPracticeState,
    };

    handleClose = () => {
        this.props.actions.closeModal();
    }

    handleSave = () => {
        const {minimalPracticeState} = this.state;

        this.props.actions.createPractice(minimalPracticeState);
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {minimalPracticeState} = this.state;

        this.setState({
            minimalPracticeState: {
                ...minimalPracticeState,
                [field]: get(e, 'target.value')
            }
        })
    }

    saveNumberField = (field: string) => (e: React.ChangeEvent) => {
        const {minimalPracticeState} = this.state;
        const value = parseInt(get(e, 'target.value'));
        if (Number.isNaN(value)) return;

        this.setState({
            minimalPracticeState: {
                ...minimalPracticeState,
                [field]: value,
            }
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {minimalPracticeState} = this.state;

        const disableButton = !minimalPracticeState[PracticeFields.YEAR]
            || minimalPracticeState[PracticeFields.AUTHORS].length === 0
            || minimalPracticeState[PracticeFields.OP_LEADER].length === 0
            || minimalPracticeState[PracticeFields.FORM_OF_CERTIFICATION_TOOLS].length === 0
        ;

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> Создать практику </DialogTitle>
                <DialogContent>
                    <TextField label="Год"
                               onChange={this.saveNumberField(PracticeFields.YEAR)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={minimalPracticeState[PracticeFields.YEAR]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Руководитель образовательной программы"
                               onChange={this.saveField(PracticeFields.OP_LEADER)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={minimalPracticeState[PracticeFields.OP_LEADER]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Авторский состав"
                               onChange={this.saveField(PracticeFields.AUTHORS)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={minimalPracticeState[PracticeFields.AUTHORS]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Форма промежуточной аттестации"
                               onChange={this.saveField(PracticeFields.FORM_OF_CERTIFICATION_TOOLS)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={minimalPracticeState[PracticeFields.FORM_OF_CERTIFICATION_TOOLS]}
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
