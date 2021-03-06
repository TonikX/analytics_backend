import React from 'react';
import {shallowEqual} from "recompose";
import get from "lodash/get";

import {AddModuleModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import SearchSelector from "../../../../components/SearchSelector/SearchSelector";
import {EducationalPlanBlockFields} from '../../enum';

import connect from './AddModuleModal.connect';
import styles from './AddModuleModal.styles';

class AddModuleModal extends React.Component<AddModuleModalProps> {
    state = {
        block: {
            [EducationalPlanBlockFields.ID]: null
        },
        module: null
    };

    componentDidMount() {
        this.props.moduleActions.getTrainingModulesList();
    }

    componentDidUpdate(prevProps: Readonly<AddModuleModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {module} = this.props;

        if (!shallowEqual(module, prevProps.module)){
            this.setState({
                block: get(module, 'blockId', ''),
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeAddModuleDialog();
    }

    handleSave = () => {
        const {module, block} = this.state;

        this.props.actions.addModule({module, block});
    }

    saveModule = (value: string) => {
        this.setState({module: value})
    }

    handleChangeSearchText = (searchText: string) => {
        this.props.moduleActions.changeSearchQuery(searchText);
        this.props.moduleActions.getTrainingModulesList();
    }

    render() {
        const {isOpen, classes, modulesList} = this.props;

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> Добавить модуль</DialogTitle>
                <DialogContent>
                    <SearchSelector label="Учебный модуль * "
                                    changeSearchText={this.handleChangeSearchText}
                                    list={modulesList}
                                    changeItem={this.saveModule}
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
                            disabled={!this.state.module}
                            color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default connect(withStyles(styles)(AddModuleModal));
