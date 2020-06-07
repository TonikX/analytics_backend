import React from 'react';
import Scrollbars from "react-custom-scrollbars";

import classNames from "classnames";

import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from "@material-ui/core/Fab";

import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import EyeIcon from '@material-ui/icons/VisibilityOutlined';
import CheckIcon from "@material-ui/icons/CheckOutlined";
import Chip from '@material-ui/core/Chip';

import {SixthStepProps} from './types';
import {EvaluationToolFields, fields, PrerequisiteFields, workProgramSectionFields} from "../enum";
import {TrainingEntitiesFields} from "../../TrainingEntities/enum";

import CreateModal from "./CreateModal";
import {EvaluationToolType, PrerequisiteType} from "../types";

import connect from './EvaluationTools.connect';
import styles from './EvaluationTools.styles';

class EvaluationTools extends React.PureComponent<SixthStepProps> {
    componentDidMount() {
        this.props.actions.getWorkProgramEvaluationTools();
    }

    handleCreateNew = () => {
        this.props.actions.openDialog({dialogType: fields.CREATE_NEW_VALUATION_TOOLS, data: {}});
    };

    handleClickDelete = (id: number) => () => {
        this.props.actions.deletePrerequisite(id);
    };

    handleClickEdit = (evaluationTool: EvaluationToolType) => () => {
        this.props.actions.openDialog({dialogType: fields.CREATE_NEW_VALUATION_TOOLS, data: evaluationTool});
    };

    handleClickShowDescription = (description: string) => () => {

    };

    render() {
        const {classes, evaluationToolsList} = this.props;

        return (
            <div className={classes.root}>
                <div className={classNames(classes.header, classes.row)}>
                    <Typography className={classes.title}>
                        Название
                    </Typography>
                    <Typography className={classes.type}>
                        Тип
                    </Typography>
                    <Typography className={classes.min}>
                        <Tooltip title="Минимальное значение">
                            <Typography> Min </Typography>
                        </Tooltip>
                    </Typography>
                    <Typography className={classes.max}>
                        <Tooltip title="Максимальное значение">
                            <Typography> Max </Typography>
                        </Tooltip>
                    </Typography>
                    <Typography className={classes.deadline}>
                        <Tooltip title="Срок контроля в неделях">
                            <Typography> Срок контроля </Typography>
                        </Tooltip>
                    </Typography>
                    <Typography className={classes.checkpoint}>
                        Контрольная точка
                    </Typography>
                </div>
                <Scrollbars>
                    <div className={classes.list}>
                        {evaluationToolsList.map((evaluationTool) => (
                            <div className={classes.item}>
                                <div className={classes.row}>
                                    <Typography className={classes.title}>
                                        {evaluationTool[EvaluationToolFields.NAME]}
                                    </Typography>
                                    <Typography className={classes.type}>
                                        {evaluationTool[EvaluationToolFields.TYPE]}
                                    </Typography>
                                    <Typography className={classes.min}>
                                        {evaluationTool[EvaluationToolFields.MIN]}
                                    </Typography>
                                    <Typography className={classes.max}>
                                        {evaluationTool[EvaluationToolFields.MAX]}
                                    </Typography>
                                    <Typography className={classes.deadline}>
                                        {evaluationTool[EvaluationToolFields.DEADLINE]}
                                    </Typography>
                                    <Typography className={classes.checkpoint}>
                                        {EvaluationToolFields.CHECK_POINT ? <CheckIcon /> : <></>}
                                    </Typography>

                                    <div className={classes.actions}>

                                        <Tooltip title="Смотреть описание">
                                            <IconButton onClick={this.handleClickShowDescription(evaluationTool[EvaluationToolFields.DESCRIPTION])}>
                                                <EyeIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <IconButton onClick={this.handleClickDelete(evaluationTool[EvaluationToolFields.ID])}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton onClick={this.handleClickEdit(evaluationTool)}>
                                            <EditIcon />
                                        </IconButton>
                                    </div>
                                </div>

                                <div className={classNames(classes.sectionsRow, classes.row)}>
                                    <Typography className={classes.sectionsTitle}>
                                        Разделы:
                                    </Typography>
                                    {evaluationTool[EvaluationToolFields.SECTIONS].map(section =>
                                        <Typography>
                                            <Chip className={classes.sectionChip} label={section[workProgramSectionFields.NAME]} />
                                        </Typography>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Scrollbars>

                <Fab color="secondary"
                     className={classes.addIcon}
                     onClick={this.handleCreateNew}
                >
                    <AddIcon/>
                </Fab>

                <CreateModal />
            </div>
        );
    }
}

export default connect(withStyles(styles)(EvaluationTools));
