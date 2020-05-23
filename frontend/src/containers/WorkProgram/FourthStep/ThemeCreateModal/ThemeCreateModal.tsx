import React from 'react';

import {ThemeCreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import withStyles from '@material-ui/core/styles/withStyles';

import connect from './ThemeCreateModal.connect';
import styles from './ThemeCreateModal.styles';

class ThemeCreateModal extends React.PureComponent<ThemeCreateModalProps> {
    handleClose = () => {
        this.props.handleClose();
    }

    handleSave = () => {
        this.props.handleClose();
    }

    saveField = () => {
        this.props.actions.saveNewTheme();
    }

    render() {
        const {isOpen, classes, courses} = this.props;

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> Создать тему</DialogTitle>
                <DialogContent>
                    <TextField label="Название темы"
                               onChange={this.saveField}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <FormControl className={classes.courseSelector}>
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
                            <MenuItem value="" key={`group-0`}>
                                Нет курса
                            </MenuItem>
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
                            variant="text">
                        Отмена
                    </Button>
                    <Button onClick={this.handleSave}
                            variant="contained"
                            color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default connect(withStyles(styles)(ThemeCreateModal));
