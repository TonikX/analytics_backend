import React from 'react';
import get from "lodash/get";

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

import {workProgramTopicFields, fields} from '../../enum';

import connect from './ThemeCreateModal.connect';
import styles from './ThemeCreateModal.styles';
import {shallowEqual} from "recompose";

class ThemeCreateModal extends React.PureComponent<ThemeCreateModalProps> {
    state = {
        topic: {
            [workProgramTopicFields.DESCRIPTION]: '',
            [workProgramTopicFields.SECTION]: '',
        }
    };

    componentDidUpdate(prevProps: Readonly<ThemeCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {topic} = this.props;

        if (!shallowEqual(topic, prevProps.topic)){
            this.setState({
                topic: {
                    [workProgramTopicFields.DESCRIPTION]: get(topic, workProgramTopicFields.DESCRIPTION, ''),
                    [workProgramTopicFields.SECTION]: get(topic, workProgramTopicFields.SECTION, ''),
                    [workProgramTopicFields.ID]: get(topic, workProgramTopicFields.ID, ''),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog(fields.CREATE_NEW_TOPIC_DIALOG);
    }

    handleSave = () => {
        this.props.actions.saveTopic(this.state.topic);
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {topic} = this.state;

        this.setState({
            topic: {
                ...topic,
                [field]: get(e, 'target.value')
            }
        })
    }

    render() {
        const {isOpen, classes, courses, sections} = this.props;
        const {topic} = this.state;

        const disableButton = topic[workProgramTopicFields.DESCRIPTION].length === 0 || topic[workProgramTopicFields.SECTION].length === 0;

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
                    <FormControl className={classes.sectionSelector}>
                        <InputLabel shrink id="section-label">
                            Раздел
                        </InputLabel>
                        <Select
                            variant="outlined"
                            className={classes.selector}
                            // @ts-ignore
                            onChange={this.saveField(workProgramTopicFields.SECTION)}
                            value={topic[workProgramTopicFields.SECTION]}
                            fullWidth
                            displayEmpty
                            input={
                                <OutlinedInput
                                    notched
                                    labelWidth={100}
                                    name="course"
                                    id="section-label"
                                />
                            }
                        >
                            {sections.map(item =>
                                <MenuItem value={item.value} key={`group-${item.value}`}>
                                    {item.label}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <TextField label="Название темы"
                               onChange={this.saveField(workProgramTopicFields.DESCRIPTION)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={topic[workProgramTopicFields.DESCRIPTION]}
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
                            onChange={this.saveField(workProgramTopicFields.SECTION)}
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
                            disabled={disableButton}
                            color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default connect(withStyles(styles)(ThemeCreateModal));
