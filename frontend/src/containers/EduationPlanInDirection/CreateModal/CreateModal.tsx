import React, {ReactText} from 'react';
import {shallowEqualObjects} from "shallow-equal";
import get from "lodash/get";

import {CreateModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {withStyles} from '@mui/styles';
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import SearchSelector from "../../../components/SearchSelector/SearchSelector";

import {EducationPlanInDirectionFields} from '../enum';
import {EducationalPlanFields} from "../../EducationalPlan/enum";
import {DirectionFields} from "../../Direction/enum";

import {years} from '../../WorkProgram/constants';

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';

class CreateModal extends React.PureComponent<CreateModalProps> {
    state = {
        educationalPlansInDirection: {
            [EducationPlanInDirectionFields.ID]: null,
            [EducationPlanInDirectionFields.YEAR]: '2020/2021',
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

        if (!shallowEqualObjects(educationalPlansInDirection, prevProps.educationalPlansInDirection)){
            this.setState({
                educationalPlansInDirection: {
                    [EducationPlanInDirectionFields.ID]: get(educationalPlansInDirection, EducationPlanInDirectionFields.ID),
                    [EducationPlanInDirectionFields.YEAR]: get(educationalPlansInDirection, EducationPlanInDirectionFields.YEAR, '2020/2021'),
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

    saveYear = (e: React.ChangeEvent) => {
        const {educationalPlansInDirection} = this.state;

        this.setState({
            educationalPlansInDirection: {
                ...educationalPlansInDirection,
                [EducationPlanInDirectionFields.YEAR]: get(e, 'target.value')
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

        const date = get(educationalPlansInDirection, [EducationPlanInDirectionFields.YEAR], '2020/2021').toString();

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

                    <FormControl className={classes.selectorWrap}>
                        <InputLabel shrink>
                            Год набора *
                        </InputLabel>
                        <Select
                            variant="outlined"
                            className={classes.selector}
                            // @ts-ignore
                            onChange={this.saveYear}
                            value={date}
                            fullWidth
                            displayEmpty
                            input={
                                <OutlinedInput
                                    notched
                                    name="year"
                                />
                            }
                        >
                            {years.map(item =>
                                <MenuItem value={item.value} key={`group-${item.value}`}>
                                    {item.label}
                                </MenuItem>
                            )}
                        </Select>
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

//@ts-ignore
export default connect(withStyles(styles)(CreateModal));
