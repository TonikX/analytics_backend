import React, {SyntheticEvent} from 'react';
import get from 'lodash/get';
import Scrollbars from "react-custom-scrollbars-2";
import {AutoSizer} from 'react-virtualized-reactv17';

import classNames from "classnames";

import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {withStyles} from '@mui/styles';
import Button from "@mui/material/Button";
import Chip from '@mui/material/Chip';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import EyeIcon from '@mui/icons-material/VisibilityOutlined';
import CheckIcon from "@mui/icons-material/CheckOutlined";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import {appRouter} from '../../../service/router-service'

import DescriptionModal from "./DescriptionModal";
import EvaluationCertificationTotalList from "../EvaluationCertificationTotalList";
import CreateModal from "./CreateModal";

import {SixthStepProps} from './types';
import {EvaluationToolFields, fields, WorkProgramGeneralFields, workProgramSectionFields} from "../enum";
import {EvaluationToolType} from "../types";
import { types } from './constants'

import connect from './EvaluationTools.connect';
import styles from './EvaluationTools.styles';
import {withRouter} from "../../../hoc/WithRouter";
import {subSections} from "../constants";

class EvaluationTools extends React.PureComponent<SixthStepProps> {
    state = {
        anchorsEl: {}
    };

    componentDidUpdate(prevProps: Readonly<SixthStepProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.location.pathname !== this.props.location.pathname){
            this.checkLocation()
        }
    }

    componentDidMount() {
        this.checkLocation()
    }

    checkLocation = () => {
        const location = this.props.location.pathname
        const splittedUrl = location.split('/')
        if (splittedUrl[splittedUrl.length - 1] !== subSections.EVALUATION_TOOLS && location.includes(subSections.EVALUATION_TOOLS)){
            this.props.actions.openDialog({dialogType: fields.SHOW_EVALUATION_TOOLS_DESCRIPTION});
            this.props.actions.getWorkProgramEvaluationTool(splittedUrl[splittedUrl.length - 1]);
        }
    }

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

    handleClickShowDescription = (id: any) => () => {
        //@ts-ignore
        this.props.navigate(appRouter.getWorkProgramEvaluationToolLink(this.props.workProgramId, id))
        // this.props.actions.openDialog({dialogType: fields.SHOW_EVALUATION_TOOLS_DESCRIPTION, data: description});
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
        //@ts-ignore
        const {classes} = this.props;
        const {evaluationToolsList, isCanEdit, extraPoints} = this.props;
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
                                                    onClick={this.handleClickShowDescription(evaluationTool[EvaluationToolFields.ID])}>
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
                                              onClick={this.handleClickShowDescription(evaluationTool[EvaluationToolFields.ID])}
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
//@ts-ignore
export default connect(withStyles(styles)(withRouter(EvaluationTools)));
