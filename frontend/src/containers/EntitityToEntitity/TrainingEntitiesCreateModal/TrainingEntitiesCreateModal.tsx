import React, {ReactText} from 'react';
import {shallowEqual} from "recompose";
import get from "lodash/get";

import {TrainingEntitiesCreateModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import withStyles from '@mui/material/styles/withStyles';

import SearchSelector from "../../../components/SearchSelector/SearchSelector";
import {SubjectAreaFields} from "../../SubjectArea/enum";
import {EntityToEntityFields} from '../enum';
import {TrainingEntitiesFields} from "../../TrainingEntities/enum";
import {relations} from '../constants';

import connect from './TrainingEntitiesCreateModal.connect';
import styles from './TrainingEntitiesCreateModal.styles';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

class TrainingEntitiesCreateModal extends React.PureComponent<TrainingEntitiesCreateModalProps> {
    state = {
        trainingEntity: {
            [EntityToEntityFields.ID]: null,
            [EntityToEntityFields.ITEM1]: null,
            [EntityToEntityFields.ITEM2]: null,
            [EntityToEntityFields.RELATION]: null,
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
                    [EntityToEntityFields.ITEM1]: get(trainingEntity, EntityToEntityFields.ITEM1, {}),
                    [EntityToEntityFields.ITEM2]: get(trainingEntity, EntityToEntityFields.ITEM2, {}),
                    [EntityToEntityFields.RELATION]: get(trainingEntity, EntityToEntityFields.RELATION, ''),
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

    handleChangeEntitiesSearchText = (searchText: string) => {
        this.props.trainingEntitiesActions.changeSearchQuery(searchText);
        this.props.trainingEntitiesActions.getTrainingEntities();
    }

    saveEntity = (field: string) => (value: ReactText) => {
        const {trainingEntity} = this.state;

        this.setState({
            trainingEntity: {
                ...trainingEntity,
                [field]: {
                    [TrainingEntitiesFields.ID]: value
                }
            }
        })
    }

    render() {
        const {isOpen, classes, trainingEntitiesList} = this.props;
        const {trainingEntity} = this.state;

        const disableButton = !get(trainingEntity, [EntityToEntityFields.ITEM1, SubjectAreaFields.ID], null) ||
            !get(trainingEntity, [EntityToEntityFields.ITEM2, SubjectAreaFields.ID], null) ||
            !get(trainingEntity, [EntityToEntityFields.RELATION], null);

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
                                    changeSearchText={this.handleChangeEntitiesSearchText}
                                    list={trainingEntitiesList}
                                    changeItem={this.saveEntity(EntityToEntityFields.ITEM1)}
                                    value={get(trainingEntity, [EntityToEntityFields.ITEM1, SubjectAreaFields.ID], '')}
                                    valueLabel={get(trainingEntity, [EntityToEntityFields.ITEM1, SubjectAreaFields.TITLE], '')}
                                    className={classes.marginBottom30}
                    />
                    <FormControl className={classes.wrapSelector}>
                        <InputLabel shrink id="section-label">
                            Связь *
                        </InputLabel>
                        <Select
                            variant="outlined"
                            className={classes.selector}
                            // @ts-ignore
                            onChange={this.saveField(EntityToEntityFields.RELATION)}
                            value={trainingEntity[EntityToEntityFields.RELATION]}
                            fullWidth
                            displayEmpty
                            input={
                                <OutlinedInput
                                    notched
                                    labelWidth={100}
                                    name="course"
                                    id="section-label"
                                />
                            }
                        >
                            {Object.keys(relations).map((key: any) =>
                                <MenuItem value={key} key={`type-${key}`}>
                                    {relations[key]}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <SearchSelector label="Учебная сущность 2 * "
                                    changeSearchText={this.handleChangeEntitiesSearchText}
                                    list={trainingEntitiesList}
                                    changeItem={this.saveEntity(EntityToEntityFields.ITEM2)}
                                    value={get(trainingEntity, [EntityToEntityFields.ITEM1, SubjectAreaFields.ID], '')}
                                    valueLabel={get(trainingEntity, [EntityToEntityFields.ITEM1, SubjectAreaFields.TITLE], '')}
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

export default connect(withStyles(styles)(TrainingEntitiesCreateModal));
