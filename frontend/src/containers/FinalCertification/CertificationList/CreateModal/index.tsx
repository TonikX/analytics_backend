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
import {CertificationFields} from "../../enum";
import {withRouter} from "react-router-dom";
import {appRouter} from "../../../../service/router-service";

class CreateModal extends React.PureComponent<CreateModalProps> {
    state = {
        state: {
            [CertificationFields.TITLE]: '',
            [CertificationFields.YEAR]: (new Date()).getFullYear(),
            [CertificationFields.OP_LEADER]: '',
            [CertificationFields.AUTHORS]: '',
        } as any,
    };

    handleClose = () => {
        this.props.actions.closeModal();
    }

    handleSave = () => {
        const {state} = this.state;
        const history = this.props.history;
        const callback = (id: number) => {
            history.push(appRouter.getFinalCertificationLink(id));
        }
        this.props.actions.createCertification({state: state, callback});
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {state} = this.state;

        this.setState({
            ...this.state,
            state: {
                ...state,
                [field]: get(e, 'target.value')
            }
        })
    }

    saveNumberField = (field: string) => (e: React.ChangeEvent) => {
        const {state} = this.state;
        const value = parseInt(get(e, 'target.value'));
        if (Number.isNaN(value)) return;

        this.setState({
            ...this.state,
            state: {
                ...state,
                [field]: value,
            }
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {state} = this.state;

        const disableButton = !state[CertificationFields.YEAR]
            || state[CertificationFields.AUTHORS].length === 0
            || state[CertificationFields.OP_LEADER].length === 0
            || state[CertificationFields.TITLE].length === 0
        ;

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> Создать рабочую программу ГИА </DialogTitle>
                <DialogContent>
                    <TextField label="Название"
                               onChange={this.saveField(CertificationFields.TITLE)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={state[CertificationFields.TITLE]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Год"
                               onChange={this.saveField(CertificationFields.YEAR)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={state[CertificationFields.YEAR]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Руководитель образовательной программы"
                               onChange={this.saveField(CertificationFields.OP_LEADER)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={state[CertificationFields.OP_LEADER]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Авторский состав"
                               onChange={this.saveField(CertificationFields.AUTHORS)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={state[CertificationFields.AUTHORS]}
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

export default connect(withStyles(styles)(withRouter(CreateModal)));
