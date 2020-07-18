import React, {ReactText} from 'react';
import {shallowEqual} from "recompose";
import get from "lodash/get";

import {TrainingEntitiesCreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import withStyles from '@material-ui/core/styles/withStyles';

import SearchSelector from "../../../components/SearchSelector/SearchSelector";
import {SubjectAreaFields} from "../../SubjectArea/enum";
import {EntityToEntityFields} from '../enum';
import {TrainingEntitiesFields} from "../../TrainingEntities/enum";
import {relations} from '../constants';

import connect from './TrainingEntitiesCreateModal.connect';
import styles from './TrainingEntitiesCreateModal.styles';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

class TrainingEntitiesCreateModal extends React.PureComponent<TrainingEntitiesCreateModalProps> {
    state = {
        trainingEntity: {
            [EntityToEntityFields.ID]: null,
            [EntityToEntityFields.ITEM1]: {},
            [EntityToEntityFields.ITEM2]: {},
            [EntityToEntityFields.RELATION]: '',
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

        const disableButton = get(trainingEntity, [EntityToEntityFields.ITEM1, SubjectAreaFields.TITLE, 'length'], 0) === 0 ||
            get(trainingEntity, [EntityToEntityFields.ITEM2, SubjectAreaFields.TITLE, 'length'], 0) === 0 ||
            get(trainingEntity, [EntityToEntityFields.RELATION, 'length'], 0) === 0;

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
                                    className={classes.marginBottom30}
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
