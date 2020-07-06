import React from 'react';
import get from 'lodash/get';

import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';

import InputsLoader from '../../../components/InputsLoader';
import Selector from './Selector';

import {FirstStepProps} from './types';
import {WorkProgramGeneralFields} from "../enum";

import connect from './FirstStep.connect';
import styles from './FirstStep.styles';
import moment, {Moment} from "moment";
import {IconButton} from "@material-ui/core";
import DateIcon from "@material-ui/icons/DateRange";
import {FULL_DATE_FORMAT} from "../../../common/utils";
import {DatePicker} from "@material-ui/pickers";

class FirstStep extends React.Component<FirstStepProps> {
    state = {
        [WorkProgramGeneralFields.CODE]: '',
        [WorkProgramGeneralFields.TITLE]: '',
        [WorkProgramGeneralFields.APPROVAL_DATE]: '',
        [WorkProgramGeneralFields.AUTHORS]: '',
        [WorkProgramGeneralFields.DESCRIPTION]: '',
        [WorkProgramGeneralFields.VIDEO_LINK]: '',
    };

    componentDidMount() {
        this.setState({
            [WorkProgramGeneralFields.TITLE]: this.props.title,
            [WorkProgramGeneralFields.CODE]: this.props.code,
            [WorkProgramGeneralFields.APPROVAL_DATE]: this.props.date,
            [WorkProgramGeneralFields.AUTHORS]: this.props.authors,
            [WorkProgramGeneralFields.DESCRIPTION]: this.props.description,
            [WorkProgramGeneralFields.VIDEO_LINK]: this.props.video,
        })
    }

    componentDidUpdate(prevProps: Readonly<FirstStepProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.title !== this.props.title || prevProps.code !== this.props.code ||
            prevProps.authors !== this.props.authors || prevProps.date !== this.props.date){
            this.setState({
                [WorkProgramGeneralFields.TITLE]: this.props.title,
                [WorkProgramGeneralFields.CODE]: this.props.code,
                [WorkProgramGeneralFields.APPROVAL_DATE]: this.props.date,
                [WorkProgramGeneralFields.AUTHORS]: this.props.authors,
                [WorkProgramGeneralFields.DESCRIPTION]: this.props.description,
                [WorkProgramGeneralFields.VIDEO_LINK]: this.props.video,
            })
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        this.props.actions.saveWorkProgram({
            destination: field,
            value: get(e, 'target.value')
        });
    };

    changeCode = (e: React.ChangeEvent) => {
        this.setState({
            [WorkProgramGeneralFields.CODE]: get(e, 'target.value')
        });
    }

    changeTitle = (e: React.ChangeEvent) => {
        this.setState({
            [WorkProgramGeneralFields.TITLE]: get(e, 'target.value')
        });
    }

    changeAuthors = (e: React.ChangeEvent) => {
        this.setState({
            [WorkProgramGeneralFields.AUTHORS]: get(e, 'target.value')
        });
    }

    changeVideo = (e: React.ChangeEvent) => {
        this.setState({
            [WorkProgramGeneralFields.VIDEO_LINK]: get(e, 'target.value')
        });
    }

    changeDescription = (e: React.ChangeEvent) => {
        this.setState({
            [WorkProgramGeneralFields.DESCRIPTION]: get(e, 'target.value')
        });
    }

    changeDate = (date: Moment) => {
        this.setState({
            [WorkProgramGeneralFields.APPROVAL_DATE]: date.format()
        })

        this.props.actions.saveWorkProgram({
            destination: WorkProgramGeneralFields.APPROVAL_DATE,
            value: date.format()
        });
    }

    render() {
        const {classes, fetchingTitle, fetchingCode, fetchingAuthors, fetchingDate, fetchingVideoLink, fetchingDescription} = this.props;
        const {state} = this;

        return (
            <div className={classes.container}>
                <div className={classes.side}>
                    <InputsLoader loading={fetchingCode}>
                        <TextField variant="outlined"
                                   label="Шифр программы"
                                   className={classes.input}
                                   value={state[WorkProgramGeneralFields.CODE]}
                                   onBlur={this.saveField(WorkProgramGeneralFields.CODE)}
                                   onChange={this.changeCode}
                                   disabled={fetchingCode}
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                        />
                    </InputsLoader>
                    <InputsLoader loading={fetchingTitle}>
                        <TextField variant="outlined"
                                   label="Название дисциплины"
                                   value={state[WorkProgramGeneralFields.TITLE]}
                                   className={classes.input}
                                   onBlur={this.saveField(WorkProgramGeneralFields.TITLE)}
                                   onChange={this.changeTitle}
                                   disabled={fetchingTitle}
                        />
                    </InputsLoader>
                    <InputsLoader loading={fetchingAuthors}>
                        <TextField variant="outlined"
                                   label="Авторский состав"
                                   value={state[WorkProgramGeneralFields.AUTHORS]}
                                   className={classes.input}
                                   onBlur={this.saveField(WorkProgramGeneralFields.AUTHORS)}
                                   onChange={this.changeAuthors}
                                   disabled={fetchingAuthors}
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                        />
                    </InputsLoader>
                    <InputsLoader loading={fetchingVideoLink}>
                        <TextField variant="outlined"
                                   label="Видео"
                                   value={state[WorkProgramGeneralFields.VIDEO_LINK]}
                                   className={classes.input}
                                   onBlur={this.saveField(WorkProgramGeneralFields.VIDEO_LINK)}
                                   onChange={this.changeVideo}
                                   disabled={fetchingVideoLink}
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                        />
                    </InputsLoader>

                    <Selector />
                </div>

                <div className={classes.side}>
                    <InputsLoader loading={fetchingDescription}>
                        <TextField variant="outlined"
                                   label="Описание"
                                   value={state[WorkProgramGeneralFields.DESCRIPTION]}
                                   className={classes.input}
                                   onBlur={this.saveField(WorkProgramGeneralFields.DESCRIPTION)}
                                   onChange={this.changeDescription}
                                   disabled={fetchingDescription}
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                                   multiline
                                   rows={11}
                        />
                    </InputsLoader>

                    <InputsLoader loading={fetchingDate}>
                        <DatePicker
                            value={moment(state[WorkProgramGeneralFields.APPROVAL_DATE])}
                            onChange={(date: any) => this.changeDate(date)}
                            InputProps={{
                                endAdornment: (
                                    <IconButton>
                                        <DateIcon />
                                    </IconButton>
                                ),
                            }}
                            inputVariant="outlined"
                            className={classes.datePicker}
                            format={FULL_DATE_FORMAT}
                            label={'Дата создания'}
                        />
                    </InputsLoader>
                </div>
            </div>
        );
    }
}

export default connect(withStyles(styles)(FirstStep));
