import React from 'react';
import {shallowEqual} from "recompose";
import get from "lodash/get";

import {CourseCreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import withStyles from '@material-ui/core/styles/withStyles';

import {CourseFields} from '../enum';

import {checkUrl} from '../../../common/utils';

import connect from './CourseCreateModal.connect';
import styles from './CourseCreateModal.styles';

class CourseCreateModal extends React.PureComponent<CourseCreateModalProps> {
    state = {
        course: {
            [CourseFields.ID]: null,
            [CourseFields.TITLE]: '',
            [CourseFields.DESCRIPTION]: '',
            [CourseFields.COURSE_URL]: '',
            [CourseFields.PLATFORM]: '',
        },
        courseUrlFieldIsFocused: false
    };

    componentDidUpdate(prevProps: Readonly<CourseCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {course} = this.props;

        if (!shallowEqual(course, prevProps.course)){
            this.setState({
                course: {
                    [CourseFields.ID]: get(course, CourseFields.ID),
                    [CourseFields.TITLE]: get(course, CourseFields.TITLE, ''),
                    [CourseFields.DESCRIPTION]: get(course, CourseFields.DESCRIPTION, ''),
                    [CourseFields.COURSE_URL]: get(course, CourseFields.COURSE_URL, ''),
                    [CourseFields.PLATFORM]: get(course, CourseFields.PLATFORM, ''),
                }
            });
        }
    }

    courseUrlFieldFocus = () => {
        this.setState({courseUrlFieldIsFocused: true});
    };

    courseUrlFieldBlur = () => {
        this.setState({courseUrlFieldIsFocused: false});
    };

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {course} = this.state;

        if (course[CourseFields.ID]){
            this.props.actions.changeCourse(course);
        } else {
            this.props.actions.createNewCourse(course);
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {course} = this.state;

        this.setState({
            course: {
                ...course,
                [field]: get(e, 'target.value')
            }
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {course, courseUrlFieldIsFocused} = this.state;

        const checkCourseUrl = courseUrlFieldIsFocused || course[CourseFields.COURSE_URL].length === 0 || checkUrl(course[CourseFields.COURSE_URL]);

        const disableButton = course[CourseFields.TITLE].length === 0 || course[CourseFields.COURSE_URL].length === 0 || !checkCourseUrl;

        const isEditMode = Boolean(course[CourseFields.ID]);

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} онлайн курс</DialogTitle>
                <DialogContent>
                    <TextField label="Название курса *"
                               onChange={this.saveField(CourseFields.TITLE)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={course[CourseFields.TITLE]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Ссылка на курс *"
                               onChange={this.saveField(CourseFields.COURSE_URL)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={course[CourseFields.COURSE_URL]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               error={!checkCourseUrl}
                               onFocus={this.courseUrlFieldFocus}
                               onBlur={this.courseUrlFieldBlur}
                    />

                    <TextField label="Платформа"
                               onChange={this.saveField(CourseFields.PLATFORM)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={course[CourseFields.PLATFORM]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Описание"
                               onChange={this.saveField(CourseFields.DESCRIPTION)}
                               variant="outlined"
                               className={classes.lastInput}
                               fullWidth
                               multiline
                               rows={8}
                               value={course[CourseFields.DESCRIPTION]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
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

export default connect(withStyles(styles)(CourseCreateModal));
