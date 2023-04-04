import React from 'react';
import get from "lodash/get";
import {shallowEqualObjects} from "shallow-equal";

import {ThemeCreateModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {withStyles} from '@mui/styles';

import {fields} from '../../enum';

import connect from './ThemeMaterialCreateModal.connect';
import styles from './ThemeMaterialCreateModal.styles';

class ThemeMaterialCreateModal extends React.PureComponent<ThemeCreateModalProps> {
    state = {
        id: null,
        topicId: null,
        title: '',
        url: ''
    };

    componentDidUpdate(prevProps: Readonly<ThemeCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {data} = this.props;

        if (!shallowEqualObjects(data, prevProps.data)){
            this.setState({
                ...data
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog(fields.ADD_NEW_MATERIAL_TO_TOPIC);
    }

    handleSave = () => {
        if (this.state.id){
            this.props.actions.updateTopicMaterial(this.state);
        } else {
            this.props.actions.addTopicMaterial(this.state);
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        this.setState({
            [field]: get(e, 'target.value')
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {title, url, id} = this.state;

        const disableButton = title.length === 0 || url.length === 0;

        const isEditMode = Boolean(id);

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} материал</DialogTitle>
                <DialogContent>
                    <TextField label="Название материала *"
                               onChange={this.saveField('title')}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={title}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="URL материала *"
                               onChange={this.saveField('url')}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={url}
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

//@ts-ignore
export default connect(withStyles(styles)(ThemeMaterialCreateModal));
