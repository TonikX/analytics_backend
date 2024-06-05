import React from 'react';
import Scrollbars from "react-custom-scrollbars-2";

import classNames from "classnames";

import Typography from "@mui/material/Typography";
import {withStyles} from '@mui/styles';
import Button from "@mui/material/Button";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";

import {SixthStepProps} from './types';
import {fields, PrerequisiteFields} from "../enum";
import {TrainingEntitiesFields} from "../../TrainingEntities/enum";

import CreateModal from "./CreateModal";
import {PrerequisiteType} from "../types";

import connect from './Prerequisites.connect';
import styles from './Prerequisites.styles';

class Prerequisites extends React.PureComponent<SixthStepProps> {
    handleCreateNew = () => {
        this.props.actions.openDialog({dialogType: fields.ADD_NEW_PREREQUISITES, data: {}});
    };

    handleClickDelete = (id: number) => () => {
        this.props.actions.deletePrerequisite(id);
    };

    handleClickEdit = (prerequisite: PrerequisiteType) => () => {
        this.props.actions.openDialog({dialogType: fields.ADD_NEW_PREREQUISITES, data: prerequisite});
    };

    render() {
        //@ts-ignore
        const {classes} = this.props;
        const {prerequisitesList, isCanEdit} = this.props;

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
                    <Button color="secondary"
                         className={classes.addIcon}
                         onClick={this.handleCreateNew}
                    >
                        <AddIcon/> Добавить пререквизит
                    </Button>
                }

                {isCanEdit && <CreateModal />}
            </div>
        );
    }
}
//@ts-ignore
export default connect(withStyles(styles)(Prerequisites));
