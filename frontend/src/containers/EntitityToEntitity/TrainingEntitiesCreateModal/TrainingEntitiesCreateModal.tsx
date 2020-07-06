import React, {ReactText} from 'react';
import {shallowEqual} from "recompose";
import get from "lodash/get";

import {TrainingEntitiesCreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import SearchSelector from "../../../components/SearchSelector/SearchSelector";
import {SubjectAreaFields} from "../../SubjectArea/enum";
import {EntityToEntityFields} from '../enum';

import connect from './TrainingEntitiesCreateModal.connect';
import styles from './TrainingEntitiesCreateModal.styles';
import {Link} from "react-router-dom";
import {appRouter} from "../../../service/router-service";
import Typography from "@material-ui/core/Typography";


class TrainingEntitiesCreateModal extends React.PureComponent<TrainingEntitiesCreateModalProps> {
    state = {
        trainingEntity: {
            [EntityToEntityFields.ID]: null,
            [EntityToEntityFields.TITLE]: '',
            [EntityToEntityFields.SUBJECT_AREA]: '',
        },
    };

    componentDidMount() {
        this.props.trainingEntitiesActions.getTrainingEntities();
    }

    componentDidUpdate(prevProps: Readonly<TrainingEntitiesCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {trainingEntity} = this.props;

        if (!shallowEqual(trainingEntity, prevProps.trainingEntity)){
            this.setState({
                trainingEntity: {
                    [EntityToEntityFields.ID]: get(trainingEntity, EntityToEntityFields.ID),
                    [EntityToEntityFields.TITLE]: get(trainingEntity, EntityToEntityFields.TITLE, ''),
                    [EntityToEntityFields.SUBJECT_AREA]: get(trainingEntity, EntityToEntityFields.SUBJECT_AREA, {}),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {trainingEntity} = this.state;

        if (trainingEntity[EntityToEntityFields.ID]){
            this.props.actions.changeEntityToEntity(trainingEntity);
        } else {
            this.props.actions.createNewEntityToEntity(trainingEntity);
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {trainingEntity} = this.state;

        this.setState({
            trainingEntity: {
                ...trainingEntity,
                [field]: get(e, 'target.value')
            }
        })
    }

    handleChangeSubjectAreaSearchText = (searchText: string) => {
        this.props.trainingEntitiesActions.changeSearchQuery(searchText);
        this.props.trainingEntitiesActions.getTrainingEntities();
    }

    saveSubjectAreaField = (value: ReactText) => {
        const {trainingEntity} = this.state;

        this.setState({
            trainingEntity: {
                ...trainingEntity,
                [EntityToEntityFields.SUBJECT_AREA]: {
                    [SubjectAreaFields.ID]: value
                }
            }
        })
    }

    render() {
        const {isOpen, classes, trainingEntitiesList} = this.props;
        const {trainingEntity} = this.state;

        const disableButton = trainingEntity[EntityToEntityFields.TITLE].length === 0;

        const isEditMode = trainingEntity[EntityToEntityFields.ID];

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} связь </DialogTitle>
                <DialogContent>
                    <SearchSelector label="Учебная сущность 1 * "
                                    changeSearchText={this.handleChangeSubjectAreaSearchText}
                                    list={trainingEntitiesList}
                                    changeItem={this.saveSubjectAreaField}
                                    value={get(trainingEntity, [EntityToEntityFields.SUBJECT_AREA, SubjectAreaFields.ID], '')}
                                    valueLabel={get(trainingEntity, [EntityToEntityFields.SUBJECT_AREA, SubjectAreaFields.TITLE], '')}
                    />
                    <SearchSelector label="Учебная сущность 2 * "
                                    changeSearchText={this.handleChangeSubjectAreaSearchText}
                                    list={trainingEntitiesList}
                                    changeItem={this.saveSubjectAreaField}
                                    value={get(trainingEntity, [EntityToEntityFields.SUBJECT_AREA, SubjectAreaFields.ID], '')}
                                    valueLabel={get(trainingEntity, [EntityToEntityFields.SUBJECT_AREA, SubjectAreaFields.TITLE], '')}
                    />
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Link to={appRouter.getSubjectAreaRoute()}
                          className={classes.link}
                          target="_blank"
                    >
                        <Typography>
                            Создать связь
                        </Typography>
                    </Link>
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

export default connect(withStyles(styles)(TrainingEntitiesCreateModal));
