import React from 'react';
import {shallowEqualObjects} from "shallow-equal";
import get from "lodash/get";
import classNames from "classnames";

import {CourseCreateModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {withStyles} from '@mui/styles';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";

import {specialization} from '../../WorkProgram/constants';

import {DirectionFields} from '../enum';

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';

class CreateModal extends React.PureComponent<CourseCreateModalProps> {
    state = {
        educationalProgram: {
            [DirectionFields.ID]: null,
            [DirectionFields.TITLE]: '',
            [DirectionFields.NUMBER]: '',
            [DirectionFields.QUALIFICATION]: '',
            [DirectionFields.EDUCATIONAL_PROFILE]: '',
            [DirectionFields.FACULTY]: '',
            [DirectionFields.EDUCATION_FORM]: 'internal',
        },
    };

    componentDidUpdate(prevProps: Readonly<CourseCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {educationalProgram} = this.props;

        if (!shallowEqualObjects(educationalProgram, prevProps.educationalProgram)){
            this.setState({
                educationalProgram: {
                    [DirectionFields.ID]: get(educationalProgram, DirectionFields.ID),
                    [DirectionFields.TITLE]: get(educationalProgram, DirectionFields.TITLE, ''),
                    [DirectionFields.NUMBER]: get(educationalProgram, DirectionFields.NUMBER, ''),
                    [DirectionFields.QUALIFICATION]: get(educationalProgram, DirectionFields.QUALIFICATION, ''),
                    [DirectionFields.EDUCATIONAL_PROFILE]: get(educationalProgram, DirectionFields.EDUCATIONAL_PROFILE, ''),
                    [DirectionFields.FACULTY]: get(educationalProgram, DirectionFields.FACULTY, ''),
                    [DirectionFields.EDUCATION_FORM]: get(educationalProgram, DirectionFields.EDUCATION_FORM, ''),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {educationalProgram} = this.state;

        if (educationalProgram[DirectionFields.ID]){
            this.props.actions.changeDirection(educationalProgram);
        } else {
            this.props.actions.createNewDirection(educationalProgram);
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

        const disableButton = educationalProgram[DirectionFields.TITLE].length === 0
            || educationalProgram[DirectionFields.NUMBER].length === 0
            || educationalProgram[DirectionFields.QUALIFICATION].length === 0
            || educationalProgram[DirectionFields.EDUCATION_FORM].length === 0
            || educationalProgram[DirectionFields.FACULTY].length === 0
            || educationalProgram[DirectionFields.EDUCATIONAL_PROFILE].length === 0
        ;

        const isEditMode = Boolean(educationalProgram[DirectionFields.ID]);

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} направление</DialogTitle>
                <DialogContent>
                    <TextField label="Название *"
                               onChange={this.saveField(DirectionFields.TITLE)}
                               variant="outlined"
                               className={classNames(classes.input, classes.marginBottom30)}
                               fullWidth
                               value={educationalProgram[DirectionFields.TITLE]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Номер программы *"
                               onChange={this.saveField(DirectionFields.NUMBER)}
                               variant="outlined"
                               className={classNames(classes.input, classes.marginBottom30)}
                               fullWidth
                               value={educationalProgram[DirectionFields.NUMBER]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Факультет *"
                               onChange={this.saveField(DirectionFields.FACULTY)}
                               variant="outlined"
                               className={classNames(classes.input, classes.marginBottom30)}
                               fullWidth
                               value={educationalProgram[DirectionFields.FACULTY]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField label="Профиль *"
                               onChange={this.saveField(DirectionFields.EDUCATIONAL_PROFILE)}
                               variant="outlined"
                               className={classNames(classes.input, classes.marginBottom30)}
                               fullWidth
                               value={educationalProgram[DirectionFields.EDUCATIONAL_PROFILE]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <FormControl className={classNames(classes.selectorWrap, classes.marginBottom30)}>
                        <InputLabel shrink id="section-label">
                            Уровень образования *
                        </InputLabel>
                        <Select
                            variant="outlined"
                            className={classes.selector}
                            // @ts-ignore
                            onChange={this.saveField(DirectionFields.QUALIFICATION)}
                            value={educationalProgram[DirectionFields.QUALIFICATION]}
                            fullWidth
                            displayEmpty
                            input={
                                <OutlinedInput
                                    notched
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
                                    onChange={this.saveField(DirectionFields.EDUCATION_FORM)}
                                    value={educationalProgram[DirectionFields.EDUCATION_FORM]}
                        >
                            <FormControlLabel value="internal"
                                              control={<Radio checked={educationalProgram[DirectionFields.EDUCATION_FORM] === 'internal'} />}
                                              label="Очная"
                            />
                            <FormControlLabel value="extramural"
                                              control={<Radio checked={educationalProgram[DirectionFields.EDUCATION_FORM] === 'extramural'} />}
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
