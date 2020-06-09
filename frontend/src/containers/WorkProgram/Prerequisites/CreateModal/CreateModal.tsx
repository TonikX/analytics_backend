import React, {ReactText} from 'react';
import get from "lodash/get";
import {shallowEqual} from "recompose";

import {CreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from '@material-ui/core/styles/withStyles';

import MultipleSearchSelector from '../../../../components/MultipleSearchSelector';

import {fields, PrerequisiteFields} from '../../enum';
import {TrainingEntitiesFields} from "../../../TrainingEntities/enum";

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';
import {SubjectAreaFields} from "../../../SubjectArea/enum";

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
        this.props.subjectAreaActions.getSubjectArea();
    }

    componentDidUpdate(prevProps: Readonly<CreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {prerequisite} = this.props;

        if (!shallowEqual(prerequisite, prevProps.prerequisite)){
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
        const {prerequisite} = this.state;

        if (prerequisite[PrerequisiteFields.ID]){
            this.props.actions.changePrerequisite(this.state.prerequisite);
        } else {
            this.props.actions.addPrerequisite(this.state.prerequisite);
        }
    }

    changeMasterLevelField = (e: React.ChangeEvent) => {
        const {prerequisite} = this.state;

        this.setState({
            prerequisite: {
                ...prerequisite,
                [PrerequisiteFields.MASTER_LEVEL]: get(e, 'target.value')
            }
        })
    }

    saveTrainingEntityField = (value: ReactText) => {
        const {prerequisite} = this.state;

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
        const {prerequisite} = this.state;

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
        const {isOpen, classes, trainingEntities, subjectArea} = this.props;
        const {prerequisite} = this.state;

        const disableButton = get(prerequisite, [PrerequisiteFields.ITEM, TrainingEntitiesFields.ID], '').length === 0;
        console.log('prerequisite', prerequisite);
        console.log('trainingEntities', trainingEntities);
        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> Добавить пререквизит </DialogTitle>
                <DialogContent>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Уровень *</FormLabel>
                        <RadioGroup className={classes.radioGroup}
                                    onChange={this.changeMasterLevelField}
                                    value={prerequisite[PrerequisiteFields.ITEM]}
                        >
                            <FormControlLabel value="1" control={<Radio checked={prerequisite[PrerequisiteFields.MASTER_LEVEL] === '1'} />} label="Низкий" />
                            <FormControlLabel value="2" control={<Radio checked={prerequisite[PrerequisiteFields.MASTER_LEVEL] === '2'} />} label="Средний" />
                            <FormControlLabel value="3" control={<Radio checked={prerequisite[PrerequisiteFields.MASTER_LEVEL] === '3'} />} label="Высокий" />
                        </RadioGroup>
                    </FormControl>

                    <MultipleSearchSelector label="Предметная область"
                                            changeSearchText={this.handleChangeSubjectAreaSearch}
                                            list={subjectArea}
                                            changeItem={this.changeSubjectAreaField}
                                            value={get(prerequisite, [PrerequisiteFields.ITEM, TrainingEntitiesFields.SUBJECT_AREA, SubjectAreaFields.ID], '')}
                                            valueLabel={get(prerequisite, [PrerequisiteFields.ITEM, TrainingEntitiesFields.SUBJECT_AREA, SubjectAreaFields.TITLE], '')}
                                            className={classes.marginBottom30}
                    />

                    <MultipleSearchSelector label="Учебная сущность *"
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

export default connect(withStyles(styles)(CreateModal));
