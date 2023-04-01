import React, {ReactText} from 'react';
import get from "lodash/get";
import {Moment} from "moment";

import {CreateModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {withStyles} from '@mui/styles';

import DatePickerComponent from "../../../components/DatePicker";
import EducationPlanInDirectionSelector from "../../EduationPlanInDirection/EducationPlanInDirectionSelector";

import {EducationProgramCharacteristicFields} from '../enum';
import {EducationProgramFields} from "../enum";

import {YEAR_DATE_FORMAT} from "../../../common/utils";

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';
import QualificationSelector from "../../../components/QualificationSelector";
import UserSelector from "../../Profile/UserSelector";
import {filterFields} from "../../EduationPlanInDirection/enum";
import Chip from "@mui/material/Chip";

class CreateModal extends React.PureComponent<CreateModalProps> {
    state = {
        educationalProgram: {
            [EducationProgramFields.ID]: null,
            [EducationProgramFields.YEAR]: '2020',
            [EducationProgramFields.MANAGER]: {},
            [EducationProgramFields.QUALIFICATION]: '',
            [EducationProgramFields.ACADEMIC_PLAN_FOR_EP]: []
        },
    };

    componentDidUpdate(prevProps: Readonly<CreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {

    }

    componentDidMount() {
        this.props.directionActions.getDirections();

        this.props.educationPlanInDirectionActions.changeFiltering({
            [filterFields.YEAR]: 2020,
        })

        this.props.educationalPlanActions.getEducationalPlans();
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {educationalProgram} = this.state;

        if (educationalProgram[EducationProgramCharacteristicFields.ID]){
            const data = {
                ...educationalProgram,
                [EducationProgramFields.ACADEMIC_PLAN_FOR_EP]: educationalProgram[EducationProgramFields.ACADEMIC_PLAN_FOR_EP].map((item: any) => item.value)
            }
            this.props.actions.changeEducationalProgram(data);
        } else {
            const data = {
                ...educationalProgram,
                [EducationProgramFields.ACADEMIC_PLAN_FOR_EP]: educationalProgram[EducationProgramFields.ACADEMIC_PLAN_FOR_EP].map((item: any) => item.value)
            }
            this.props.actions.createEducationalProgram(data);
        }
    }

    deleteItem = (value: ReactText) => {
        const {educationalProgram} = this.state;

        this.setState({
            educationalProgram: {
                ...educationalProgram,
                [EducationProgramFields.ACADEMIC_PLAN_FOR_EP]: educationalProgram[EducationProgramFields.ACADEMIC_PLAN_FOR_EP].filter((item: any) => item.value !== value)
            },
        })
    }

    handleChangePlan = (value: ReactText, label: string) => {
        const {educationalProgram} = this.state;

        this.setState({
            educationalProgram: {
                ...educationalProgram,
                [EducationProgramFields.ACADEMIC_PLAN_FOR_EP]: [
                    ...educationalProgram[EducationProgramFields.ACADEMIC_PLAN_FOR_EP] ?? [],
                    {
                        value,
                        label,
                    }
                ]
            },
        })
    }

    handleChangeUser = (value: ReactText) => {
        const {educationalProgram} = this.state;

        this.setState({
            educationalProgram: {
                ...educationalProgram,
                [EducationProgramFields.MANAGER]: value
            },
        })
    }

    handleChangeYear = (value: Moment) => {
        this.props.educationPlanInDirectionActions.changeFiltering({
            [filterFields.YEAR]: value.format(YEAR_DATE_FORMAT),
        })

        const {educationalProgram} = this.state;

        this.setState({
            educationalProgram: {
                ...educationalProgram,
                [EducationProgramFields.YEAR]: value.format(YEAR_DATE_FORMAT)
            },
        })
        this.props.educationPlanInDirectionActions.getEducationalPlansInDirection();
    }

    changeQualification = (value: string) => {
        const {educationalProgram} = this.state;

        this.props.educationPlanInDirectionActions.changeFiltering({
            [filterFields.QUALIFICATION]: value,
        })

        this.setState({
            educationalProgram: {
                ...educationalProgram,
                [EducationProgramFields.QUALIFICATION]: value
            },
        })
        this.props.educationPlanInDirectionActions.getEducationalPlansInDirection();
    }

    render() {
        const {isOpen, classes} = this.props;
        const {educationalProgram} = this.state;

        const disableButton =
            // get(educationalProgram, [EducationProgramFields.YEAR, 'length']) === 0
            !(get(educationalProgram, [EducationProgramFields.ACADEMIC_PLAN_FOR_EP, 'length'], 0))
            // || get(educationalProgram, [EducationProgramFields.QUALIFICATION, 'length']) === 0
        ;

        const disableSelector = !get(educationalProgram, [EducationProgramFields.YEAR]) || get(educationalProgram, [EducationProgramFields.QUALIFICATION, 'length']) === 0
        const isEditMode = Boolean(educationalProgram[EducationProgramFields.ID]);

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle> {isEditMode ? 'Редактирование' : 'Создание'} общей характеристики образовательной программы</DialogTitle>
                <DialogContent>
                    <DatePickerComponent label="Год *"
                                         views={["year"]}
                                         value={educationalProgram[EducationProgramFields.YEAR]}
                                         onChange={this.handleChangeYear}
                                         format={YEAR_DATE_FORMAT}
                    />
                    <QualificationSelector onChange={this.changeQualification}
                                           value={educationalProgram[EducationProgramFields.QUALIFICATION]}
                    />
                    <EducationPlanInDirectionSelector handleChange={this.handleChangePlan} disabled={disableSelector} value={undefined} />

                    {Boolean(educationalProgram[EducationProgramFields.ACADEMIC_PLAN_FOR_EP]?.length) &&
                      <div style={{marginBottom: 10, marginTop: '-20px'}}>
                          {educationalProgram[EducationProgramFields.ACADEMIC_PLAN_FOR_EP].map(({label, value}) =>
                            <Chip label={label} onDelete={() => this.deleteItem(value)}
                                  style={{marginRight: 10, marginBottom: 10}}/>
                          )}
                      </div>
                    }

                    <UserSelector handleChange={this.handleChangeUser} selectorLabel="Руководитель *" disabled={disableSelector}/>
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
