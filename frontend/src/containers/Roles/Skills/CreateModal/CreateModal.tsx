import React, {ReactText} from 'react';
import {shallowEqual} from "recompose";
import get from "lodash/get";

import {RolesCreateModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

import SearchSelector from "../../../../components/SearchSelector/SearchSelector";

import {RolesFields} from '../../enum';
import {levels} from '../../constants';

import connect from './CreateModal.connect';
import styles from './CreateModal.styles';

class CreateModal extends React.PureComponent<RolesCreateModalProps> {
    state = {
        skill: {
            [RolesFields.ID]: null,
            [RolesFields.ROLE]: null,
            [RolesFields.ITEM]: {},
            [RolesFields.LEVEL]: '1',
        },
    };

    componentDidMount() {
        this.props.trainingEntitiesActions.getTrainingEntities();
    }

    componentDidUpdate(prevProps: Readonly<RolesCreateModalProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {skill} = this.props;

        if (!shallowEqual(skill, prevProps.skill)){
            this.setState({
                skill: {
                    [RolesFields.ID]: get(skill, RolesFields.ID),
                    [RolesFields.ROLE]: get(skill, RolesFields.ROLE),
                    [RolesFields.LEVEL]: get(skill, RolesFields.LEVEL, ''),
                    [RolesFields.ITEM]: get(skill, RolesFields.ITEM, {}),
                }
            });
        }
    }

    handleClose = () => {
        this.props.actions.closeDialog();
    }

    handleSave = () => {
        const {skill} = this.state;

        if (skill[RolesFields.ID]){
            this.props.actions.changeSkill(skill);
        } else {
            this.props.actions.createSkill(skill);
        }
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const {skill} = this.state;

        this.setState({
            skill: {
                ...skill,
                [field]: get(e, 'target.value')
            }
        })
    }

    handleChangeTrainingEntitySearchText = (searchText: string) => {
        this.props.trainingEntitiesActions.changeSearchQuery(searchText);
        this.props.trainingEntitiesActions.getTrainingEntities();
    }

    saveTrainingEntityField = (value: ReactText) => {
        const {skill} = this.state;

        this.setState({
            skill: {
                ...skill,
                [RolesFields.ITEM]: {
                    ...skill[RolesFields.ITEM],
                    [RolesFields.ID]: value
                }
            }
        })
    }

    changeMasterLevelField = (e: React.ChangeEvent) => {
        const {skill} = this.state;

        this.setState({
            skill: {
                ...skill,
                [RolesFields.LEVEL]: get(e, 'target.value')
            }
        })
    }

    render() {
        const {isOpen, classes, trainingEntities} = this.props;
        const {skill} = this.state;

        const disableButton = !get(skill, [RolesFields.ITEM, RolesFields.ID], null) ||
            !get(skill, [RolesFields.LEVEL], null);

        const isEditMode = skill[RolesFields.ID];

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> {isEditMode ? 'Редактировать' : 'Создать'} навык </DialogTitle>
                <DialogContent>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Уровень *</FormLabel>
                        <RadioGroup className={classes.radioGroup}
                                    onChange={this.changeMasterLevelField}
                                    value={skill[RolesFields.LEVEL]}
                        >
                            {Object.keys(levels).map(key =>

                                <FormControlLabel value={key} control={<Radio checked={skill[RolesFields.LEVEL] === key} />} label={levels[key]} />
                            )}
                        </RadioGroup>
                    </FormControl>
                    <SearchSelector label="Учебная сущность *"
                                    changeSearchText={this.handleChangeTrainingEntitySearchText}
                                    list={trainingEntities}
                                    changeItem={this.saveTrainingEntityField}
                                    value={get(skill, [RolesFields.ITEM, RolesFields.ID], '')}
                                    valueLabel={get(skill, [RolesFields.ITEM, RolesFields.NAME], '')}
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
