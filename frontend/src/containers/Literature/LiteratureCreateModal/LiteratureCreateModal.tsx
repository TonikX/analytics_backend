import React from 'react';
import {shallowEqual} from "recompose";
import get from "lodash/get";

import {LiteratureCreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import withStyles from '@material-ui/core/styles/withStyles';

import {literatureFields} from '../enum';

import connect from './LiteratureCreateModal.connect';
import styles from './LiteratureCreateModal.styles';

class LiteratureCreateModal extends React.PureComponent<LiteratureCreateModalProps> {
    state = {
        literature: {
            [literatureFields.ID]: null,
            [literatureFields.DESCRIPTION]: '',
        },
        courseUrlFieldIsFocused: false
    };

    componentDidUpdate(prevProps: Readonly<LiteratureCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {literature} = this.props;

        if (!shallowEqual(literature, prevProps.literature)){
            this.setState({
                literature: {
                    [literatureFields.ID]: get(literature, literatureFields.ID),
                    [literatureFields.DESCRIPTION]: get(literature, literatureFields.DESCRIPTION, ''),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {literature} = this.state;

        if (literature[literatureFields.ID]){
            this.props.actions.changeLiterature(literature);
        } else {
            this.props.actions.createNewLiterature(literature);
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {literature} = this.state;

        this.setState({
            literature: {
                ...literature,
                [field]: get(e, 'target.value')
            }
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {literature} = this.state;

        const disableButton = literature[literatureFields.DESCRIPTION].length === 0;

        const isEditMode = Boolean(literature[literatureFields.ID]);

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog,
                    root: classes.root
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} учебно-методическое обеспечение</DialogTitle>
                <DialogContent>
                    <TextField label="Описание библиографической ссылки *"
                               onChange={this.saveField(literatureFields.DESCRIPTION)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={literature[literatureFields.DESCRIPTION]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               rows={10}
                               multiline
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

export default connect(withStyles(styles)(LiteratureCreateModal));
