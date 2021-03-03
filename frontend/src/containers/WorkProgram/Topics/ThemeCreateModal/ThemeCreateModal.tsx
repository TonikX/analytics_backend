import React, {ReactText} from 'react';
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

import SearchSelector from '../../../../components/SearchSelector';
import {workProgramTopicFields, fields} from '../../enum';

import connect from './ThemeCreateModal.connect';
import styles from './ThemeCreateModal.styles';
import {shallowEqual} from "recompose";
import {CourseFields} from "../../../Courses/enum";
import {Link} from "react-router-dom";
import {appRouter} from "../../../../service/router-service";
import Typography from "@material-ui/core/Typography";

class ThemeCreateModal extends React.PureComponent<ThemeCreateModalProps> {
    state = {
        topic: {
            [workProgramTopicFields.ID]: null,
            [workProgramTopicFields.DESCRIPTION]: '',
            [workProgramTopicFields.NUMBER]: this.props.sections.length,
            [workProgramTopicFields.SECTION]: '',
            [workProgramTopicFields.COURSE]: {
                [CourseFields.ID]: ''
            },
        }
    };

    componentDidMount() {
        this.props.coursesActions.getCourses();
    }

    componentDidUpdate(prevProps: Readonly<ThemeCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {topic} = this.props;

        if (!shallowEqual(topic, prevProps.topic)){
            this.setState({
                topic: {
                    [workProgramTopicFields.DESCRIPTION]: get(topic, workProgramTopicFields.DESCRIPTION, ''),
                    [workProgramTopicFields.SECTION]: get(topic, workProgramTopicFields.SECTION, ''),
                    [workProgramTopicFields.ID]: get(topic, workProgramTopicFields.ID, null),
                    [workProgramTopicFields.COURSE]: get(topic, workProgramTopicFields.COURSE, ''),
                    [workProgramTopicFields.NUMBER]: get(topic, workProgramTopicFields.NUMBER, ''),
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

    saveCourseField = (value: ReactText) => {
        const {topic} = this.state;

        this.setState({
            topic: {
                ...topic,
                [workProgramTopicFields.COURSE]: {
                    [CourseFields.ID]: value
                }
            }
        })
    }

    handleChangeCourseSearchText = (searchText: string) => {
        this.props.coursesActions.changeSearchQuery(searchText);
        this.props.coursesActions.getCourses();
    }

    render() {
        const {isOpen, classes, sections, coursesList} = this.props;
        const {topic} = this.state;

        const disableButton = topic[workProgramTopicFields.DESCRIPTION].length === 0 || topic[workProgramTopicFields.SECTION].length === 0;

        const isEditMode = Boolean(topic[workProgramTopicFields.ID]);

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} тему</DialogTitle>
                <DialogContent>
                    <FormControl className={classes.sectionSelector}>
                        <InputLabel shrink id="section-label">
                            Раздел *
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
                    <TextField label="Название темы *"
                               onChange={this.saveField(workProgramTopicFields.DESCRIPTION)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={topic[workProgramTopicFields.DESCRIPTION]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <SearchSelector label="Онлайн курс"
                                            changeSearchText={this.handleChangeCourseSearchText}
                                            list={coursesList}
                                            changeItem={this.saveCourseField}
                                            value={get(topic, [workProgramTopicFields.COURSE, CourseFields.ID], '')}
                                            valueLabel={get(topic, [workProgramTopicFields.COURSE, CourseFields.TITLE], '')}
                    />
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Link to={appRouter.getCoursesRoute()}
                          className={classes.link}
                          target="_blank"
                    >
                        <Typography>
                            Создать онлайн курс
                        </Typography>
                    </Link>
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
