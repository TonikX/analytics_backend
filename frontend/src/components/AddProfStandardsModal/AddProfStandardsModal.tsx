import React from 'react';

import {AddProfStandardsModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';

import SearchSelector from "../SearchSelector/SearchSelector";

import connect from './AddProfStandardsModal.connect';
import styles from './AddProfStandardsModal.styles';

class AddProfStandardsModal extends React.PureComponent<AddProfStandardsModalProps> {
    state = {
        profStandard: {
            value: null
        }
    };

    componentDidMount() {
        this.props.profStandardsActions.getProfessionalStandards();
    }

    handleClose = () => {
        this.props.closeDialog();
    }

    handleSave = () => {
        this.props.saveDialog(this.state.profStandard);
        this.props.closeDialog();

        this.setState({profStandard: null})
    }

    save = (value: string) => {
        const {profStandardsList} = this.props;
        const profStandard = profStandardsList.find(el => el.value === value);

        this.setState({profStandard: profStandard})
    }

    handleChangeSearchText = (searchText: string) => {
        this.props.profStandardsActions.changeSearchQuery(searchText);
        this.props.profStandardsActions.getProfessionalStandards();
    }

    render() {
        const {isOpen, classes, profStandardsList} = this.props;

        const disableButton = !this.state?.profStandard?.value;

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
                <DialogTitle>Добавить профессиональный стандарт</DialogTitle>

                <DialogContent>
                    <SearchSelector label="Профессиональный стандарт * "
                                    changeSearchText={this.handleChangeSearchText}
                                    list={profStandardsList}
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
export default connect(withStyles(styles)(AddProfStandardsModal));
