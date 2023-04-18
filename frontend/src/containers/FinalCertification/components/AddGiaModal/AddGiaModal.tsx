import React from 'react';

import {Props} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import {withStyles} from '@mui/styles';

import SearchSelector from "../../../../components/SearchSelector";

import connect from './AddGiaModal.connect';
import styles from './AddGiaModal.styles';

class AddGiaModal extends React.PureComponent<Props> {
    state = {
        id: null,
        label: ''
    };

    componentDidMount() {
        this.props.actions.getCertificationList();
    }

    handleClose = () => {
        this.props.closeDialog();
    }

    handleSave = () => {
        this.props.saveDialog(this.state.id, this.state.label);
        this.props.closeDialog();
    }

    saveGia = (value: string, label: string) => {
        this.setState({id: value, label})
    }

    handleChangeSearchText = (searchText: string) => {
        this.props.actions.setSearchText(searchText);
        this.props.actions.getCertificationList();
    }

    render() {
        //@ts-ignore
        const {classes} = this.props;
        const {isOpen, list} = this.props;

        const disableButton = this.state.id === null;

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog,
                    root: classes.root,
                }}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Добавить ГИА</DialogTitle>

                <DialogContent className={classes.dialogContent}>
                    <SearchSelector label="ГИА * "
                                    changeSearchText={this.handleChangeSearchText}
                                    list={list}
                                    changeItem={this.saveGia}
                                    value={''}
                                    valueLabel={''}
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
export default connect(withStyles(styles)(AddGiaModal));
