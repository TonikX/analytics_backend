import React from 'react';
import {shallowEqual} from "recompose";
import get from "lodash/get";

import {ProfessionsCreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import {ProfessionsFields} from '../enum';
import {roles} from '../constants';

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';

class CreateModal extends React.PureComponent<ProfessionsCreateModalProps> {
    state = {
        profession: {
            [ProfessionsFields.ID]: null,
            [ProfessionsFields.ROLE]: null,
            [ProfessionsFields.TITLE]: null,
        },
    };

    componentDidUpdate(prevProps: Readonly<ProfessionsCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {profession} = this.props;

        if (!shallowEqual(profession, prevProps.profession)){
            this.setState({
                profession: {
                    [ProfessionsFields.ID]: get(profession, ProfessionsFields.ID),
                    [ProfessionsFields.ROLE]: get(profession, ProfessionsFields.ROLE, ''),
                    [ProfessionsFields.TITLE]: get(profession, ProfessionsFields.TITLE, ''),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {profession} = this.state;

        if (profession[ProfessionsFields.ID]){
            this.props.actions.changeProfession(profession);
        } else {
            this.props.actions.createNewProfession(profession);
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {profession} = this.state;

        this.setState({
            profession: {
                ...profession,
                [field]: get(e, 'target.value')
            }
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {profession} = this.state;

        const disableButton = !get(profession, [ProfessionsFields.ROLE], null) ||
            !get(profession, [ProfessionsFields.TITLE], null);

        const isEditMode = profession[ProfessionsFields.ID];

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} профессию </DialogTitle>
                <DialogContent>
                    <TextField label="Название *"
                               onChange={this.saveField(ProfessionsFields.TITLE)}
                               value={profession[ProfessionsFields.TITLE]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               fullWidth
                               variant="outlined"
                               className={classes.input}
                   />
                    <FormControl className={classes.wrapSelector}>
                        <InputLabel shrink id="section-label">
                            Роль *
                        </InputLabel>
                        <Select
                            variant="outlined"
                            className={classes.selector}
                            // @ts-ignore
                            onChange={this.saveField(ProfessionsFields.ROLE)}
                            value={profession[ProfessionsFields.ROLE]}
                            fullWidth
                            displayEmpty
                            input={
                                <OutlinedInput
                                    notched
                                    labelWidth={100}
                                    name="role"
                                    id="section-label"
                                />
                            }
                        >
                            {Object.keys(roles).map((key: any) =>
                                <MenuItem value={key} key={`type-${key}`}>
                                    {roles[key]}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>

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

export default connect(withStyles(styles)(CreateModal));
