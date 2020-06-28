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

import SearchSelector from '../../../../components/SearchSelector';

import {EvaluationToolFields, fields, ResultsFields} from '../../enum';
import {TrainingEntitiesFields} from "../../../TrainingEntities/enum";

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';
import {SubjectAreaFields} from "../../../SubjectArea/enum";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import {Link} from "react-router-dom";
import {appRouter} from "../../../../service/router-service";
import Typography from "@material-ui/core/Typography";

class CreateModal extends React.PureComponent<CreateModalProps> {
    state = {
        result: {
            [ResultsFields.ID]: null,
            [ResultsFields.MASTER_LEVEL]: '1',
            [ResultsFields.EVALUATION_TOOLS]: [],
            [ResultsFields.ITEM]: {
                [TrainingEntitiesFields.ID]: ''
            },
        }
    };

    componentDidMount() {
        this.props.actions.getWorkProgramEvaluationTools();
        this.props.subjectAreaActions.getSubjectArea();
    }

    componentDidUpdate(prevProps: Readonly<CreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {result} = this.props;

        if (!shallowEqual(result, prevProps.result)){
            const subjectAreaId = get(result, [ResultsFields.ITEM, TrainingEntitiesFields.SUBJECT_AREA, SubjectAreaFields.ID], null);

            this.props.trainingEntitiesActions.changeSubjectId(subjectAreaId);
            this.props.trainingEntitiesActions.getTrainingEntities();

            this.setState({
                result: {
                    [ResultsFields.MASTER_LEVEL]: get(result, ResultsFields.MASTER_LEVEL, ''),
                    [ResultsFields.ITEM]: get(result, ResultsFields.ITEM, {}),
                    [ResultsFields.ID]: get(result, ResultsFields.ID, null),
                    // @ts-ignore
                    [ResultsFields.EVALUATION_TOOLS]: get(result, ResultsFields.EVALUATION_TOOLS, []).map(item => item[EvaluationToolFields.ID]),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog(fields.ADD_NEW_RESULT);
    }

    handleSave = () => {
        const {result} = this.state;

        if (result[ResultsFields.ID]){
            this.props.actions.changeResult(this.state.result);
        } else {
            this.props.actions.addResult(this.state.result);
        }
    }

    changeMasterLevelField = (e: React.ChangeEvent) => {
        const {result} = this.state;

        this.setState({
            result: {
                ...result,
                [ResultsFields.MASTER_LEVEL]: get(e, 'target.value')
            }
        })
    }

    saveTrainingEntityField = (value: ReactText) => {
        const {result} = this.state;

        this.setState({
            result: {
                ...result,
                [ResultsFields.ITEM]: {
                    ...result[ResultsFields.ITEM],
                    [TrainingEntitiesFields.ID]: value
                }
            }
        })
    }

    changeSubjectAreaField = (value: ReactText) => {
        const {result} = this.state;

        this.props.trainingEntitiesActions.changeSubjectId(value);
        this.props.trainingEntitiesActions.getTrainingEntities();

        this.setState({
            result: {
                ...result,
                [ResultsFields.ITEM]: {
                    ...result[ResultsFields.ITEM],
                    [TrainingEntitiesFields.SUBJECT_AREA]: {
                        [SubjectAreaFields.ID]: value
                    }
                }
            }
        })
    }

    changeEvaluationTools = (e: React.ChangeEvent) => {
        const {result} = this.state;

        this.setState({
            result: {
                ...result,
                [ResultsFields.EVALUATION_TOOLS]: get(e, 'target.value')
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
        const {isOpen, classes, trainingEntities, subjectArea, evaluationTools} = this.props;
        const {result} = this.state;

        const disableButton = get(result, [ResultsFields.ITEM, TrainingEntitiesFields.ID], '').length === 0;

        const isEditMode = Boolean(ResultsFields.ID);

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} результат </DialogTitle>
                <DialogContent>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Уровень *</FormLabel>
                        <RadioGroup className={classes.radioGroup}
                                    onChange={this.changeMasterLevelField}
                                    value={result[ResultsFields.ITEM]}
                        >
                            <FormControlLabel value="1" control={<Radio checked={result[ResultsFields.MASTER_LEVEL] === '1'} />} label="Низкий" />
                            <FormControlLabel value="2" control={<Radio checked={result[ResultsFields.MASTER_LEVEL] === '2'} />} label="Средний" />
                            <FormControlLabel value="3" control={<Radio checked={result[ResultsFields.MASTER_LEVEL] === '3'} />} label="Высокий" />
                        </RadioGroup>
                    </FormControl>

                    <SearchSelector label="Предметная область *"
                                            changeSearchText={this.handleChangeSubjectAreaSearch}
                                            list={subjectArea}
                                            changeItem={this.changeSubjectAreaField}
                                            value={get(result, [ResultsFields.ITEM, TrainingEntitiesFields.SUBJECT_AREA, SubjectAreaFields.ID], '')}
                                            valueLabel={get(result, [ResultsFields.ITEM, TrainingEntitiesFields.SUBJECT_AREA, SubjectAreaFields.TITLE], '')}
                                            className={classes.marginBottom30}
                    />

                    <SearchSelector label="Учебная сущность *"
                                            changeSearchText={this.handleChangeTrainingEntitySearchText}
                                            list={trainingEntities}
                                            changeItem={this.saveTrainingEntityField}
                                            value={get(result, [ResultsFields.ITEM, TrainingEntitiesFields.ID], '')}
                                            valueLabel={get(result, [ResultsFields.ITEM, TrainingEntitiesFields.TITLE], '')}
                                            disabled={get(result, [ResultsFields.ITEM, TrainingEntitiesFields.SUBJECT_AREA, SubjectAreaFields.ID], '') === ''}
                    />

                    <FormControl className={classes.evaluationToolSelector}>
                        <InputLabel shrink id="section-label">
                            Оценочное средство
                        </InputLabel>
                        <Select
                            variant="outlined"
                            className={classes.selector}
                            multiple
                            // @ts-ignore
                            onChange={this.changeEvaluationTools}
                            value={result[ResultsFields.EVALUATION_TOOLS]}
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
                            {evaluationTools.map(item =>
                                <MenuItem value={item.value} key={`group-${item.value}`}>
                                    {item.label}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Link to={appRouter.getTrainingEntitiesRoute()}
                          className={classes.link}
                          target="_blank"
                    >
                        <Typography>
                            Создать учебную сущность
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

export default connect(withStyles(styles)(CreateModal));
