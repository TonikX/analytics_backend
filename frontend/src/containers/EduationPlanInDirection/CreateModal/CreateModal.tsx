import React, {ReactText} from 'react';
import {shallowEqual} from "recompose";
import get from "lodash/get";
import moment, {Moment} from "moment";

import {CreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import {IconButton} from "@material-ui/core";
import DateIcon from "@material-ui/icons/DateRange";
import {DatePicker} from "@material-ui/pickers";

import SearchSelector from "../../../components/SearchSelector/SearchSelector";

import {EducationPlanInDirectionFields} from '../enum';
import {EducationalPlanFields} from "../../EducationalPlan/enum";
import {DirectionFields} from "../../Direction/enum";

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';
import {YEAR_DATE_FORMAT} from "../../../common/utils";

class CreateModal extends React.PureComponent<CreateModalProps> {
    state = {
        educationalPlansInDirection: {
            [EducationPlanInDirectionFields.ID]: null,
            [EducationPlanInDirectionFields.YEAR]: '2020',
            [EducationPlanInDirectionFields.EDUCATION_PLAN]: {
                [EducationalPlanFields.ID]: '',
                [EducationalPlanFields.PROFILE]: '',
            },
            [EducationPlanInDirectionFields.DIRECTION]: {
                [DirectionFields.ID]: '',
                [DirectionFields.TITLE]: '',
            },
        },
    };

    componentDidUpdate(prevProps: Readonly<CreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {educationalPlansInDirection} = this.props;

        if (!shallowEqual(educationalPlansInDirection, prevProps.educationalPlansInDirection)){
            this.setState({
                educationalPlansInDirection: {
                    [EducationPlanInDirectionFields.ID]: get(educationalPlansInDirection, EducationPlanInDirectionFields.ID),
                    [EducationPlanInDirectionFields.YEAR]: get(educationalPlansInDirection, EducationPlanInDirectionFields.YEAR, '2020'),
                    [EducationPlanInDirectionFields.EDUCATION_PLAN]: get(educationalPlansInDirection, EducationPlanInDirectionFields.EDUCATION_PLAN, {
                        [EducationalPlanFields.ID]: '',
                        [EducationalPlanFields.PROFILE]: '',
                    }),
                    [EducationPlanInDirectionFields.DIRECTION]: get(educationalPlansInDirection, EducationPlanInDirectionFields.DIRECTION, {
                        [DirectionFields.ID]: '',
                        [DirectionFields.TITLE]: '',
                    }),
                }
            });
        }
    }

    componentDidMount() {
        this.props.directionActions.getDirections();
        this.props.educationalPlanActions.getEducationalPlans();
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {educationalPlansInDirection} = this.state;

        if (educationalPlansInDirection[EducationPlanInDirectionFields.ID]){
            this.props.actions.changeEducationalPlanInDirection(educationalPlansInDirection);
        } else {
            this.props.actions.createNewEducationalPlanInDirection(educationalPlansInDirection);
        }
    }

    saveYear = (date: Moment) => {
        const {educationalPlansInDirection} = this.state;

        this.setState({
            educationalPlansInDirection: {
                ...educationalPlansInDirection,
                [EducationPlanInDirectionFields.YEAR]: date.format('YYYY')
            }
        })
    }

    handleChangeEducationPlanSearchText = (searchText: string) => {
        this.props.educationalPlanActions.changeSearchQuery(searchText);
        this.props.educationalPlanActions.getEducationalPlans();
    }

    handleChangeDirectionSearchText = (searchText: string) => {
        this.props.directionActions.changeSearchQuery(searchText);
        this.props.directionActions.getDirections();
    }

    saveDirectionField = (value: ReactText) => {
        const {educationalPlansInDirection} = this.state;

        this.setState({
            educationalPlansInDirection: {
                ...educationalPlansInDirection,
                [EducationPlanInDirectionFields.DIRECTION]: {
                    [DirectionFields.ID]: value,
                }
            }
        })
    }

    saveEducationalPlanField = (value: ReactText) => {
        const {educationalPlansInDirection} = this.state;

        this.setState({
            educationalPlansInDirection: {
                ...educationalPlansInDirection,
                [EducationPlanInDirectionFields.EDUCATION_PLAN]: {
                    [EducationalPlanFields.ID]: value,
                }
            }
        })
    }

    render() {
        const {isOpen, classes, educationalPlanList, directionList} = this.props;
        const {educationalPlansInDirection} = this.state;

        const disableButton = get(educationalPlansInDirection, [EducationPlanInDirectionFields.YEAR, 'length']) === 0
            || !Boolean(get(educationalPlansInDirection, [EducationPlanInDirectionFields.DIRECTION, DirectionFields.ID]))
            || !Boolean(get(educationalPlansInDirection, [EducationPlanInDirectionFields.EDUCATION_PLAN, EducationalPlanFields.ID]))
        ;

        const isEditMode = Boolean(educationalPlansInDirection[EducationPlanInDirectionFields.ID]);

        const date = get(educationalPlansInDirection, [EducationPlanInDirectionFields.YEAR], '2020').toString();

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} учебный план в направлении</DialogTitle>
                <DialogContent>
                    <SearchSelector label="Учебный план * "
                                            changeSearchText={this.handleChangeEducationPlanSearchText}
                                            list={educationalPlanList}
                                            changeItem={this.saveEducationalPlanField}
                                            className={classes.marginBottom30}
                                            value={get(educationalPlansInDirection, [EducationPlanInDirectionFields.EDUCATION_PLAN, EducationalPlanFields.ID], '')}
                                            valueLabel={get(educationalPlansInDirection, [EducationPlanInDirectionFields.EDUCATION_PLAN, EducationalPlanFields.PROFILE], '')}
                    />

                    <SearchSelector label="Направление * "
                                            changeSearchText={this.handleChangeDirectionSearchText}
                                            list={directionList}
                                            changeItem={this.saveDirectionField}
                                            className={classes.marginBottom30}
                                            value={get(educationalPlansInDirection, [EducationPlanInDirectionFields.DIRECTION, DirectionFields.ID], '')}
                                            valueLabel={get(educationalPlansInDirection, [EducationPlanInDirectionFields.DIRECTION, DirectionFields.TITLE], '')}
                    />

                    <DatePicker
                        value={moment(date).format('YYYY')}
                        onChange={(date: any) => this.saveYear(date)}
                        InputProps={{
                            endAdornment: (
                                <IconButton>
                                    <DateIcon />
                                </IconButton>
                            ),
                        }}
                        inputVariant="outlined"
                        className={classes.datePicker}
                        format={YEAR_DATE_FORMAT}
                        views={["year"]}
                        label={'Год реализации'}
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

export default connect(withStyles(styles)(CreateModal));
