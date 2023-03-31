import React from 'react';
import {withRouter} from "react-router-dom";

import withStyles from '@mui/material/styles/withStyles';
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import {ExpertiseProps} from "./types";
import SearchSelector from "../../../../components/SearchSelector/SearchSelector";

import connect from './Expertise.connect';
import styles from './Expertise.styles';

class Expertise extends React.Component<ExpertiseProps> {
    state = {
        openExpertModal: true,
        id: null
    };

    componentDidMount() {
        this.props.generalActions.getAllUsers();
    }

    handleChangeSearchText = (searchText: string) => {
        this.props.generalActions.getAllUsers(searchText);
    }

    handleSave = () => {
        this.props.actions.addExpertToExpertise(this.state.id);
    }

    saveExpert = (value: string) => {
        this.setState({id: value})
    }

    handleClose = () => {
        this.setState({id: null})
        this.props.actions.closeAddExpertModal();
    }

    render() {
        const {classes, isOpen, usersList} = this.props;
        const {id} = this.state;

        return (
                <Dialog
                    open={isOpen}
                    onClose={this.handleClose}
                    classes={{
                        paper: classes.dialog,
                    }}
                    maxWidth="xs"
                    fullWidth={true}
                >
                    <DialogTitle> Добавить эксперта </DialogTitle>

                    <DialogContent>
                        <SearchSelector label="Эксперт * "
                                        changeSearchText={this.handleChangeSearchText}
                                        list={usersList}
                                        changeItem={this.saveExpert}
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
                                color="primary"
                                disabled={id === null}
                        >
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>
        );
    }
}

//@ts-ignore
export default connect(withStyles(styles)(withRouter(Expertise)));
