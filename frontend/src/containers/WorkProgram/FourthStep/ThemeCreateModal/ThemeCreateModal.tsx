import React from 'react';

import {ThemeCreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import withStyles from '@material-ui/core/styles/withStyles';

import connect from './ThemeCreateModal.connect';
import styles from './ThemeCreateModal.styles';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import {fields} from "../../enum";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputsLoader from "../../../../components/InputsLoader/InputsLoader";

class ThemeCreateModal extends React.PureComponent<ThemeCreateModalProps> {
    handleClose = () => {
        this.props.handleClose();
    }

    handleSave = () => {
        this.props.handleClose();
    }

    saveField = () => {

    }

    render() {
        const {isOpen, classes, courses} = this.props;

        return (
            <div>
                <Dialog
                    open={isOpen}
                    onClose={this.handleClose}
                >
                    <DialogTitle> Создать тему</DialogTitle>
                    <DialogContent>
                        <TextField label="Название темы"
                                   onChange={this.saveField}
                                   variant="outlined"
                                   className={classes.input}
                                   fullWidth
                        />
                        <FormControl>
                            <InputLabel shrink id="online-course-label">
                                Онлайн курс
                            </InputLabel>
                            <Select
                                variant="outlined"
                                className={classes.selector}
                                // @ts-ignore
                                onChange={this.saveField}
                                fullWidth
                                displayEmpty
                                input={
                                    <OutlinedInput
                                        notched
                                        labelWidth={100}
                                        name="course"
                                        id="online-course-label"
                                    />
                                }
                            >
                                {courses.map(item =>
                                    <MenuItem value={item.value} key={`group-${item.value}`}>
                                        {item.label}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions className={classes.actions}>
                        <Button onClick={this.handleClose}
                                variant="outlined">
                            Отмена
                        </Button>
                        <Button onClick={this.handleSave}
                                variant="outlined"
                                color="primary">
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default connect(withStyles(styles)(ThemeCreateModal));
