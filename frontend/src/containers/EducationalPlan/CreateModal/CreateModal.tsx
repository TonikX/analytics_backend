import React from 'react';
import {shallowEqualObjects} from "shallow-equal";
import get from "lodash/get";
import classNames from "classnames";
import moment, {Moment} from 'moment';

import {CreateModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {withStyles} from '@mui/styles';
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";

import DatePicker from "../../../components/DatePicker";

import {EducationalPlanFields} from '../enum';
import {FULL_DATE_FORMAT, YEAR_DATE_FORMAT} from "../../../common/utils";
import {specialization} from "../../WorkProgram/constants";

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';
import {DirectionSelector} from "../../Direction/DirectionSelector";

const currentDate = new Date();

class CreateModal extends React.PureComponent<CreateModalProps> {
  state = {
    educationalPlan: {
      [EducationalPlanFields.ID]: null,
      [EducationalPlanFields.PROFILE]: '',
      [EducationalPlanFields.APPROVAL_DATE]: moment().format(),
      [EducationalPlanFields.EDUCATION_FORM]: 'internal',
      [EducationalPlanFields.QUALIFICATION]: '',
      [EducationalPlanFields.DIRECTION]: {
        value: 0,
        label: ''
      },
      [EducationalPlanFields.YEAR]: currentDate.getFullYear(),
    },
  };

  componentDidUpdate(prevProps: Readonly<CreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
    const {educationalPlan} = this.props;

    if (!shallowEqualObjects(educationalPlan, prevProps.educationalPlan)){
      this.setState({
        educationalPlan: {
          [EducationalPlanFields.ID]: get(educationalPlan, EducationalPlanFields.ID),
          [EducationalPlanFields.DIRECTION]: {
            value: 0,
            label: '',
          },
          [EducationalPlanFields.PROFILE]: get(educationalPlan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.TITLE], ''),
          [EducationalPlanFields.QUALIFICATION]: get(educationalPlan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.QUALIFICATION], ''),
          [EducationalPlanFields.EDUCATION_FORM]: get(educationalPlan, EducationalPlanFields.EDUCATION_FORM, 'internal'),
          [EducationalPlanFields.YEAR]: get(educationalPlan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.YEAR], currentDate.getFullYear()),
          [EducationalPlanFields.APPROVAL_DATE]: get(educationalPlan, EducationalPlanFields.APPROVAL_DATE, moment().format()),
        }
      });
    }
  }

  handleClose = () => {
    this.props.actions.closeDialog();
  }

  handleSave = () => {
    const {educationalPlan} = this.state;

    if (educationalPlan[EducationalPlanFields.ID]){
      this.props.actions.changeEducationalPlan(educationalPlan);
    } else {
      this.props.actions.createNewEducationalPlan(educationalPlan);
    }
  }

  saveField = (field: string) => (e: React.ChangeEvent) => {
    const {educationalPlan} = this.state;

    this.setState({
      educationalPlan: {
        ...educationalPlan,
        [field]: get(e, 'target.value')
      }
    })
  }

  saveDate = (date: Moment) => {
    const {educationalPlan} = this.state;

    this.setState({
      educationalPlan: {
        ...educationalPlan,
        [EducationalPlanFields.APPROVAL_DATE]: date.format()
      }
    })
  }

  changeDirection = (value: number, label: string) => {
    const {educationalPlan} = this.state;

    this.setState({
      educationalPlan: {
        ...educationalPlan,
        [EducationalPlanFields.DIRECTION]: {
          value,
          label,
        }
      }
    })
  }

  changeYear = (value: Moment) => {
    const {educationalPlan} = this.state;

    this.setState({
      educationalPlan: {
        ...educationalPlan,
        [EducationalPlanFields.YEAR]: value.format(YEAR_DATE_FORMAT)
      }
    })
  }

  render() {
    const {isOpen, classes} = this.props;
    const {educationalPlan} = this.state;

    const disableButton = educationalPlan[EducationalPlanFields.PROFILE].length === 0
      || educationalPlan[EducationalPlanFields.DIRECTION].value === 0
      || get(educationalPlan[EducationalPlanFields.QUALIFICATION], 'length', 0) === 0
    ;

    const isEditMode = Boolean(educationalPlan[EducationalPlanFields.ID]);

    return (
      <Dialog
        open={isOpen}
        onClose={this.handleClose}
        classes={{
          paper: classes.dialog
        }}
      >
        <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} учебный план</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField label="Наименование образовательной программы *"
                     onChange={this.saveField(EducationalPlanFields.PROFILE)}
                     variant="outlined"
                     className={classNames(classes.input, classes.marginBottom30)}
                     fullWidth
                     value={educationalPlan[EducationalPlanFields.PROFILE]}
                     InputLabelProps={{
                       shrink: true,
                     }}
          />
          <DirectionSelector
            onChange={this.changeDirection}
            value={educationalPlan[EducationalPlanFields.DIRECTION].value}
            valueLabel={educationalPlan[EducationalPlanFields.DIRECTION].label}
            className={classes.marginBottom30}
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Форма обучения *</FormLabel>
            <RadioGroup className={classes.radioGroup}
                        onChange={this.saveField(EducationalPlanFields.EDUCATION_FORM)}
                        value={educationalPlan[EducationalPlanFields.EDUCATION_FORM]}
            >
              <FormControlLabel value="internal"
                                control={<Radio checked={educationalPlan[EducationalPlanFields.EDUCATION_FORM] === 'internal'} />}
                                label="Очная"
              />
              <FormControlLabel value="extramural"
                                control={<Radio checked={educationalPlan[EducationalPlanFields.EDUCATION_FORM] === 'extramural'} />}
                                label="Заочная"
              />
            </RadioGroup>
          </FormControl>
          <FormControl className={classNames(classes.qualificationSelectorWrap, classes.marginBottom30)}>
            <InputLabel shrink id="section-label">
              Уровень образования *
            </InputLabel>
            <Select
              variant="outlined"
              className={classes.selector}
              // @ts-ignore
              onChange={this.saveField(EducationalPlanFields.QUALIFICATION)}
              value={educationalPlan[EducationalPlanFields.QUALIFICATION]}
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
          <DatePicker
            value={educationalPlan[EducationalPlanFields.YEAR] + ''}
            onChange={(date: any) => this.changeYear(date)}
            label={'Год набора'}
            views={['year']}
            format={YEAR_DATE_FORMAT}
            minDate={'2018'}
            maxDate={(currentDate.getFullYear() + 3).toString()}
          />
          <DatePicker
            value={educationalPlan[EducationalPlanFields.APPROVAL_DATE]}
            onChange={(date: any) => this.saveDate(date)}
            format={FULL_DATE_FORMAT}
            label={'Дата согласования'}
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

//@ts-ignore
export default connect(withStyles(styles)(CreateModal));
