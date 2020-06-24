import React, {ReactText} from 'react';
import {shallowEqual} from "recompose";
import get from "lodash/get";

import {TrainingEntitiesCreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import withStyles from '@material-ui/core/styles/withStyles';

import SearchSelector from "../../../components/SearchSelector/SearchSelector";
import {SubjectAreaFields} from "../../SubjectArea/enum";
import {TrainingEntitiesFields} from '../enum';

import connect from './TrainingEntitiesCreateModal.connect';
import styles from './TrainingEntitiesCreateModal.styles';
import {Link} from "react-router-dom";
import {appRouter} from "../../../service/router-service";
import Typography from "@material-ui/core/Typography";


class TrainingEntitiesCreateModal extends React.PureComponent<TrainingEntitiesCreateModalProps> {
    state = {
        trainingEntity: {
            [TrainingEntitiesFields.ID]: null,
            [TrainingEntitiesFields.TITLE]: '',
            [TrainingEntitiesFields.SUBJECT_AREA]: '',
        },
    };

    componentDidMount() {
        this.props.subjectAreaActions.getSubjectArea();
    }

    componentDidUpdate(prevProps: Readonly<TrainingEntitiesCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {trainingEntity} = this.props;

        if (!shallowEqual(trainingEntity, prevProps.trainingEntity)){
            this.setState({
                trainingEntity: {
                    [TrainingEntitiesFields.ID]: get(trainingEntity, TrainingEntitiesFields.ID),
                    [TrainingEntitiesFields.TITLE]: get(trainingEntity, TrainingEntitiesFields.TITLE, ''),
                    [TrainingEntitiesFields.SUBJECT_AREA]: get(trainingEntity, TrainingEntitiesFields.SUBJECT_AREA, {}),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {trainingEntity} = this.state;

        if (trainingEntity[TrainingEntitiesFields.ID]){
            this.props.actions.changeTrainingEntities(trainingEntity);
        } else {
            this.props.actions.createNewTrainingEntities(trainingEntity);
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
        this.props.subjectAreaActions.changeSearchQuery(searchText);
        this.props.subjectAreaActions.getSubjectArea();
    }

    saveSubjectAreaField = (value: ReactText) => {
        const {trainingEntity} = this.state;

        this.setState({
            trainingEntity: {
                ...trainingEntity,
                [TrainingEntitiesFields.SUBJECT_AREA]: {
                    [SubjectAreaFields.ID]: value
                }
            }
        })
    }

    render() {
        const {isOpen, classes, subjectAreaList} = this.props;
        const {trainingEntity} = this.state;

        const disableButton = trainingEntity[TrainingEntitiesFields.TITLE].length === 0;

        const isEditMode = trainingEntity[TrainingEntitiesFields.ID];

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} учебную сущность </DialogTitle>
                <DialogContent>
                    <TextField label="Название *"
                               onChange={this.saveField(TrainingEntitiesFields.TITLE)}
                               variant="outlined"
                               className={classes.input}
                               fullWidth
                               value={trainingEntity[TrainingEntitiesFields.TITLE]}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <SearchSelector label="Предметная область * "
                                            changeSearchText={this.handleChangeSubjectAreaSearchText}
                                            list={subjectAreaList}
                                            changeItem={this.saveSubjectAreaField}
                                            value={get(trainingEntity, [TrainingEntitiesFields.SUBJECT_AREA, SubjectAreaFields.ID], '')}
                                            valueLabel={get(trainingEntity, [TrainingEntitiesFields.SUBJECT_AREA, SubjectAreaFields.TITLE], '')}
                    />
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Link to={appRouter.getSubjectAreaRoute()}
                          className={classes.link}
                          target="_blank"
                    >
                        <Typography>
                            Создать предметную область
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
