import React from 'react';
import {shallowEqualObjects} from "shallow-equal";
import get from "lodash/get";

import {LiteratureCreateModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {withStyles} from '@mui/styles';

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

        if (!shallowEqualObjects(literature, prevProps.literature)){
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

//@ts-ignore
export default connect(withStyles(styles)(LiteratureCreateModal));
