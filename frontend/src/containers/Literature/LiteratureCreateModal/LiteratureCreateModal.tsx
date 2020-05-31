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

import {LiteratureFields} from '../enum';

import connect from './LiteratureCreateModal.connect';
import styles from './LiteratureCreateModal.styles';

class LiteratureCreateModal extends React.PureComponent<LiteratureCreateModalProps> {
    state = {
        literature: {
            [LiteratureFields.ID]: null,
            [LiteratureFields.DESCRIPTION]: '',
        },
        courseUrlFieldIsFocused: false
    };

    componentDidUpdate(prevProps: Readonly<LiteratureCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {literature} = this.props;

        if (!shallowEqual(literature, prevProps.literature)){
            this.setState({
                course: {
                    [LiteratureFields.ID]: get(literature, LiteratureFields.ID),
                    [LiteratureFields.DESCRIPTION]: get(literature, LiteratureFields.DESCRIPTION, ''),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {literature} = this.state;

        if (literature[LiteratureFields.ID]){
            this.props.actions.changeLiterature(literature);
        } else {
            this.props.actions.createNewLiterature(literature);
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {literature} = this.state;

        this.setState({
            course: {
                ...literature,
                [field]: get(e, 'target.value')
            }
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {literature} = this.state;

        const disableButton = literature[LiteratureFields.DESCRIPTION].length === 0;

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> Создать учебно-методическое обеспечение</DialogTitle>
                <DialogContent>
                    <TextField label="Описание библиографической ссылки *"
                               onChange={this.saveField(LiteratureFields.DESCRIPTION)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={literature[LiteratureFields.DESCRIPTION]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               rows={4}
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
