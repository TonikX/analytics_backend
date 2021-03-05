import React from 'react';
import get from "lodash/get";

import {CourseCreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from "@material-ui/core/Fab";

import AddIcon from "@material-ui/icons/Add";

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
    componentWillUnmount() {
        this.props.actions.changeDialogStep(1)
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
        //const {course} = this.state;
        const { step } = this.props
        // this.props.actions.createNewCourse(course);
        console.log('handle save');
        
        if (step === 1) {
            this.props.actions.changeDialogStep(step + 1)
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

        return (
            <Dialog
                style={{overflow: 'hidden'}}
                open={isOpen}
                onClose={this.handleClose}
                // maxWidth={'md'}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> Добавить онлайн курс</DialogTitle>
                <DialogContent style={{overflow: 'hidden'}}>
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
                    <TextField label="Ссылка на онлайн-курс на сайте Платформы *"
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
                    <div className={classes.inputAddWrapper}>
                        <TextField label="Платформа *"
                                onChange={this.saveField(CourseFields.PLATFORM)}
                                variant="outlined"
                                className={classes.input}
                                fullWidth
                                value={course[CourseFields.PLATFORM]}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                        />
                        <Fab color="secondary"
                            className={classes.addIcon}
                            onClick={() => {}}
                        >
                            <AddIcon/>
                        </Fab>
                    </div>
                    <div className={classes.inputAddWrapper}>
                        <TextField label="Правообладатель *"
                                onChange={this.saveField(CourseFields.PLATFORM)}
                                variant="outlined"
                                className={classes.input}
                                fullWidth
                                value={course[CourseFields.PLATFORM]}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                        />
                        <Fab color="secondary"
                            className={classes.addIcon}
                            onClick={() => {}}
                        >
                            <AddIcon/>
                        </Fab>
                    </div>
                    <TextField label="Язык онлайн-курса"
                               onChange={this.saveField(CourseFields.PLATFORM)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={course[CourseFields.PLATFORM]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    {/* <TextField label="Описание"
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
                    /> */}
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
