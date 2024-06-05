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
import Chip from "@mui/material/Chip";

import {ResultsProps} from './types';
import {EvaluationToolFields, fields, ResultsFields} from "../enum";
import {TrainingEntitiesFields} from "../../TrainingEntities/enum";

import CreateModal from "./CreateModal";
import {ResultsType} from "../types";

import connect from './Results.connect';
import styles from './Results.styles';

class Results extends React.PureComponent<ResultsProps> {
    handleCreateNew = () => {
        this.props.actions.openDialog({dialogType: fields.ADD_NEW_RESULT, data: {}});
    };

    handleClickDelete = (id: number) => () => {
        this.props.actions.deleteResult(id);
    };

    handleClickEdit = (result: ResultsType) => () => {
        this.props.actions.openDialog({dialogType: fields.ADD_NEW_RESULT, data: result});
    };

    render() {
        //@ts-ignore
        const {classes} = this.props;
        const {resultsList, isCanEdit} = this.props;

        return (
            <div className={classes.root}>
                <div className={classNames(classes.header, classes.item)}>
                    <Typography className={classes.title}>
                        Учебная сущность
                    </Typography>
                    <Typography className={classes.level}>
                        Уровень освоения
                    </Typography>
                </div>
                <Scrollbars style={{height: 'calc(100vh - 400px)'}}>
                    <div className={classes.list}>
                        {resultsList.map((result) => (
                            <div className={classes.item}>

                                <div className={classes.row}>
                                    <Typography className={classes.title}>
                                        {result[ResultsFields.ITEM][TrainingEntitiesFields.TITLE]}
                                    </Typography>

                                    <Typography className={classes.level}>
                                        {result[ResultsFields.MASTER_LEVEL] === '1' ? 'Начальный'
                                        : result[ResultsFields.MASTER_LEVEL] === '2' ? 'Средний'
                                        : 'Высокий'
                                        }
                                    </Typography>

                                    {isCanEdit &&
                                        <div className={classes.actions}>
                                            <IconButton onClick={this.handleClickDelete(result[ResultsFields.ID])}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton onClick={this.handleClickEdit(result)}>
                                                <EditIcon />
                                            </IconButton>
                                        </div>
                                    }
                                </div>

                                <div className={classNames(classes.evaluationToolRow, classes.row)}>
                                    <Typography className={classes.evaluationToolTitle}>
                                        Оценочные средства:
                                    </Typography>
                                    {result[ResultsFields.EVALUATION_TOOLS].map(section =>
                                        <Typography>
                                            <Chip className={classes.evaluationToolChip} label={section[EvaluationToolFields.NAME]} />
                                        </Typography>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Scrollbars>

                {isCanEdit &&
                    <Button color="secondary"
                         className={classes.addIcon}
                         onClick={this.handleCreateNew}
                    >
                        <AddIcon/> Добавить результат
                    </Button>
                }

                {isCanEdit && <CreateModal />}
            </div>
        );
    }
}

//@ts-ignore
export default connect(withStyles(styles)(Results));
