import React, {SyntheticEvent} from 'react';
import get from 'lodash/get';
import Scrollbars from "react-custom-scrollbars";
import {AutoSizer} from 'react-virtualized';

import classNames from "classnames";

import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import withStyles from '@material-ui/core/styles/withStyles';
import Button from "@material-ui/core/Button";
import Chip from '@material-ui/core/Chip';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import AddIcon from "@material-ui/icons/Add";
import SettingsIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import EyeIcon from '@material-ui/icons/VisibilityOutlined';
import CheckIcon from "@material-ui/icons/CheckOutlined";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import DescriptionModal from "./DescriptionModal";
import EvaluationCertificationTotalList from "../EvaluationCertificationTotalList";
import CreateModal from "./CreateModal";

import {SixthStepProps} from './types';
import {EvaluationToolFields, fields, WorkProgramGeneralFields, workProgramSectionFields} from "../enum";
import {EvaluationToolType} from "../types";
import { types } from './constants'

import connect from './EvaluationTools.connect';
import styles from './EvaluationTools.styles';

class EvaluationTools extends React.PureComponent<SixthStepProps> {
    state = {
        anchorsEl: {}
    };

    handleCreateNew = () => {
        this.props.actions.openDialog({dialogType: fields.CREATE_NEW_EVALUATION_TOOLS, data: {}});
        this.handleCloseItemMenu();
    };

    handleClickDelete = (id: number) => () => {
        this.props.actions.deleteEvaluationTool(id);
        this.handleCloseItemMenu();
    };

    handleClickEdit = (evaluationTool: EvaluationToolType) => () => {
        this.props.actions.openDialog({dialogType: fields.CREATE_NEW_EVALUATION_TOOLS, data: evaluationTool});
        this.handleCloseItemMenu();
    };

    handleClickShowDescription = (description: string) => () => {
        this.props.actions.openDialog({dialogType: fields.SHOW_EVALUATION_TOOLS_DESCRIPTION, data: description});
        this.handleCloseItemMenu();
    };

    handleMenu = (id: number) => (event: SyntheticEvent): void => {
        this.setState({
            anchorsEl: {
                [id]: event.currentTarget
            }
        });
    };

    handleCloseItemMenu = () => {
        this.setState({anchorsEl: {}});
    };

    changeExtraPoints = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        this.props.actions.saveWorkProgram({
            destination: WorkProgramGeneralFields.EXTRA_POINTS,
            value: checked ? 3 : 0
        });
    }

    render() {
        const {classes, evaluationToolsList, isCanEdit, extraPoints} = this.props;
        const {anchorsEl} = this.state;

        return (
            <div className={classes.root}>
                <FormControlLabel
                    value="start"
                    control={
                        <Switch color="primary"
                                onChange={this.changeExtraPoints}
                                defaultChecked={extraPoints === "3"}
                        />
                    }
                    label="Дополнительные 3 балла"
                    labelPlacement="start"
                    className={classes.extraPoint}
                    disabled={!isCanEdit}
                />

                <div className={classes.totalList}>
                    <EvaluationCertificationTotalList />
                </div>
                <AutoSizer disableHeight>
                    {({ width, height }) => (
                <Scrollbars style={{width, height}} autoHeight autoHeightMax={Number.MAX_VALUE}>
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
                        Ключевая точка
                    </Typography>
                    <Typography className={classes.semester}>
                        Семестр
                    </Typography>
                </div>
                
                    <div className={classes.list}>
                        {evaluationToolsList.map((evaluationTool) => (
                            <div className={classes.item}>
                                <div className={classes.row}>
                                    <Typography className={classes.title}>
                                        {evaluationTool[EvaluationToolFields.NAME]}
                                    </Typography>
                                    <Typography className={classes.type}>
                                        {evaluationTool[EvaluationToolFields.TYPE]} {types.includes(evaluationTool[EvaluationToolFields.TYPE]) ? '' : '(устаревшее)'}
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
                                        {evaluationTool[EvaluationToolFields.CHECK_POINT] ? <CheckIcon /> : <></>}
                                    </Typography>
                                    <Typography className={classes.semester}>
                                        {evaluationTool[EvaluationToolFields.SEMESTER]}
                                    </Typography>

                                    {isCanEdit ?
                                        <div className={classes.actions}>
                                            <IconButton
                                                aria-haspopup="true"
                                                onClick={this.handleMenu(evaluationTool[EvaluationToolFields.ID])}
                                                color="inherit"
                                            >
                                                <SettingsIcon/>
                                            </IconButton>
                                            <Menu
                                                anchorEl={get(anchorsEl, evaluationTool[EvaluationToolFields.ID])}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(get(anchorsEl, evaluationTool[EvaluationToolFields.ID]))}
                                                onClose={this.handleCloseItemMenu}
                                                PopoverClasses={{
                                                    root: classes.popper,
                                                    paper: classes.menuPaper
                                                }}
                                            >
                                                <MenuItem
                                                    onClick={this.handleClickShowDescription(evaluationTool[EvaluationToolFields.DESCRIPTION])}>
                                                    <EyeIcon className={classes.menuIcon} />
                                                    Смотреть описание
                                                </MenuItem>

                                                <MenuItem onClick={this.handleClickEdit(evaluationTool)}>
                                                    <EditIcon className={classes.menuIcon}/>
                                                    Редактировать
                                                </MenuItem>

                                                <MenuItem
                                                    onClick={this.handleClickDelete(evaluationTool[EvaluationToolFields.ID])}>
                                                    <DeleteIcon className={classes.menuIcon}/>
                                                    Удалить
                                                </MenuItem>
                                            </Menu>
                                        </div>
                                        :
                                         <div className={classes.eyeIcon}
                                              onClick={this.handleClickShowDescription(evaluationTool[EvaluationToolFields.DESCRIPTION])}
                                         >
                                             <EyeIcon className={classes.menuIcon} />
                                         </div>
                                    }
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
                </Scrollbars>)}
                </AutoSizer>

                {isCanEdit &&
                    <Button color="secondary"
                         className={classes.addIcon}
                         onClick={this.handleCreateNew}
                    >
                        <AddIcon/> Добавить оценочное средство
                    </Button>
                }

                {isCanEdit && <CreateModal />}

                <DescriptionModal />
            </div>
        );
    }
}

export default connect(withStyles(styles)(EvaluationTools));
