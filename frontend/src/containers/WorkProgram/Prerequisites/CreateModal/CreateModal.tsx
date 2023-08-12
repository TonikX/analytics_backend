import React, { ReactText } from 'react';
import get from "lodash/get";
import { shallowEqualObjects } from "shallow-equal";

import { CreateModalProps } from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";
import { withStyles } from '@mui/styles';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import SearchSelector from '../../../../components/SearchSelector';

import { fields, PrerequisiteFields } from '../../enum';
import { TrainingEntitiesFields } from "../../../TrainingEntities/enum";

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';
import { SubjectAreaFields } from "../../../SubjectArea/enum";
import { Link } from "react-router-dom";
import { appRouter } from "../../../../service/router-service";
import Typography from "@mui/material/Typography";

class CreateModal extends React.PureComponent<CreateModalProps> {
    state = {
        prerequisite: {
            [PrerequisiteFields.ID]: null,
            [PrerequisiteFields.MASTER_LEVEL]: '1',
            [PrerequisiteFields.ITEM]: {
                [TrainingEntitiesFields.ID]: ''
            },
        }
    };

    componentDidMount() {
        // this.props.subjectAreaActions.getSubjectArea();

        this.props.trainingEntitiesActions.getTrainingEntities();
    }

    componentDidUpdate(prevProps: Readonly<CreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const { prerequisite } = this.props;

        if (!shallowEqualObjects(prerequisite, prevProps.prerequisite)) {
            const subjectAreaId = get(prerequisite, [PrerequisiteFields.ITEM, TrainingEntitiesFields.SUBJECT_AREA, SubjectAreaFields.ID], null);

            this.props.trainingEntitiesActions.changeSubjectId(subjectAreaId);
            this.props.trainingEntitiesActions.getTrainingEntities();

            this.setState({
                prerequisite: {
                    [PrerequisiteFields.MASTER_LEVEL]: get(prerequisite, PrerequisiteFields.MASTER_LEVEL, ''),
                    [PrerequisiteFields.ITEM]: get(prerequisite, PrerequisiteFields.ITEM, {}),
                    [PrerequisiteFields.ID]: get(prerequisite, PrerequisiteFields.ID, null),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog(fields.ADD_NEW_PREREQUISITES);
    }

    handleSave = () => {
        const { prerequisite } = this.state;

        if (prerequisite[PrerequisiteFields.ID]) {
            this.props.actions.changePrerequisite(this.state.prerequisite);
        } else {
            this.props.actions.addPrerequisite(this.state.prerequisite);
        }
    }

    changeMasterLevelField = (e: React.ChangeEvent) => {
        const { prerequisite } = this.state;

        this.setState({
            prerequisite: {
                ...prerequisite,
                [PrerequisiteFields.MASTER_LEVEL]: get(e, 'target.value')
            }
        })
    }

    saveTrainingEntityField = (value: ReactText) => {
        const { prerequisite } = this.state;

        this.setState({
            prerequisite: {
                ...prerequisite,
                [PrerequisiteFields.ITEM]: {
                    ...prerequisite[PrerequisiteFields.ITEM],
                    [TrainingEntitiesFields.ID]: value
                }
            }
        })
    }

    changeSubjectAreaField = (value: ReactText) => {
        const { prerequisite } = this.state;

        this.props.trainingEntitiesActions.changeSubjectId(value);
        this.props.trainingEntitiesActions.getTrainingEntities();

        this.setState({
            prerequisite: {
                ...prerequisite,
                [PrerequisiteFields.ITEM]: {
                    ...prerequisite[PrerequisiteFields.ITEM],
                    [TrainingEntitiesFields.SUBJECT_AREA]: {
                        [SubjectAreaFields.ID]: value
                    }
                }
            }
        })
    }

    handleChangeTrainingEntitySearchText = (searchText: string) => {
        this.props.trainingEntitiesActions.changeSearchQuery(searchText);
        this.props.trainingEntitiesActions.getTrainingEntities();
    }

    handleChangeSubjectAreaSearch = (searchText: string) => {
        this.props.subjectAreaActions.changeSearchQuery(searchText);
        this.props.subjectAreaActions.getSubjectArea();
    }

    render() {
        const { isOpen, classes, trainingEntities, subjectArea } = this.props;
        const { prerequisite } = this.state;

        const disableButton = get(prerequisite, [PrerequisiteFields.ITEM, TrainingEntitiesFields.ID], '').length === 0;

        const isEditMode = Boolean(get(prerequisite, PrerequisiteFields.ID));

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle>
                    <div className={classes.dialogTitle}>
                        {isEditMode ? 'Редактировать' : 'Создать'} пререквизит
                        <Tooltip
                            title={
                                <span style={{ fontSize: '13px' }}>
                                    Пререквезит - объект, отражающий конкретное знание из конкретной области
                                    (далее "учебная сущность"), которое должно быть у студента перед началом изучения курса.
                                    <br /><br />Для добавления необходимо выбрать предметную область и учебную сущность в ней.
                                </span>
                            }
                        >
                            <HelpOutlineIcon color="primary" style={{ marginLeft: '10px', paddingTop: '4px' }} />
                        </Tooltip>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Уровень освоения *</FormLabel>
                        <RadioGroup className={classes.radioGroup}
                            onChange={this.changeMasterLevelField}
                            value={prerequisite[PrerequisiteFields.ITEM]}
                        >
                            <FormControlLabel value="1" control={<Radio checked={prerequisite[PrerequisiteFields.MASTER_LEVEL] === '1'} />} label="Начальный" />
                            <FormControlLabel value="2" control={<Radio checked={prerequisite[PrerequisiteFields.MASTER_LEVEL] === '2'} />} label="Средний" />
                            <FormControlLabel value="3" control={<Radio checked={prerequisite[PrerequisiteFields.MASTER_LEVEL] === '3'} />} label="Высокий" />
                        </RadioGroup>
                    </FormControl>

                    {/*<SearchSelector label="Предметная область *"*/}
                    {/*                        changeSearchText={this.handleChangeSubjectAreaSearch}*/}
                    {/*                        list={subjectArea}*/}
                    {/*                        changeItem={this.changeSubjectAreaField}*/}
                    {/*                        value={get(prerequisite, [PrerequisiteFields.ITEM, TrainingEntitiesFields.SUBJECT_AREA, SubjectAreaFields.ID], '')}*/}
                    {/*                        valueLabel={get(prerequisite, [PrerequisiteFields.ITEM, TrainingEntitiesFields.SUBJECT_AREA, SubjectAreaFields.TITLE], '')}*/}
                    {/*                        className={classes.marginBottom30}*/}
                    {/*/>*/}

                    <SearchSelector label="Учебная сущность *"
                        changeSearchText={this.handleChangeTrainingEntitySearchText}
                        list={trainingEntities}
                        changeItem={this.saveTrainingEntityField}
                        value={get(prerequisite, [PrerequisiteFields.ITEM, TrainingEntitiesFields.ID], '')}
                        valueLabel={get(prerequisite, [PrerequisiteFields.ITEM, TrainingEntitiesFields.TITLE], '')}
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
