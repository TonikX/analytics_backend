import React from 'react';
import get from "lodash/get";

import {CourseCreateModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {withStyles} from '@mui/styles';
import { FirstStep } from './FirstStep/FirstStep'
import { SecondStep } from './SecondStep/SecondStep'

import {CourseFields} from '../enum';

import {checkUrl} from '../../../common/utils';

import connect from './CourseCreateModal.connect';
import styles from './CourseCreateModal.styles';


class CourseCreateModal extends React.PureComponent<CourseCreateModalProps> {
    initialState = {
        course: {
            [CourseFields.ID]: null,
            [CourseFields.TITLE]: '',
            [CourseFields.DESCRIPTION]: '',
            [CourseFields.COURSE_URL]: '',
            [CourseFields.PLATFORM]: '',
        },
        step: 1,
        courseUrlFieldIsFocused: false
    }
    state = this.initialState

    handleClose = () => {
        this.setState(this.initialState)
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const { step } = this.state
        // this.props.actions.createNewCourse(course);
        
        if (step === 1) {
            this.setState({ step: 2 })
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
        const {course, courseUrlFieldIsFocused, step} = this.state;

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
                <DialogTitle>{step === 1 ? 'Добавить онлайн курс' : 'Дополните информацию о курсе'}</DialogTitle>
                    {step === 1 ? (
                        <FirstStep
                            course={this.state.course}
                            saveField={this.saveField}
                        />
                    ) : (
                        <SecondStep
                            course={this.state.course}
                            saveField={this.saveField}
                        />
                    )}
                    
                <DialogActions className={classes.actions}>
                    {step ===2  && <Button onClick={() => this.setState({step: 1})}
                            variant="text">
                        Назад
                    </Button>}
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

//@ts-ignore
export default connect(withStyles(styles)(CourseCreateModal));
