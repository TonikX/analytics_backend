import React from 'react';

import {AddWorkProgramModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';

import SearchSelector from "../../../../../components/SearchSelector/SearchSelector";
import connect from './AddWorkProgramModal.connect';
import styles from './AddWorkProgramModal.styles';

class AddWorkProgramModal extends React.PureComponent<AddWorkProgramModalProps> {
    state = {
        id: null
    };

    componentDidMount() {
        this.props.workProgramActions.getWorkProgramList();
    }

    handleClose = () => {
        this.props.closeDialog();
    }

    handleSave = () => {
        this.props.saveDialog(this.state.id);
        this.props.closeDialog();
    }

    saveWorkProgram = (value: string) => {
        this.setState({id: value})
    }

    handleChangeSearchText = (searchText: string) => {
        this.props.workProgramActions.changeSearchQuery(searchText);
        this.props.workProgramActions.getWorkProgramList();
    }

    render() {
        const {isOpen, classes, workProgramList} = this.props;

        const disableButton = this.state.id === null;

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog,
                    root: classes.root,
                }}
            >
                <DialogTitle>Добавить рабочую программу</DialogTitle>

                <DialogContent>
                    <SearchSelector label="Рабочая программа * "
                                    changeSearchText={this.handleChangeSearchText}
                                    list={workProgramList}
                                    changeItem={this.saveWorkProgram}
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

export default connect(withStyles(styles)(AddWorkProgramModal));
