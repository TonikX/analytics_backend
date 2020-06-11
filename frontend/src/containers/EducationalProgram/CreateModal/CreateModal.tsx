import React from 'react';
import {shallowEqual} from "recompose";
import get from "lodash/get";
import classNames from "classnames";

import {CourseCreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";

import {specialization} from '../../WorkProgram/data';

import {EducationalProgramFields} from '../enum';

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';

class CreateModal extends React.PureComponent<CourseCreateModalProps> {
    state = {
        educationalProgram: {
            [EducationalProgramFields.ID]: null,
            [EducationalProgramFields.TITLE]: '',
            [EducationalProgramFields.NUMBER]: '',
            [EducationalProgramFields.QUALIFICATION]: '',
            [EducationalProgramFields.EDUCATIONAL_PROFILE]: '',
            [EducationalProgramFields.FACULTY]: '',
            [EducationalProgramFields.EDUCATION_FORM]: 'internal',
        },
    };

    componentDidUpdate(prevProps: Readonly<CourseCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {educationalProgram} = this.props;

        if (!shallowEqual(educationalProgram, prevProps.educationalProgram)){
            this.setState({
                educationalProgram: {
                    [EducationalProgramFields.ID]: get(educationalProgram, EducationalProgramFields.ID),
                    [EducationalProgramFields.TITLE]: get(educationalProgram, EducationalProgramFields.TITLE, ''),
                    [EducationalProgramFields.NUMBER]: get(educationalProgram, EducationalProgramFields.NUMBER, ''),
                    [EducationalProgramFields.QUALIFICATION]: get(educationalProgram, EducationalProgramFields.QUALIFICATION, ''),
                    [EducationalProgramFields.EDUCATIONAL_PROFILE]: get(educationalProgram, EducationalProgramFields.EDUCATIONAL_PROFILE, ''),
                    [EducationalProgramFields.FACULTY]: get(educationalProgram, EducationalProgramFields.FACULTY, ''),
                    [EducationalProgramFields.EDUCATION_FORM]: get(educationalProgram, EducationalProgramFields.EDUCATION_FORM, ''),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {educationalProgram} = this.state;

        if (educationalProgram[EducationalProgramFields.ID]){
            this.props.actions.changeEducationalProgram(educationalProgram);
        } else {
            this.props.actions.createNewEducationalProgram(educationalProgram);
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {educationalProgram} = this.state;

        this.setState({
            educationalProgram: {
                ...educationalProgram,
                [field]: get(e, 'target.value')
            }
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {educationalProgram} = this.state;

        const disableButton = educationalProgram[EducationalProgramFields.TITLE].length === 0
            || educationalProgram[EducationalProgramFields.NUMBER].length === 0
            || educationalProgram[EducationalProgramFields.QUALIFICATION].length === 0
            || educationalProgram[EducationalProgramFields.EDUCATION_FORM].length === 0
            || educationalProgram[EducationalProgramFields.FACULTY].length === 0
            || educationalProgram[EducationalProgramFields.EDUCATIONAL_PROFILE].length === 0
        ;

        const isEditMode = Boolean(educationalProgram[EducationalProgramFields.ID]);

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} образовательную программу</DialogTitle>
                <DialogContent>
                    <TextField label="Название программы *"
                               onChange={this.saveField(EducationalProgramFields.TITLE)}
                               variant="outlined"
                               className={classNames(classes.input, classes.marginBottom30)}
                               fullWidth
                               value={educationalProgram[EducationalProgramFields.TITLE]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Номер программы *"
                               onChange={this.saveField(EducationalProgramFields.NUMBER)}
                               variant="outlined"
                               className={classNames(classes.input, classes.marginBottom30)}
                               fullWidth
                               value={educationalProgram[EducationalProgramFields.NUMBER]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Факультет *"
                               onChange={this.saveField(EducationalProgramFields.FACULTY)}
                               variant="outlined"
                               className={classNames(classes.input, classes.marginBottom30)}
                               fullWidth
                               value={educationalProgram[EducationalProgramFields.FACULTY]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Профиль *"
                               onChange={this.saveField(EducationalProgramFields.EDUCATIONAL_PROFILE)}
                               variant="outlined"
                               className={classNames(classes.input, classes.marginBottom30)}
                               fullWidth
                               value={educationalProgram[EducationalProgramFields.EDUCATIONAL_PROFILE]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <FormControl className={classNames(classes.selectorWrap, classes.marginBottom30)}>
                        <InputLabel shrink id="section-label">
                            Квалификация *
                        </InputLabel>
                        <Select
                            variant="outlined"
                            className={classes.selector}
                            // @ts-ignore
                            onChange={this.saveField(EducationalProgramFields.QUALIFICATION)}
                            value={educationalProgram[EducationalProgramFields.QUALIFICATION]}
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
                            {specialization.map(item =>
                                <MenuItem value={item.value} key={`group-${item.value}`}>
                                    {item.label}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Форма обучения *</FormLabel>
                        <RadioGroup className={classes.radioGroup}
                                    onChange={this.saveField(EducationalProgramFields.EDUCATION_FORM)}
                                    value={educationalProgram[EducationalProgramFields.EDUCATION_FORM]}
                        >
                            <FormControlLabel value="internal"
                                              control={<Radio checked={educationalProgram[EducationalProgramFields.EDUCATION_FORM] === 'internal'} />}
                                              label="Очная"
                            />
                            <FormControlLabel value="extramural"
                                              control={<Radio checked={educationalProgram[EducationalProgramFields.EDUCATION_FORM] === 'extramural'} />}
                                              label="Заочная"
                            />
                        </RadioGroup>
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
