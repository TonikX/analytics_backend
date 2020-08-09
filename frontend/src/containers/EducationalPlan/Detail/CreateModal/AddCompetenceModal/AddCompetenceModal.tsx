import React from 'react';
import get from 'lodash/get';

import {AddWorkProgramModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';

import SearchSelector from "../../../../../components/SearchSelector/SearchSelector";

import connect from './AddCompetenceModal.connect';
import styles from './AddCompetenceModal.styles';

class AddCompetenceModal extends React.PureComponent<AddWorkProgramModalProps> {
    state = {
        competence: null
    };

    componentDidMount() {
        this.props.competenceActions.getCompetences();
    }

    handleClose = () => {
        this.props.closeDialog();
    }

    handleSave = () => {
        this.props.saveDialog(this.state.competence);
        this.props.closeDialog();

        this.setState({competence: null})
    }

    save = (value: string) => {
        const {competenceList} = this.props;
        const competence = competenceList.find(el => el.value === value);

        this.setState({competence: competence})
    }

    handleChangeSearchText = (searchText: string) => {
        this.props.competenceActions.changeSearchQuery(searchText);
        this.props.competenceActions.getCompetences();
    }

    render() {
        const {isOpen, classes, competenceList} = this.props;

        // @ts-ignore
        const disableButton = get(this, 'state.competence.value', null) === null;

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog,
                    root: classes.root,
                }}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Добавить компетенцию</DialogTitle>

                <DialogContent>
                    <SearchSelector label="Компетенция * "
                                    changeSearchText={this.handleChangeSearchText}
                                    list={competenceList}
                                    changeItem={this.save}
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
export default connect(withStyles(styles)(AddCompetenceModal));
