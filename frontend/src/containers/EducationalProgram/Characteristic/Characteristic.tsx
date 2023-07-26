import React from 'react';
import get from 'lodash/get';
import {Link} from "react-router-dom";

import Paper from '@mui/material/Paper';
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import {withStyles} from '@mui/styles';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from '@mui/material/CircularProgress';

import {CharacteristicProps,} from '../types';
import {steps} from './constants';
import {appRouter} from "../../../service/router-service";
import LinkIcon from "@mui/icons-material/Link";
import Tooltip from "@mui/material/Tooltip";
import {withRouter} from '../../../hoc/WithRouter'

import connect from './Characteristic.connect';
import styles from './Characteristic.styles';
import CKEditor from "../../../components/CKEditor";
import UserSelector from "../../Profile/UserSelector";
import EducationPlanInDirectionSelector
  from "../../EduationPlanInDirection/EducationPlanInDirectionSelector/EducationPlanInDirectionSelector";
import {CompetenceTableType, EducationProgramCharacteristicFields, EducationProgramFields} from "../enum";
import {getUserFullName, YEAR_DATE_FORMAT} from "../../../common/utils";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {CompetenceType} from "../../Competences/types";
import {CompetenceFields} from "../../Competences/enum";
import {IndicatorType} from "../../Indicators/types";
import {IndicatorsFields} from "../../Indicators/enum";
import {CompetenceTable} from "./CompetencesTable";
import {ProfessionalCompetences} from "./ProfessionalCompetences";
import ForsitesProfessionalCompetences from "./ForsitesProfessionalCompetences";
import MinorProfessionalCompetences from "./MinorProfessionalCompetences";
import AreaOfActivity from "./AreaOfActivity";
import KindsOfActivity from "./KindsOfActivity";
import ObjectsOfActivity from "./ObjectsOfActivity";
import TasksTypes from "./TasksTypes";
import CompetenceMatrix from "./CompetenceMatrix";
import {RepresentativesOrganizations} from "./RepresentativesOrganizations";
import InputLabel from '@mui/material/InputLabel'
import {getEducationalProgramFullNameForSelect} from "../../EduationPlanInDirection/getters";
import EducationalStandardSelector from "../../EducationalStandards/EducationalStandardSelector";
import {languageArray} from "../../WorkProgram/constants";
import SimpleSelector from "../../../components/SimpleSelector";
import Checkbox from "@mui/material/Checkbox";
import TextField from "../../../components/TextField";
import {StatusPoint} from "../../../components/StatusPoint";
import Service from '../service';

const service = new Service();

class Characteristic extends React.Component<CharacteristicProps> {
  state = {
    activeStep: 0,
    addNewOP: false,
    isFetching: false
  };

  componentDidMount() {
    this.selectActiveStep()
    this.props.actions.getEducationalProgramCharacteristic(get(this.props, 'params.id'));
  }

  componentDidUpdate(prevProps: CharacteristicProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.selectActiveStep()
    }
  }

  selectActiveStep = () => {
    const locations = this.props.location.pathname.split('/')
    if (locations.length === 3) {
      return this.handleStep(steps[0].link)
    }
    const section = locations[locations.length - 1] - 1
    this.setState({activeStep: section})
  }

  getCharacteristicId = () => get(this.props, 'params.id')

  handleStep = (link: (id: number) => string) => {
    // @ts-ignore
    this.props.navigate(link(this.getCharacteristicId()))
  };

  handleChangeEducationProgramYear = (value: any) => {
    this.props.actions.changeEducationalProgram({
      id: this.getEducationalProgramId(),
      payload: {
        [EducationProgramFields.YEAR]: value ? value.format(YEAR_DATE_FORMAT) : ''
      }
    })
  }

  handleChangeQualification = (value: string) => {
    this.props.actions.changeEducationalProgram({
      id: this.getEducationalProgramId(),
      payload: {
        [EducationProgramFields.QUALIFICATION]: value
      }
    })
  }

  handleChangePlan = (value: string) => {
    const { educationalProgramCharacteristic } = this.props
    this.setState({ addNewOP: false })
    this.props.actions.changeEducationalProgram({
      id: this.getEducationalProgramId(),
      payload: {
        [EducationProgramFields.EDUCATIONAL_PROGRAM]: [
          ...get(educationalProgramCharacteristic, EducationProgramCharacteristicFields.EDUCATION_PROGRAM, []).map((item: any) => item.id),
          value,
        ]
      }
    })
  }

  handleChangeHead = (value: string) => {
    this.props.actions.changeEducationalProgram({
      id: this.getEducationalProgramId(),
      payload: {
        [EducationProgramFields.EP_SUPERVISOR]: value
      }
    })
  }

  handleChangeEducationalStandard = (value: number) => {
    this.props.actions.changeEducationalProgram({
      id: this.getEducationalProgramId(),
      payload: {
        [EducationProgramFields.EDUCATIONAL_STANDARD]: value
      }
    })
  }

  handleChangeLanguage = (value: number) => {
    this.props.actions.changeEducationalProgram({
      id: this.getEducationalProgramId(),
      payload: {
        [EducationProgramCharacteristicFields.LANGUAGE]: value
      }
    })
  }

  handleChangeRealizationFormat = (value: number) => {
    this.props.actions.changeEducationalProgram({
      id: this.getEducationalProgramId(),
      payload: {
        [EducationProgramCharacteristicFields.REALIZATION_FORMAT]: value
      }
    })
  }

  handleChangeDean = (value: string) => {
    this.props.actions.changeEducationalProgram({
      id: this.getEducationalProgramId(),
      payload: {
        [EducationProgramCharacteristicFields.DEAN]: value
      }
    })
  }

  handleChangeDeanPost = (value: string) => {
    this.props.actions.changeEducationalProgram({
      id: this.getEducationalProgramId(),
      payload: {
        [EducationProgramCharacteristicFields.DEAN_POSITION]: value
      }
    })
  }

  handleChangeDirectorPost = (value: string) => {
    this.props.actions.changeEducationalProgram({
      id: this.getEducationalProgramId(),
      payload: {
        [EducationProgramCharacteristicFields.DIRECTOR_POSITION]: value
      }
    })
  }

  handleChangeSKEEditorField = (field: string) => (data: string) => {
    this.props.actions.changeEducationalProgramCharacteristic({
      id: this.getEducationalProgramCharacteristicId(),
      educationalProgramId: this.getEducationalProgramId(),
      payload: {
        [field]: data
      }
    })
  }

  getEducationalProgramId = () => get(this.props.educationalProgramCharacteristic, EducationProgramFields.ID, '');

  getEducationalProgramCharacteristicId = () => get(this.props.educationalProgramCharacteristic, EducationProgramCharacteristicFields.ID, '');

  returnCompetences = (competences: Array<CompetenceType>) => {
    // @ts-ignore
    const {classes} = this.props;
    return <>
      <Table stickyHeader size='small'>
        <TableHead className={classes.header}>
          <TableRow>
            <TableCell>
              №
            </TableCell>
            <TableCell>
              Название
            </TableCell>
            <TableCell>
              Индикаторы
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {competences.map((item: any, index: number) => {
            const indicators = get(item, 'indicator_in_competencse', []);

            if (indicators.length === 0) {
              return <TableRow key={'competence' + index}>
                <TableCell>
                  {item[CompetenceFields.NUMBER]}
                </TableCell>
                <TableCell>
                  {item[CompetenceFields.TITLE]}
                </TableCell>
                <TableCell />
              </TableRow>
            }

            return indicators.map((indicator: IndicatorType, index: number) =>
              <TableRow key={'indicators' + index}>
                {index === 0 &&
                  <TableCell rowSpan={indicators.length}>
                    {item[CompetenceFields.NUMBER]}
                  </TableCell>
                }
                {index === 0 &&
                  <TableCell rowSpan={indicators.length}>
                    {item[CompetenceFields.TITLE]}
                  </TableCell>
                }
                <TableCell>
                  {indicator[IndicatorsFields.NUMBER]} {indicator[IndicatorsFields.TITLE]}
                </TableCell>
              </TableRow>
            )

          })}
        </TableBody>
      </Table>
      <div style={{display: 'flex'}}>
        <Button variant="outlined" style={{marginLeft: 'auto', marginTop: '20px'}}>Добавить</Button>
      </div>
    </>
  }

  returnProfessionalCompetences = (competences: Array<CompetenceType>) => {
    // @ts-ignore
    const {classes} = this.props;
    return <>
      <Table stickyHeader size='small'>
        <TableHead className={classes.header}>
          <TableRow>
            <TableCell style={{width: '25%'}}>
              Код и наименование компетенции
            </TableCell>
            <TableCell style={{width: '25%'}}>
              Код и наименование индикатора
            </TableCell>
            <TableCell style={{width: '25%'}}>
              Наименование сопряженного проф. стандарта
            </TableCell>
            <TableCell style={{width: '25%'}}>
              Выбранные обобщенные трудовые функции
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {competences.map((item: any) =>
            <TableRow key={item.competence[CompetenceFields.ID]}>
              <TableCell style={{width: '25%'}}>
                {item.competence[CompetenceFields.NUMBER]} {item.competence[CompetenceFields.TITLE]}
              </TableCell>
              <TableCell style={{width: '25%'}}>
                {get(item, 'competence.indicator_in_competencse', []).map((item: IndicatorType) =>
                  <> {item[IndicatorsFields.NUMBER]} {item[IndicatorsFields.TITLE]}<br/></>
                )}
              </TableCell>
              <TableCell style={{width: '25%'}}>
                {get(item, 'professional_standard', []).map((standard: any) => <>{get(standard, 'code')} {get(standard, 'title')}<br/></>)}
              </TableCell>
              <TableCell style={{width: '25%'}}>
                {item.labor_functions}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div style={{display: 'flex'}}>
        <Button variant="outlined" style={{marginLeft: 'auto', marginTop: '20px'}}>Добавить</Button>
      </div>
    </>
  }

  deleteEducationalProgram = (id: number) => () => {
    const { educationalProgramCharacteristic } = this.props

    if (get(educationalProgramCharacteristic, EducationProgramCharacteristicFields.EDUCATION_PROGRAM, []).length === 1) {
      this.props.mainActions.fetchingFailed(['Нельзя удалить единственную ОП'])
      return
    }

    this.props.actions.changeEducationalProgram({
      id: this.getEducationalProgramId(),
      payload: {
        [EducationProgramFields.EDUCATIONAL_PROGRAM]:
          get(educationalProgramCharacteristic, EducationProgramCharacteristicFields.EDUCATION_PROGRAM, [])
            .map((item: any) => item.id)
            .filter((item: any) => item !== id)
      }
    })
  }

  changeProfStandard = () => {

  }

  handleChangeRealizationType = (type: string) => (event: any, checked: boolean) => {
    this.props.actions.changeEducationalProgram({
      id: this.getEducationalProgramId(),
      payload: {
        [type]: checked
      }
    })
  }

  handleChangeOPType = (type: string) => (event: any, checked: boolean) => {
    this.props.actions.changeEducationalProgram({
      id: this.getEducationalProgramId(),
      payload: {
        [type]: checked
      }
    })
  }

  handleChangeTextCheckboxRealizationType = (type: string) => (event: any, checked: boolean) => {
    this.props.actions.changeEducationalProgram({
      id: this.getEducationalProgramId(),
      payload: {
        [type]: checked ? '' : null
      }
    })
  }

  handleChangeTextRealizationType = (type: string) => (value: string) => {
    this.props.actions.changeEducationalProgram({
      id: this.getEducationalProgramId(),
      payload: {
        [type]: value,
      }
    })
  }

  renderRealizationTypeSelect = () => {
    //@ts-ignore
    const {classes} = this.props;
    const {educationalProgramCharacteristic, canEdit} = this.props
    return (
      <>
        <Typography>
          Форма реализации образовательной программы
        </Typography>
        <br/>
        <div className={classes.realizationBlockItem}>
          <Checkbox
            checked={educationalProgramCharacteristic?.[EducationProgramCharacteristicFields.IS_ONLY_IN_UNIVERSITY]}
            onChange={this.handleChangeRealizationType(EducationProgramCharacteristicFields.IS_ONLY_IN_UNIVERSITY)}
            className={classes.checkbox}
            disabled={!canEdit}
          />
          <Typography>Только в университете ИТМО</Typography>
        </div>
        <div className={classes.realizationBlockItem}>
          <Checkbox
            checked={educationalProgramCharacteristic?.[EducationProgramCharacteristicFields.IS_GLOBAL_EDUCATIONAL_PROGRAM]}
            onChange={this.handleChangeRealizationType(EducationProgramCharacteristicFields.IS_GLOBAL_EDUCATIONAL_PROGRAM)}
            className={classes.checkbox}
            disabled={!canEdit}
          />
          <Typography>Имеет статус международной образовательной программы (МОП)</Typography>
        </div>
        <div className={classes.realizationBlockItem}>
          <Checkbox
            checked={educationalProgramCharacteristic?.[EducationProgramCharacteristicFields.IS_ONLINE_FORMAT]}
            onChange={this.handleChangeRealizationType(EducationProgramCharacteristicFields.IS_ONLINE_FORMAT)}
            className={classes.checkbox}
            disabled={!canEdit}
          />
          <Typography  className={classes.realizationBlockItemTitle}>В сетевой форме</Typography> <br/>
        </div>
        {educationalProgramCharacteristic?.[EducationProgramCharacteristicFields.IS_ONLINE_FORMAT] ? (
          <div className={classes.realizationBlockItem}>
            <Typography className={classes.realizationAdditionalBlockItemTitle}>Совместно с российским(-и) партнером(-ами)</Typography>
            <TextField
              noMargin
              onChange={this.handleChangeTextRealizationType(EducationProgramCharacteristicFields.COLLABORATION_RUSSIAN_IN_ONLINE_FORMAT)}
              defaultValue={educationalProgramCharacteristic?.[EducationProgramCharacteristicFields.COLLABORATION_RUSSIAN_IN_ONLINE_FORMAT]}
              disabled={!canEdit}
            />
          </div>
        ) : null}
        <div className={classes.realizationBlockItem}>
          <Checkbox
            checked={educationalProgramCharacteristic?.[EducationProgramCharacteristicFields.IS_COLLABORATION_FOREIGN]}
            onChange={this.handleChangeRealizationType(EducationProgramCharacteristicFields.IS_COLLABORATION_FOREIGN)}
            className={classes.checkbox}
            disabled={!canEdit}
          />
          <Typography className={classes.realizationBlockItemTitle}>В форме совместной образовательной программы</Typography>
        </div>
        {educationalProgramCharacteristic?.[EducationProgramCharacteristicFields.IS_COLLABORATION_FOREIGN] ? (
          <div className={classes.realizationBlockItem}>
            <Typography className={classes.realizationAdditionalBlockItemTitle}>Совместно с иностранным(-и) партнером(-ами)</Typography>
            <TextField
              noMargin
              disabled={!canEdit}
              onChange={this.handleChangeTextRealizationType(EducationProgramCharacteristicFields.COLLABORATION_FOREIGN)}
              defaultValue={educationalProgramCharacteristic?.[EducationProgramCharacteristicFields.COLLABORATION_FOREIGN]}
            />
          </div>
        ) : null}
      </>
    )
  }

  renderTypeOP = () => {
    //@ts-ignore
    const {classes} = this.props;
    const {educationalProgramCharacteristic, canEdit} = this.props
    return (
      <>
        <Typography>
          Тип образовательной программы
        </Typography>
        <br/>
        <div className={classes.opTypeBlockItem}>
          <Checkbox
            checked={educationalProgramCharacteristic?.[EducationProgramCharacteristicFields.SCIENCE_TYPE]}
            onChange={this.handleChangeOPType(EducationProgramCharacteristicFields.SCIENCE_TYPE)}
            className={classes.checkbox}
            disabled={!canEdit}
          />
          <Typography>Научная</Typography>
        </div>
        <div className={classes.opTypeBlockItem}>
          <Checkbox
            checked={educationalProgramCharacteristic?.[EducationProgramCharacteristicFields.CORPORATE_TYPE]}
            onChange={this.handleChangeOPType(EducationProgramCharacteristicFields.CORPORATE_TYPE)}
            className={classes.checkbox}
            disabled={!canEdit}
          />
          <Typography> Корпоративная ОП</Typography>
        </div>
        <div className={classes.opTypeBlockItem}>
          <Checkbox
            checked={educationalProgramCharacteristic?.[EducationProgramCharacteristicFields.INDUSTRIAL_TYPE]}
            onChange={this.handleChangeOPType(EducationProgramCharacteristicFields.INDUSTRIAL_TYPE)}
            className={classes.checkbox}
            disabled={!canEdit}
          />
          <Typography>Индустриальная ОП</Typography>
        </div>
        {/*<div className={classes.opTypeBlockItem}>*/}
        {/*  <Checkbox*/}
        {/*    checked={educationalProgramCharacteristic?.[EducationProgramFields.ENTERPRISE_TYPE]}*/}
        {/*    onChange={this.handleChangeOPType(EducationProgramFields.ENTERPRISE_TYPE)}*/}
        {/*    className={classes.checkbox}*/}
        {/*  />*/}
        {/*  <Typography>Предпринимательская ОП</Typography>*/}
        {/*</div>*/}
        {/*<div className={classes.opTypeBlockItem}>*/}
        {/*  <Checkbox*/}
        {/*    checked={educationalProgramCharacteristic?.[EducationProgramFields.TARGET_MASTER_TYPE]}*/}
        {/*    onChange={this.handleChangeOPType(EducationProgramFields.TARGET_MASTER_TYPE)}*/}
        {/*    className={classes.checkbox}*/}
        {/*  />*/}
        {/*  <Typography>Магистратура перспективных направлений</Typography>*/}
        {/*</div>*/}
      </>
    )
  }

  renderContent = () => {
    //@ts-ignore
    const {classes} = this.props;
    const {educationalProgramCharacteristic, canEdit} = this.props;
    const {activeStep, addNewOP} = this.state;
    const educationalProgramId = get(educationalProgramCharacteristic, [EducationProgramCharacteristicFields.EDUCATION_PROGRAM, '0', 'id'], '')

    if (!educationalProgramId) return
    switch (activeStep){
      case 0:
        return <>
          <Typography>
            Образовательные программы:
          </Typography>
          <br/>
          {get(educationalProgramCharacteristic, EducationProgramCharacteristicFields.EDUCATION_PROGRAM, []).map((item: any) => (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
              <Chip
                label={getEducationalProgramFullNameForSelect(item)}
                onDelete={canEdit ? this.deleteEducationalProgram(item.id) : undefined}
                classes={{
                  label: classes.chipLabel,
                }}
                className={classes.chip}
              />
              <Link style={{ color: '#1d51a3', textDecoration: 'none', marginRight: '10px',  display: 'flex', alignItems: 'center' }} to={appRouter.getPlanDetailLink(get(item, 'academic_plan.id', ''))}>
                <LinkIcon style={{ cursor: 'pointer', marginRight: '5px' }} /> <Typography> Перейти в учебный план </Typography>
              </Link>
            </div>
          ))}
          <br />
          {canEdit ? (
            addNewOP ? <>
              <EducationPlanInDirectionSelector
                value={educationalProgramId}
                handleChange={this.handleChangePlan}
                className={classes.opSelector}
              />
              <Button variant="outlined" size="small" onClick={() => this.setState({ addNewOP: false })}>Отменить</Button>
            </>:
            <Button variant="outlined" size="small" onClick={() => this.setState({ addNewOP: true })}>Добавить образовательную программу</Button>
          ) : null}
          <br /><br />
          <EducationalStandardSelector
            label="Образовательный стандарт"
            onChange={this.handleChangeEducationalStandard}
            value={get(educationalProgramCharacteristic, [EducationProgramFields.EDUCATIONAL_STANDARD, 'id'], '').toString()}
            valueLabel={get(educationalProgramCharacteristic, [EducationProgramFields.EDUCATIONAL_STANDARD, 'name'], '')}
            disabled={!canEdit}
          />
          <SimpleSelector
            label="Язык реализации"
            onChange={this.handleChangeLanguage}
            value={educationalProgramCharacteristic?.[EducationProgramCharacteristicFields.LANGUAGE]}
            metaList={languageArray}
            wrapClass={classes.wrapSelector}
            disabled={!canEdit}
          />
          <UserSelector selectorLabel="Руководитель"
                        value={get(educationalProgramCharacteristic, [EducationProgramCharacteristicFields.EDUCATION_PROGRAM, EducationProgramFields.EP_SUPERVISOR, 'id'], '').toString()}
                        label={getUserFullName(get(educationalProgramCharacteristic, [EducationProgramFields.EP_SUPERVISOR], ''))}
                        handleChange={this.handleChangeHead}
                        disabled={!canEdit}
          />

          {educationalProgramCharacteristic?.[EducationProgramCharacteristicFields.ID] ? (
            <TextField
              label="Должность руководителя"
              onChange={this.handleChangeDirectorPost}
              defaultValue={educationalProgramCharacteristic?.[EducationProgramCharacteristicFields.DIRECTOR_POSITION]}
              disabled={!canEdit}
            />
          ) : null}
          <UserSelector selectorLabel="Декан"
                        value={get(educationalProgramCharacteristic, [EducationProgramCharacteristicFields.EDUCATION_PROGRAM, EducationProgramFields.DEAN, 'id'], '').toString()}
                        label={getUserFullName(get(educationalProgramCharacteristic, [EducationProgramFields.DEAN], ''))}
                        handleChange={this.handleChangeDean}
                        disabled={!canEdit}
          />
          {educationalProgramCharacteristic?.[EducationProgramCharacteristicFields.ID] ? (
            <TextField
              label="Должность декана"
              onChange={this.handleChangeDeanPost}
              defaultValue={educationalProgramCharacteristic?.[EducationProgramCharacteristicFields.DEAN_POSITION]}
              disabled={!canEdit}
            />
          ) : null}

          <SimpleSelector
            label="Формат реализации"
            onChange={this.handleChangeRealizationFormat}
            value={educationalProgramCharacteristic?.[EducationProgramCharacteristicFields.REALIZATION_FORMAT]}
            metaList={[
              {value: 'online', label: 'Онлайн'},
              {value: 'offline', label: 'Офлайн'},
              {value: 'mixed', label: 'Смешанный'},
            ]}
            wrapClass={classes.formatRealizationWrapSelector}
            disabled={!canEdit}
          />
          {this.renderRealizationTypeSelect()}
          <br/>
          {/*this.renderTypeOP()*/}
          <br/>

          <Typography>
            Представители работодателей
          </Typography>
          <br/>
          <RepresentativesOrganizations
            list={educationalProgramCharacteristic?.[EducationProgramCharacteristicFields.EMPLOYERS_LIST]}
          />
        </>
      case 1:
        return <div className={classes.editorWrap}>
          <InputLabel className={classes.label}>Аннотация</InputLabel>
          <CKEditor
            value={get(educationalProgramCharacteristic, EducationProgramCharacteristicFields.ANNOTATION, '')}
            onBlur={this.handleChangeSKEEditorField(EducationProgramCharacteristicFields.ANNOTATION)}
            toolbarContainerId="toolbar-container"
            readOnly={!canEdit}
          />
        </div>
      case 2:
        return (
          <>
            <AreaOfActivity
              characteristic={educationalProgramCharacteristic}
              tableTitle="Области профессиональной деятельности"
              tableType={EducationProgramCharacteristicFields.AREA_OF_ACTIVITY}
            />
            <AreaOfActivity
              characteristic={educationalProgramCharacteristic}
              tableTitle="Дополнительные области профессиональной деятельности"
              tableType={EducationProgramCharacteristicFields.ADDITIONAL_AREA_OF_ACTIVITY}
            />
          </>
        )
      case 3:
        return <KindsOfActivity characteristic={educationalProgramCharacteristic} />
      case 4:
        return <ObjectsOfActivity characteristic={educationalProgramCharacteristic} />
      case 5:
        return <TasksTypes characteristic={educationalProgramCharacteristic} />
      case 6:
        return <CompetenceTable
          tableData={get(educationalProgramCharacteristic, 'group_of_key_competences', [])}
          competenceTableType={CompetenceTableType.KEY_COMPETENCES}
        /> ;
      case 7:
        return <CompetenceTable
          tableData={get(educationalProgramCharacteristic, 'group_of_general_prof_competences', [])}
          competenceTableType={CompetenceTableType.GENERAL_PROFESSIONAL_COMPETENCES}
        />;
      case 8:
        return <CompetenceTable
          tableData={get(educationalProgramCharacteristic, 'group_of_over_prof_competences', [])}
          competenceTableType={CompetenceTableType.SUPRA_PROFESSIONAL_COMPETENCES}
        />;
      case 9:
        return <ProfessionalCompetences tableData={get(educationalProgramCharacteristic, 'group_of_pk_competences_prof', [])} />;
      case 10:
        return <ForsitesProfessionalCompetences tableData={get(educationalProgramCharacteristic, 'group_of_pk_competences_foresight', [])} />;
      case 11:
        return <MinorProfessionalCompetences tableData={get(educationalProgramCharacteristic, 'group_of_pk_competences_minor', [])} />;
      // case 12:
      //   return <div className={classes.editorWrap}>
      //     <InputLabel className={classes.label}>Необходимый преподавательский состав</InputLabel>
      //     <CKEditor
      //       value={get(educationalProgramCharacteristic, EducationProgramCharacteristicFields.PPS, '')}
      //       onBlur={this.handleChangeSKEEditorField(EducationProgramCharacteristicFields.PPS)}
      //       toolbarContainerId="toolbar-container"
      //     />
      //   </div>
      case 12:
        return <CompetenceMatrix/>
    }
  }

  sendToCheck = () => this.props.actions.sendToCheck()

  handleSave = (dowloadLink:string) => () => {
    this.setFetchingTrue();
    const fileLink = dowloadLink;

    let tempLink = document.createElement('a');

    tempLink.href = fileLink;

    tempLink.setAttribute('target', '_blank');

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);

    this.setFetchingFalse();
  }

  setFetchingTrue = () => {
    this.setState({
        isFetching: true
    })
  };

  setFetchingFalse = () => {
    this.setState({
        isFetching: false
    })
  };

  handleUpdateMatrixTable = () => {
    this.props.actions.getCompetenceMatrix(this.getEducationalProgramCharacteristicId())
  }

  render() {
    //@ts-ignore
    const {classes} = this.props;
    const {educationalProgramCharacteristic, canEdit, statusInfo} = this.props;
    const {activeStep, isFetching} = this.state;
    const educationalProgramCharacteristicId = this.getEducationalProgramCharacteristicId();
    const names = get(educationalProgramCharacteristic, EducationProgramCharacteristicFields.EDUCATION_PROGRAM, [])
      .reduce((items: any, item:any) => {
        if(!items.includes('"' + item.title + '"')) {
          items.push('"' + item.title + '"')
        }
        return items
      }, [])

    return (
      <div className={classes.wrap}>
        <div className={classes.paperHeader}>
          <StatusPoint {...statusInfo} />
          <div className={classes.dowloadFileButtonPosition}>
            <Button onClick={this.handleSave(service.getDownloadFileGeneralCharacteristic(educationalProgramCharacteristicId))}>
              Экспорт ОХ в word
              {isFetching ? <CircularProgress size={20} style={{marginLeft: 10}} /> : <></>}
            </Button>
            <Button onClick={this.handleSave(service.getDownloadFileCompetenceMatrix(educationalProgramCharacteristicId))}>
              Экспорт матрицы компетенций в Excel
              {isFetching ? <CircularProgress size={20} style={{marginLeft: 10}} /> : <></>}
            </Button>
          </div>
          {canEdit ? (
            <Button
              variant="contained"
              color="primary"
              onClick={this.sendToCheck}
              className={classes.sendToCheckButton}
            >
              Отправить на проверку
            </Button>
          ) : null}
        </div>

        <Paper className={classes.root}>
          <Stepper activeStep={activeStep}
                   orientation="vertical"
                   nonLinear
                   className={classes.stepper}
          >
            {steps.map(({label, link}, index) => {
              return (
                <Step key={index}>
                  <StepButton onClick={() => this.handleStep(link)}
                              style={{textAlign: 'left'}}
                  >
                    {label}
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>
          <div className={classes.content}>
            <Typography className={classes.title}>
              <div style={{ display: 'flex', width: '100%' }}>
                <div>
                  Характеристика образовательн{names.length === 1 ? 'ой' : 'ых'} программ{names.length === 1 ? 'ы' : ''} {' '}
                  {names.join(',')}
                </div>
                <div style={{ marginLeft: 'auto'}}>
                  {[6, 7, 8].includes(activeStep) &&
                    <Tooltip title="Данный вид компетенций подгружается из связного образовательного стандарта">
                      <Button variant="contained" style={{marginLeft: 'auto', marginRight: 10, height: '36px'}}
                              color="primary">
                        <Link
                          style={{color: '#fff', textDecoration: 'none'}}
                          to={appRouter.getEducationalStandardRoute(get(educationalProgramCharacteristic, [EducationProgramCharacteristicFields.EDUCATIONAL_STANDART, 'id'], ''))}
                        >
                          Образовательный стандарт
                        </Link>
                      </Button>
                    </Tooltip>
                  }
                </div>
              </div>
            </Typography>

            {activeStep === steps.length - 1 ? (
              <Button style={{marginBottom: 10}} onClick={this.handleUpdateMatrixTable}><b>Обновить таблицу</b></Button>
            ) : null}

            {this.renderContent()}
          </div>
        </Paper>
      </div>
    );
  }
}

//@ts-ignore
export default connect(withStyles(styles)(withRouter(Characteristic)));
