import React from 'react';
import Scrollbars from "react-custom-scrollbars";

import classNames from "classnames";

import Typography from "@material-ui/core/Typography";
import withStyles from '@material-ui/core/styles/withStyles';
import Button from "@material-ui/core/Button";

import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";

import {SixthStepProps} from './types';
import {fields, PrerequisiteFields} from "../enum";
import {TrainingEntitiesFields} from "../../TrainingEntities/enum";

import CreateModal from "./CreateModal";
import RecommendationModal from "./RecommendationModal";
import {PrerequisiteType} from "../types";

import connect from './Prerequisites.connect';
import styles from './Prerequisites.styles';

class Prerequisites extends React.PureComponent<SixthStepProps> {
    handleCreateNew = () => {
        this.props.actions.openDialog({dialogType: fields.ADD_NEW_PREREQUISITES, data: {}});
    };

    getRecommendations = () => {
        this.props.actions.openDialog({dialogType: fields.GET_RECOMMENDATIONS, data: {}});
    };

    handleClickDelete = (id: number) => () => {
        this.props.actions.deletePrerequisite(id);
    };

    handleClickEdit = (prerequisite: PrerequisiteType) => () => {
        this.props.actions.openDialog({dialogType: fields.ADD_NEW_PREREQUISITES, data: prerequisite});
    };

    render() {
        const {classes, prerequisitesList, isCanEdit} = this.props;

        return (
            <div className={classes.root}>
                <div className={classNames(classes.header, classes.item)}>
                    <Typography className={classes.title}>
                        Учебная сущность
                    </Typography>
                    <Typography>
                        Уровень освоения
                    </Typography>
                </div>
                <Scrollbars style={{height: 'calc(100vh - 400px)'}}>
                    <div className={classes.list}>
                        {prerequisitesList.map((prerequisite) => (
                            <div className={classNames(classes.item, {[classes.disableItem]: !isCanEdit})}
                                 key={prerequisite[PrerequisiteFields.ID]}
                            >
                                <Typography className={classes.title}>
                                    {prerequisite[PrerequisiteFields.ITEM][TrainingEntitiesFields.TITLE]}
                                </Typography>

                                <Typography>
                                    {prerequisite[PrerequisiteFields.MASTER_LEVEL] === '1' ? 'Начальный'
                                    : prerequisite[PrerequisiteFields.MASTER_LEVEL] === '2' ? 'Средний'
                                    : 'Высокий'
                                    }
                                </Typography>

                                {isCanEdit &&
                                    <div className={classes.actions}>
                                        <IconButton onClick={this.handleClickDelete(prerequisite[PrerequisiteFields.ID])}>
                                            <DeleteIcon/>
                                        </IconButton>
                                        <IconButton onClick={this.handleClickEdit(prerequisite)}>
                                            <EditIcon/>
                                        </IconButton>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                </Scrollbars>

                {isCanEdit &&
                    <div className={classes.buttonsWrapper}>
                        <Button color="secondary"
                                className={classes.addIcon}
                                onClick={this.handleCreateNew}
                        >
                            <AddIcon/> Добавить пререквизит
                        </Button>
                        <Button variant="outlined"
                                color="primary"
                                className={classes.addIcon}
                                onClick={this.getRecommendations}
                        >
                            Получить рекомендации
                        </Button>
                    </div>
                }

                {isCanEdit && <CreateModal />}
                {isCanEdit && <RecommendationModal />}
            </div>
        );
    }
}

export default connect(withStyles(styles)(Prerequisites));
