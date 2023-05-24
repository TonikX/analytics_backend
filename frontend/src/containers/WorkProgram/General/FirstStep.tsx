import React from 'react';
import get from 'lodash/get';
import classNames from 'classnames';
import moment, {Moment} from "moment";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import {withStyles} from '@mui/styles';
import DatePicker from '@mui/lab/DatePicker';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DateIcon from "@mui/icons-material/DateRange";
import AddIcon from "@mui/icons-material/Add";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Chip from "@mui/material/Chip";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";

import InputsLoader from '../../../components/InputsLoader';
import SimpleSelector from '../../../components/SimpleSelector';
import SpecializationSelector from './Specialization';

import UserSelector from "../../Profile/UserSelector";
import SearchSelector from "../../../components/SearchSelector";

import {FirstStepProps} from './types';
import {WorkProgramGeneralFields} from "../enum";
import {FULL_DATE_FORMAT, getUserFullName} from "../../../common/utils";
import {
  languageObject,
  specializationObject,
  languageArray,
  implementationFormats,
  implementationFormatsObject
} from "../constants";
import {UserFields} from "../../../layout/enum";

import connect from './FirstStep.connect';
import styles from './FirstStep.styles';
import FormLabel from "@mui/material/FormLabel";

class FirstStep extends React.Component<FirstStepProps> {
  state = {
    [WorkProgramGeneralFields.CODE]: '',
    [WorkProgramGeneralFields.TITLE]: '',
    [WorkProgramGeneralFields.APPROVAL_DATE]: '',
    [WorkProgramGeneralFields.AUTHORS]: '',
    [WorkProgramGeneralFields.DESCRIPTION]: '',
    [WorkProgramGeneralFields.VIDEO_LINK]: '',
    [WorkProgramGeneralFields.MOODLE_LINK]: '',
    [WorkProgramGeneralFields.QUALIFICATION]: '',
    [WorkProgramGeneralFields.EXTRA_POINTS]: '',
    [WorkProgramGeneralFields.LANGUAGE]: '',
    [WorkProgramGeneralFields.OFFERTA]: false,
    [WorkProgramGeneralFields.BARS]: false,
    [WorkProgramGeneralFields.SEMESTER_COUNT]: 1,
    [WorkProgramGeneralFields.IMPLEMENTATION_FORMAT]: undefined,
    addEditorsMode: false
  };

  componentDidMount() {
    this.props.structuralUnitActions.getStructuralUnits();

    this.setState({
      [WorkProgramGeneralFields.TITLE]: this.props.title,
      [WorkProgramGeneralFields.CODE]: this.props.code,
      [WorkProgramGeneralFields.APPROVAL_DATE]: this.props.date,
      [WorkProgramGeneralFields.AUTHORS]: this.props.authors,
      [WorkProgramGeneralFields.DESCRIPTION]: this.props.description,
      [WorkProgramGeneralFields.VIDEO_LINK]: this.props.video,
      [WorkProgramGeneralFields.MOODLE_LINK]: this.props.moodleLink,
      [WorkProgramGeneralFields.QUALIFICATION]: this.props.qualification,
      [WorkProgramGeneralFields.LANGUAGE]: this.props.language,
      [WorkProgramGeneralFields.SEMESTER_COUNT]: this.props.semesterCount,
      [WorkProgramGeneralFields.BARS]: this.props.bars,
      [WorkProgramGeneralFields.IMPLEMENTATION_FORMAT]: this.props.implementationFormat,
      [WorkProgramGeneralFields.OFFERTA]: this.props.offerta,
    })
  }

  componentDidUpdate(prevProps: Readonly<FirstStepProps>, prevState: Readonly<{}>, snapshot?: any) {
    if (prevProps.title !== this.props.title || prevProps.code !== this.props.code ||
      prevProps.authors !== this.props.authors || prevProps.date !== this.props.date) {
      this.setState({
        [WorkProgramGeneralFields.TITLE]: this.props.title,
        [WorkProgramGeneralFields.CODE]: this.props.code,
        [WorkProgramGeneralFields.APPROVAL_DATE]: this.props.date,
        [WorkProgramGeneralFields.AUTHORS]: this.props.authors,
        [WorkProgramGeneralFields.DESCRIPTION]: this.props.description,
        [WorkProgramGeneralFields.VIDEO_LINK]: this.props.video,
        [WorkProgramGeneralFields.MOODLE_LINK]: this.props.moodleLink,
        [WorkProgramGeneralFields.QUALIFICATION]: this.props.qualification,
        [WorkProgramGeneralFields.LANGUAGE]: this.props.language,
        [WorkProgramGeneralFields.SEMESTER_COUNT]: this.props.semesterCount,
        [WorkProgramGeneralFields.BARS]: this.props.bars,
        [WorkProgramGeneralFields.OFFERTA]: this.props.offerta,
        [WorkProgramGeneralFields.IMPLEMENTATION_FORMAT]: this.props.implementationFormat,
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

  changeMoodleLink = (e: React.ChangeEvent) => {
    this.setState({
      [WorkProgramGeneralFields.MOODLE_LINK]: get(e, 'target.value')
    });
  }

  changeSemesterCount = (e: React.ChangeEvent) => {
    const value = get(e, 'target.value', '') as string
    this.setState({
      [WorkProgramGeneralFields.SEMESTER_COUNT]: parseInt(value)
    });
    this.props.actions.saveWorkProgram({
      destination: WorkProgramGeneralFields.SEMESTER_COUNT,
      value: parseInt(value)
    });
  }

  changeDescription = (e: React.ChangeEvent) => {
    this.setState({
      [WorkProgramGeneralFields.DESCRIPTION]: get(e, 'target.value')
    });
  }

  changeLanguage = (language: string) => {
    this.setState({
      [WorkProgramGeneralFields.LANGUAGE]: language
    });

    this.props.actions.saveWorkProgram({
      destination: WorkProgramGeneralFields.LANGUAGE,
      value: language
    });
  }

  changeImplementationFormat = (implementationFormat: string) => {
    this.setState({
      [WorkProgramGeneralFields.IMPLEMENTATION_FORMAT]: implementationFormat
    });

    this.props.actions.saveWorkProgram({
      destination: WorkProgramGeneralFields.IMPLEMENTATION_FORMAT,
      value: implementationFormat
    });
  }

  changeStructuralUnit = (structuralUnit: string) => {
    this.props.actions.saveWorkProgram({
      destination: WorkProgramGeneralFields.STRUCTURAL_UNIT,
      value: structuralUnit
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

  handleAddUser = (userId: number) => {
    const {editors} = this.props;

    this.props.actions.saveWorkProgram({
      destination: WorkProgramGeneralFields.EDITORS,
      value: [
        ...editors.map(user => user[UserFields.ID]),
        userId
      ]
    });

    this.setState({
      addEditorsMode: false
    });
  }

  deleteEditor = (userId: number) => () => {
    const {editors} = this.props;

    this.props.actions.saveWorkProgram({
      destination: WorkProgramGeneralFields.EDITORS,
      value: editors.reduce((editors: Array<any>, user) => {
        if (user[UserFields.ID] !== userId) {
          editors.push(user[UserFields.ID]);
        }
        return editors;
      }, [])
    });
  }

  handleChangeStructuralUnitSearchText = (searchText: string) => {
    this.props.structuralUnitActions.changeSearchQuery(searchText);
    this.props.structuralUnitActions.getStructuralUnits();
  }

  handleBars = (e: React.ChangeEvent) => {
    this.props.actions.saveWorkProgram({
      destination: WorkProgramGeneralFields.BARS,
      value: get(e, "target.checked", false)
    })
    this.setState({
      [WorkProgramGeneralFields.BARS]: get(e, "target.checked", false)
    });
  }

  handleOfferta = (e: React.ChangeEvent) => {
    this.props.actions.saveWorkProgram({
      destination: WorkProgramGeneralFields.OFFERTA,
      value: get(e, "target.checked", false)
    })
    this.setState({
      [WorkProgramGeneralFields.OFFERTA]: get(e, "target.checked", false)
    });
  }

  render() {
    const {
      classes, fetchingTitle, fetchingCode, fetchingAuthors, fetchingDate, fetchingVideoLink, fetchingDescription,
      fetchingMoodleLink, isCanEdit, editors, structuralUnit, structuralUnitsList, canAddEditors
    } = this.props;
    const {state} = this;
    const {addEditorsMode} = state;
    const changeBlock = this.props.changeBlock || [];
    const disabled = changeBlock.some((item) => {
      return item.discipline_block_module.descipline_block.length > 0
    });

    return (
      <div className={classes.container}>
        <div className={classNames(classes.side, {[classes.fullWidth]: !isCanEdit})}>
          <InputsLoader loading={fetchingCode}>
            {isCanEdit ?
              <TextField variant="outlined"
                         label="Идентификационный номер программы"
                         className={classes.input}
                         value={state[WorkProgramGeneralFields.CODE]}
                         onBlur={this.saveField(WorkProgramGeneralFields.CODE)}
                         onChange={this.changeCode}
                         disabled
                         InputLabelProps={{
                           shrink: true,
                         }}
              />
              :
              <Typography className={classes.textItem}> <b>Идентификационный номер
                программы:</b> {state[WorkProgramGeneralFields.CODE]}</Typography>
            }

          </InputsLoader>
          <InputsLoader loading={fetchingTitle}>
            {isCanEdit ?
              <TextField variant="outlined"
                         label="Название дисциплины"
                         value={state[WorkProgramGeneralFields.TITLE]}
                         className={classes.input}
                         onBlur={this.saveField(WorkProgramGeneralFields.TITLE)}
                         onChange={this.changeTitle}
                         // disabled={fetchingTitle || !isCanEdit}
                         disabled={disabled}
              />
              :
              <Typography className={classes.textItem}> <b>Название
                дисциплины:</b> {state[WorkProgramGeneralFields.TITLE]}</Typography>
            }
          </InputsLoader>
          <InputsLoader loading={fetchingAuthors}>
            {isCanEdit ?
              <TextField variant="outlined"
                         label="Авторский состав"
                         value={state[WorkProgramGeneralFields.AUTHORS]}
                         className={classes.input}
                         onBlur={this.saveField(WorkProgramGeneralFields.AUTHORS)}
                         onChange={this.changeAuthors}
                         disabled={fetchingAuthors || !isCanEdit}
                         InputLabelProps={{
                           shrink: true,
                         }}
              />
              :
              <Typography className={classes.textItem}> <b>Авторский
                состав:</b> {state[WorkProgramGeneralFields.AUTHORS]}</Typography>
            }
          </InputsLoader>

          {isCanEdit ?
            <SearchSelector label="Структурное подразделение"
                            changeSearchText={this.handleChangeStructuralUnitSearchText}
                            list={structuralUnitsList}
                            changeItem={this.changeStructuralUnit}
                            value={structuralUnit?.id}
                            valueLabel={structuralUnit?.title}
                            className={classes.marginBottom20}
                            disabled={disabled}
            />
            :
            <Typography className={classes.textItem}>
              <b>Структурное подразделение:</b> {structuralUnit?.title || 'Подразделение не указано'}
            </Typography>
          }

          <InputsLoader loading={fetchingVideoLink}>
            {isCanEdit ?
              <TextField variant="outlined"
                         label="Видео"
                         value={state[WorkProgramGeneralFields.VIDEO_LINK]}
                         className={classes.input}
                         onBlur={this.saveField(WorkProgramGeneralFields.VIDEO_LINK)}
                         onChange={this.changeVideo}
                         disabled={fetchingVideoLink || !isCanEdit}
                         InputLabelProps={{
                           shrink: true,
                         }}
              />
              :
              <Typography className={classes.textItem}>
                <b>Видео: </b>
                {state[WorkProgramGeneralFields.VIDEO_LINK]?.length > 0 ?
                  <a href={state[WorkProgramGeneralFields.VIDEO_LINK]}> Видео </a>
                  : null
                }
              </Typography>
            }
          </InputsLoader>

          <InputsLoader loading={fetchingMoodleLink}>
            {isCanEdit ?
              <TextField variant="outlined"
                         label="Ссылка в Moodle"
                         value={state[WorkProgramGeneralFields.MOODLE_LINK]}
                         className={classes.input}
                         onBlur={this.saveField(WorkProgramGeneralFields.MOODLE_LINK)}
                         onChange={this.changeMoodleLink}
                         disabled={fetchingMoodleLink || !isCanEdit}
                         InputLabelProps={{
                           shrink: true,
                         }}
              />
              :
              <Typography className={classes.textItem}>
                <b>Ссылка в Moodle: </b>
                {state[WorkProgramGeneralFields.MOODLE_LINK]?.length > 0 ?
                  <a href={state[WorkProgramGeneralFields.MOODLE_LINK]}> Moodle </a>
                  : null
                }
              </Typography>
            }
          </InputsLoader>

          {!isCanEdit &&
          <Typography className={classes.textItem}><b>Уровень образовательной
            программы:</b> {specializationObject[state[WorkProgramGeneralFields.QUALIFICATION]]} </Typography>
          }

          {!isCanEdit &&
          <Typography className={classes.textItem}><b>Язык
            реализации:</b> {languageObject[state[WorkProgramGeneralFields.LANGUAGE]]} </Typography>
          }

          {!isCanEdit && state[WorkProgramGeneralFields.IMPLEMENTATION_FORMAT] &&
              <Typography className={classes.textItem}><b>Формат
                реализации:</b> {implementationFormatsObject[state[WorkProgramGeneralFields.IMPLEMENTATION_FORMAT]]} </Typography>
          }

          {!isCanEdit &&
          <>
            <Typography className={classes.textItem}> {state[WorkProgramGeneralFields.DESCRIPTION]} </Typography>
          </>
          }

          {/*<Typography className={classes.textItem}>*/}
          {/*    <b>Структурное подразделение:</b> {structuralUnit?.title || 'Подразделение не указано'}*/}
          {/*</Typography>*/}

          {isCanEdit ?
            <FormControl component="fieldset">
              <FormLabel component="legend">Кол-во семестров *</FormLabel>
              <RadioGroup className={classes.radioGroup} onChange={this.changeSemesterCount}>
                {new Array(1,2,3,4,5,6,7,8).map((item) => (
                  <FormControlLabel
                    value={item}
                    control={<Radio checked={state[WorkProgramGeneralFields.SEMESTER_COUNT] === item} />}
                    label={item}
                    key={item}
                    disabled={disabled}
                  />
                ))}
              </RadioGroup>
            </FormControl>
              :
              <Typography className={classes.textItem}> <b>Кол-во семестров: </b> {state[WorkProgramGeneralFields.SEMESTER_COUNT]}</Typography>
            }

          <div style={{display: "flex", alignItems: "center"}}>
            <Typography>Дисциплина реализуется в БАРС 2.0</Typography>
            <Switch
              checked={state[WorkProgramGeneralFields.BARS]}
              onChange={this.handleBars}
              disabled={!isCanEdit}
              color="secondary"
              className={classes.bars}
            />
          </div>

          <div style={{display: "flex", alignItems: "center"}}>
            <Typography>Оферта</Typography>
            <Switch
              checked={state[WorkProgramGeneralFields.OFFERTA]}
              onChange={this.handleOfferta}
              disabled={!isCanEdit}
              color="secondary"
              className={classes.bars}
            />
          </div>

          <Typography className={classes.editorTitle}>
            Редакторы:
          </Typography>

          <div className={classes.editorsList}>
            {editors && editors.map && editors.map(editor =>
              <Chip label={getUserFullName(editor)}
                    onDelete={isCanEdit ? this.deleteEditor(editor[UserFields.ID]) : undefined}
                    className={classes.editorItem}
              />
            )}
          </div>

          {addEditorsMode ?
            <Dialog open
                    fullWidth
                    maxWidth="sm"
                    classes={{
                      paper: classes.dialog
                    }}
                    onClose={() => this.setState({addEditorsMode: false})}
            >
              <UserSelector handleChange={this.handleAddUser}
                            selectorLabel="Выберите редактора"
                            label="Выберите редактора"
                            noMargin
              />
            </Dialog>
            :
            canAddEditors
              ?
              <Button onClick={() => this.setState({addEditorsMode: true})}
                      variant="text"
                      className={classes.addEditorButton}
              >
                <AddIcon/> Добавить редактора
              </Button>
              :
              <></>
          }

        </div>

        {isCanEdit &&
        <div className={classes.side}>
          <InputsLoader loading={fetchingDescription}>
            <TextField variant="outlined"
                       label="Описание"
                       value={state[WorkProgramGeneralFields.DESCRIPTION]}
                       className={classes.input}
                       onBlur={this.saveField(WorkProgramGeneralFields.DESCRIPTION)}
                       onChange={this.changeDescription}
                       disabled={fetchingDescription || !isCanEdit}
                       InputLabelProps={{
                         shrink: true,
                       }}
                       multiline
                       rows={11}
            />
          </InputsLoader>

          <SpecializationSelector />

          <SimpleSelector label="Язык реализации"
                          metaList={languageArray}
                          value={state[WorkProgramGeneralFields.LANGUAGE]}
                          wrapClass={classes.selectorWrap}
                          onChange={this.changeLanguage}
          />

          {(state[WorkProgramGeneralFields.IMPLEMENTATION_FORMAT] || state[WorkProgramGeneralFields.IMPLEMENTATION_FORMAT] === null) && (
            <SimpleSelector
              label="Формат реализации"
              metaList={implementationFormats}
              value={state[WorkProgramGeneralFields.IMPLEMENTATION_FORMAT]}
              wrapClass={classes.selectorWrap}
              onChange={this.changeImplementationFormat}
              noMargin
            />
          )}
          <Typography className={classes.marginBottom20}>Обратите внимание, при выборе онлайн формата все ваши введенные часы будут обнулены</Typography>

          <InputsLoader loading={fetchingDate}>
            <DatePicker
              value={moment(state[WorkProgramGeneralFields.APPROVAL_DATE])}
              onChange={(date: any) => this.changeDate(date)}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <DateIcon/>
                  </IconButton>
                ),
              }}
              inputVariant="outlined"
              className={classes.datePicker}
              format={FULL_DATE_FORMAT}
              label={'Дата создания'}
              disabled={!isCanEdit}
            />
          </InputsLoader>
        </div>
        }
      </div>
    );
  }
}

//@ts-ignore
export default connect(withStyles(styles)(FirstStep));
