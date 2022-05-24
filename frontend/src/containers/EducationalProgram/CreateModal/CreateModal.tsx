import React, {ReactText} from 'react';
import get from "lodash/get";
import {Moment} from "moment";

import {CreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import DatePickerComponent from "../../../components/DatePicker";
import EducationPlanInDirectionSelector from "../../EduationPlanInDirection/EducationPlanInDirectionSelector";

import {EducationProgramCharacteristicFields} from '../enum';
import {EducationProgramFields} from "../enum";

import {YEAR_DATE_FORMAT} from "../../../common/utils";

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';
import QualificationSelector from "../../../components/QualificationSelector";
import UserSelector from "../../Profile/UserSelector";

class CreateModal extends React.PureComponent<CreateModalProps> {
    state = {
        educationalProgram: {
            [EducationProgramFields.ID]: null,
            [EducationProgramFields.YEAR]: '2020',
            [EducationProgramFields.MANAGER]: {},
            [EducationProgramFields.QUALIFICATION]: '',
            [EducationProgramFields.ACADEMIC_PLAN_FOR_EP]: {
                [EducationProgramFields.ID]: null,
            },
        },
    };

    componentDidUpdate(prevProps: Readonly<CreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {

    }

    componentDidMount() {
        this.props.directionActions.getDirections();
        this.props.educationalPlanActions.getEducationalPlans();
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {educationalProgram} = this.state;

        if (educationalProgram[EducationProgramCharacteristicFields.ID]){
            this.props.actions.changeEducationalProgram(educationalProgram);
        } else {
            this.props.actions.createEducationalProgram(educationalProgram);
        }
    }

    handleChangePlan = (value: ReactText) => {
        const {educationalProgram} = this.state;

        this.setState({
            educationalProgram: {
                ...educationalProgram,
                [EducationProgramFields.ACADEMIC_PLAN_FOR_EP]: {
                    [EducationProgramFields.ID]: value,
                },
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
        const {educationalProgram} = this.state;

        this.setState({
            educationalProgram: {
                ...educationalProgram,
                [EducationProgramFields.YEAR]: value.format(YEAR_DATE_FORMAT)
            },
        })
    }

    changeQualification = (value: string) => {
        const {educationalProgram} = this.state;

        this.setState({
            educationalProgram: {
                ...educationalProgram,
                [EducationProgramFields.QUALIFICATION]: value
            },
        })
    }

    render() {
        const {isOpen, classes} = this.props;
        const {educationalProgram} = this.state;

        const disableButton =
            // get(educationalProgram, [EducationProgramFields.YEAR, 'length']) === 0
            !Boolean(get(educationalProgram, [EducationProgramFields.ACADEMIC_PLAN_FOR_EP, EducationProgramFields.ID]))
            // || get(educationalProgram, [EducationProgramFields.QUALIFICATION, 'length']) === 0
        ;

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
                    <EducationPlanInDirectionSelector handleChange={this.handleChangePlan} />
                    <UserSelector handleChange={this.handleChangeUser} selectorLabel="Руководитель *" />
                    {/*<DatePickerComponent label="Год *"*/}
                    {/*                     views={["year"]}*/}
                    {/*                     value={educationalProgram[EducationProgramFields.YEAR]}*/}
                    {/*                     onChange={this.handleChangeYear}*/}
                    {/*                     format={YEAR_DATE_FORMAT}*/}
                    {/*/>*/}
                    {/*<QualificationSelector onChange={this.changeQualification}*/}
                    {/*                       value={educationalProgram[EducationProgramFields.QUALIFICATION]}*/}
                    {/*/>*/}
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
