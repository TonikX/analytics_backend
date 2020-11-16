import React from 'react';
import {withRouter} from "react-router-dom";
import get from 'lodash/get';

import Paper from '@material-ui/core/Paper';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import {CharacteristicProps,} from '../types';
import {steps} from './constants';

import connect from './Сharacteristic.connect';
import styles from './Сharacteristic.styles';
import CKEditor from "../../../components/CKEditor";
import UserSelector from "../../Profile/UserSelector";
import EducationPlanInDirectionSelector
    from "../../EduationPlanInDirection/EducationPlanInDirectionSelector/EducationPlanInDirectionSelector";
import {EducationProgramCharacteristicFields, EducationProgramFields} from "../enum";
import {YEAR_DATE_FORMAT} from "../../../common/utils";
import DatePickerComponent from "../../../components/DatePicker/DatePicker";
import QualificationSelector from "../../../components/QualificationSelector/QualificationSelector";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {CompetenceType} from "../../Competences/types";
import {CompetenceFields} from "../../Competences/enum";
import {IndicatorType} from "../../Indicators/types";
import {IndicatorsFields} from "../../Indicators/enum";

class Characteristic extends React.Component<CharacteristicProps> {
    state = {
        activeStep: 0
    };

    componentDidMount() {
        this.props.actions.getEducationalProgramCharacteristic(get(this.props, 'match.params.id'));
    }

    handleStep = (number: number) => () => {
        this.setState({activeStep: number})
    };

    handleChangeEducationProgramYear = (value: MaterialUiPickersDate) => {
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

    handleChangeSKEEditorField = (field: string) => (value: string) => {
        this.props.actions.changeEducationalProgramCharacteristic({
            id: this.getEducationalProgramCharacteristicId(),
            educationalProgramId: this.getEducationalProgramId(),
            payload: {
                [field]: value
            }
        })
    }

    getEducationalProgramId = () => get(this.props.educationalProgramCharacteristic, [EducationProgramCharacteristicFields.EDUCATION_PROGRAM, EducationProgramFields.ID], '');

    getEducationalProgramCharacteristicId = () => get(this.props.educationalProgramCharacteristic, EducationProgramCharacteristicFields.ID, '');

    returnCompetences = (competences: Array<CompetenceType>) => {
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {competences.map((item: any, index: number) =>
                        <TableRow>
                            <TableCell>
                                {item[CompetenceFields.NUMBER]}
                            </TableCell>
                            <TableCell>
                                {item[CompetenceFields.TITLE]}
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

    returnProfessionalCompetences = (competences: Array<CompetenceType>) => {
        const {classes} = this.props;
        return <>
            <Table stickyHeader size='small'>
                <TableHead className={classes.header}>
                    <TableRow>
                        <TableCell>
                            Код и наименование компетенции
                        </TableCell>
                        <TableCell>
                            Код и наименование индикатора
                        </TableCell>
                        <TableCell>
                            Наименование сопряженного проф. стандарта
                        </TableCell>
                        <TableCell>
                            Выбранные обобщенные трудовые функции
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {competences.map((item: any, index: number) =>
                        <TableRow>
                            <TableCell>
                                {item.competence[CompetenceFields.NUMBER]} {item.competence[CompetenceFields.TITLE]}
                            </TableCell>
                            <TableCell>
                                {get(item, 'competence.indicator_in_competencse', []).map((item: IndicatorType) =>
                                    <> {item[IndicatorsFields.NUMBER]} {item[IndicatorsFields.TITLE]}<br/></>
                                )}
                            </TableCell>
                            <TableCell>
                                {get(item, 'professional_standard', []).map((standard: any) => <>{get(standard, 'code')} {get(standard, 'title')}<br/></>)}
                            </TableCell>
                            <TableCell>
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

    renderContent = () => {
        const {educationalProgramCharacteristic, classes} = this.props;
        const {activeStep} = this.state;

        switch (activeStep){
            case 0:
                return <>
                    <EducationPlanInDirectionSelector value={get(educationalProgramCharacteristic, [EducationProgramCharacteristicFields.EDUCATION_PROGRAM, EducationProgramFields.ACADEMIC_PLAN_FOR_EP, 'id'], '')}
                                                      handleChange={() => {}} />
                    <UserSelector selectorLabel="Руководитель" value="" />
                    <DatePickerComponent label="Год *"
                                         views={["year"]}
                                         value={get(educationalProgramCharacteristic, [EducationProgramCharacteristicFields.EDUCATION_PROGRAM, EducationProgramFields.YEAR], '').toString()}
                                         onChange={this.handleChangeEducationProgramYear}
                                         format={YEAR_DATE_FORMAT}
                    />
                    <QualificationSelector onChange={this.handleChangeQualification}
                                           value={get(educationalProgramCharacteristic, [EducationProgramCharacteristicFields.EDUCATION_PROGRAM, EducationProgramFields.QUALIFICATION], '')}
                    />
                </>
            case 1:
                return <>
                    <Typography className={classes.label}>Область профессиональной деятельности</Typography>
                    <Table stickyHeader size='small'>
                        <TableHead className={classes.header}>
                            <TableRow>
                                <TableCell>
                                    №
                                </TableCell>
                                <TableCell>
                                    Код и наименования области профессиональной деятельности
                                </TableCell>
                                <TableCell>
                                    Код профессионального стандарта из данной области
                                </TableCell>
                                <TableCell>
                                    Наименование профессионального стандарта из данной области
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {get(educationalProgramCharacteristic, EducationProgramCharacteristicFields.AREA_OF_ACTIVITY, []).map((item: any, index: number) =>
                                <TableRow>
                                    <TableCell>
                                        {index}
                                    </TableCell>
                                    <TableCell>
                                        {item.title}
                                    </TableCell>
                                    <TableCell>
                                        {get(item, 'professional_standard', []).map((standard: any) => <>{get(standard, 'code')} <br/></>)}
                                    </TableCell>
                                    <TableCell>
                                        {get(item, 'professional_standard', []).map((standard: any) => <>{get(standard, 'title')} <br/></>)}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div style={{display: 'flex'}}>
                        <Button variant="outlined" style={{marginLeft: 'auto', marginTop: '20px'}}>Добавить</Button>
                    </div>
                    <br/> <br/>
                    <CKEditor label={"Сферы профессиональной деятельности"}
                              value={get(educationalProgramCharacteristic, EducationProgramCharacteristicFields.KINDS_OF_ACTIVITIES, '')}
                              onChange={this.handleChangeSKEEditorField(EducationProgramCharacteristicFields.KINDS_OF_ACTIVITIES)}
                              toolbarContainerId="toolbar-container2"
                    />
                </>
            case 2:
                return <>
                    <CKEditor label={"Объекты профессиональной деятельности"}
                              value={get(educationalProgramCharacteristic, EducationProgramCharacteristicFields.OBJECTS_OF_ACTIVITY, '')}
                              onChange={this.handleChangeSKEEditorField(EducationProgramCharacteristicFields.OBJECTS_OF_ACTIVITY)}
                              toolbarContainerId="toolbar-container1"
                    />
                    <CKEditor label={"Задачи профессиональной деятельности"}
                              value={get(educationalProgramCharacteristic, EducationProgramCharacteristicFields.TASKS_OF_ACTIVITY, '')}
                              onChange={this.handleChangeSKEEditorField(EducationProgramCharacteristicFields.TASKS_OF_ACTIVITY)}
                              toolbarContainerId="toolbar-container3"
                    />
                </>;
            case 3:
                return <>
                    {this.returnCompetences(get(educationalProgramCharacteristic, EducationProgramCharacteristicFields.OK_COMPETENCES, []))}
                </>;
            case 4:
                return <>
                    {this.returnCompetences(get(educationalProgramCharacteristic, EducationProgramCharacteristicFields.KC_COMPETENCES, []))}
                </>;
            case 5:
                return <>
                    {this.returnProfessionalCompetences(get(educationalProgramCharacteristic, EducationProgramCharacteristicFields.PK_COMPETENCES, []))}
                </>;
            case 6:
                return <>
                    {this.returnCompetences(get(educationalProgramCharacteristic, EducationProgramCharacteristicFields.NP_COMPETENCES, []))}
                </>;
            case 7:
                return <CKEditor label={"Необходимый преподавательский состав"}
                                 value={get(educationalProgramCharacteristic, EducationProgramCharacteristicFields.PPS, '')}
                                 onChange={this.handleChangeSKEEditorField(EducationProgramCharacteristicFields.PPS)}
                                 toolbarContainerId="toolbar-container"
                />;
            case 8:
                return <CKEditor label={"Аннотация"}
                                 value={get(educationalProgramCharacteristic, EducationProgramCharacteristicFields.ANNOTATION, '')}
                                 onChange={this.handleChangeSKEEditorField(EducationProgramCharacteristicFields.ANNOTATION)}
                                 toolbarContainerId="toolbar-container"
                    />;
            case 9:
                return <>
                    <UserSelector selectorLabel='Разработчики'
                                  value=""
                                  handleChange={()=>{}}
                    />
                    <UserSelector selectorLabel="Представители работодателей"
                                  value=""
                                  handleChange={()=>{}}
                    />
                    <UserSelector selectorLabel="Директор мегафакультета"
                                  value=""
                                  handleChange={()=>{}}
                    />
                    <UserSelector selectorLabel="Декан факультета"
                                  value=""
                                  handleChange={()=>{}}
                    />
                </>
        }
    }

    render() {
        const {classes} = this.props;
        const {activeStep} = this.state;

        return (
            <Paper className={classes.root}>
                <Stepper activeStep={activeStep}
                         orientation="vertical"
                         nonLinear
                         className={classes.stepper}
                >
                    {steps.map((value, index) => {
                        return (
                            <Step key={index}>
                                <StepButton onClick={this.handleStep(index)}
                                            completed={false}
                                            style={{textAlign: 'left'}}
                                >
                                    {value}
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>
                <div className={classes.content}>
                    <Typography className={classes.title}>
                        <div>Характеристика образовательной программы <span style={{fontWeight: 500}}>"Название"</span></div>
                    </Typography>

                    {this.renderContent()}
                </div>
            </Paper>
        );
    }
}

export default withRouter(connect(withStyles(styles)(Characteristic)));
