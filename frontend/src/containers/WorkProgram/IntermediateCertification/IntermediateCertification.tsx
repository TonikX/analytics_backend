import React, {SyntheticEvent} from 'react';
import get from 'lodash/get';
import Scrollbars from "react-custom-scrollbars-2";
import {AutoSizer} from 'react-virtualized-reactv17';
import {withRouter} from "../../../hoc/WithRouter";

import classNames from "classnames";

import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {withStyles} from '@mui/styles';
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import EyeIcon from '@mui/icons-material/VisibilityOutlined';

import DescriptionModal from "./DescriptionModal";
import EvaluationCertificationTotalList from "../EvaluationCertificationTotalList";

import {IntermediateCertificationProps} from './types';
import {IntermediateCertificationFields, fields} from "../enum";
import {IntermediateCertificationTypes, subSections} from "../constants";
import {IntermediateCertificationType} from "../types";
import {appRouter} from "../../../service/router-service";

import CreateModal from "./CreateModal";

import connect from './IntermediateCertification.connect';
import styles from './IntermediateCertification.styles';

class IntermediateCertification extends React.PureComponent<IntermediateCertificationProps> {
    state = {
        anchorsEl: {}
    };

    componentDidMount() {
        this.props.actions.getWorkProgramEvaluationTools();
        this.checkLocation()
    }

    componentDidUpdate(prevProps: Readonly<IntermediateCertificationProps>, prevState: Readonly<{}>, snapshot?: any) {
         if (prevProps.location.pathname !== this.props.location.pathname){
             this.checkLocation()
         }
    }

    checkLocation = () => {
        const location = this.props.location.pathname
        const splittedUrl = location.split('/')
        if (splittedUrl[splittedUrl.length - 1] !== subSections.INTERMEDIATE_CERTIFICATION && location.includes(subSections.INTERMEDIATE_CERTIFICATION)){
            this.props.actions.openDialog({dialogType: fields.SHOW_INTERMEDIATE_CERTIFICATION_DESCRIPTION});
            this.props.actions.getIntermediateCertification(splittedUrl[splittedUrl.length - 1]);
        }
    }

    handleCreateNew = () => {
        this.props.actions.openDialog({dialogType: fields.CREATE_NEW_INTERMEDIATE_CERTIFICATION, data: {}});
        this.handleCloseItemMenu();
    };

    handleClickDelete = (id: number) => () => {
        this.props.actions.deleteIntermediateCertification(id);
        this.handleCloseItemMenu();
    };

    handleClickEdit = (intermediateCertificationTool: IntermediateCertificationType) => () => {
        this.props.actions.openDialog({dialogType: fields.CREATE_NEW_INTERMEDIATE_CERTIFICATION, data: intermediateCertificationTool});
        this.handleCloseItemMenu();
    };

    handleClickShowDescription = (id: any) => () => {
        //@ts-ignore
        this.props.navigate(appRouter.getWorkProgramIntermediateCertificationToolLink(this.props.workProgramId, id))
        // this.props.actions.openDialog({dialogType: fields.SHOW_INTERMEDIATE_CERTIFICATION_DESCRIPTION, data: description});
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

    render() {
        //@ts-ignore
        const {classes} = this.props;
        const {intermediateCertificationList, isCanEdit} = this.props;
        const {anchorsEl} = this.state;
        const disabled = this.props.inChangeBlock.length > 0;

        return (
            <div className={classes.root}>

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
                    <Typography className={classes.semester}>
                        Семестр
                    </Typography>
                </div>

                <div className={classes.list}>
                        {intermediateCertificationList.map((intermediateCertificationTool) => (
                            <div className={classes.item}>
                                <div className={classes.row}>
                                    <Typography className={classes.title}>
                                        {intermediateCertificationTool[IntermediateCertificationFields.NAME]}
                                    </Typography>
                                    <Typography className={classes.type}>
                                        {IntermediateCertificationTypes[intermediateCertificationTool[IntermediateCertificationFields.TYPE]]}
                                    </Typography>
                                    <Typography className={classes.min}>
                                        {intermediateCertificationTool[IntermediateCertificationFields.MIN]}
                                    </Typography>
                                    <Typography className={classes.max}>
                                        {intermediateCertificationTool[IntermediateCertificationFields.MAX]}
                                    </Typography>
                                    <Typography className={classes.semester}>
                                        {intermediateCertificationTool[IntermediateCertificationFields.SEMESTER]}
                                    </Typography>

                                    {isCanEdit ?
                                        <div className={classes.actions}>
                                            <IconButton
                                                aria-haspopup="true"
                                                onClick={this.handleMenu(intermediateCertificationTool[IntermediateCertificationFields.ID])}
                                                color="inherit"
                                            >
                                                <SettingsIcon/>
                                            </IconButton>
                                            <Menu
                                                anchorEl={get(anchorsEl, intermediateCertificationTool[IntermediateCertificationFields.ID])}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(get(anchorsEl, intermediateCertificationTool[IntermediateCertificationFields.ID]))}
                                                onClose={this.handleCloseItemMenu}
                                                PopoverClasses={{
                                                    root: classes.popper,
                                                    paper: classes.menuPaper
                                                }}
                                            >
                                                <MenuItem
                                                    onClick={this.handleClickShowDescription(intermediateCertificationTool[IntermediateCertificationFields.ID])}>
                                                    <EyeIcon className={classes.menuIcon} />
                                                    Смотреть описание
                                                </MenuItem>

                                                <MenuItem onClick={this.handleClickEdit(intermediateCertificationTool)}>
                                                    <EditIcon className={classes.menuIcon}/>
                                                    Редактировать
                                                </MenuItem>

                                                <MenuItem
                                                    onClick={this.handleClickDelete(intermediateCertificationTool[IntermediateCertificationFields.ID])}>
                                                    <DeleteIcon className={classes.menuIcon}/>
                                                    Удалить
                                                </MenuItem>
                                            </Menu>
                                        </div>
                                        :
                                         <div className={classes.eyeIcon}
                                              onClick={this.handleClickShowDescription(intermediateCertificationTool[IntermediateCertificationFields.ID])}
                                         >
                                             <EyeIcon className={classes.menuIcon} />
                                         </div>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </Scrollbars>)}
                </AutoSizer>

                {/*<Typography className={classes.lastInfo}>*/}
                {/*    Курсовой проект: <b> {hasCourseProject === null ? 'Нет информации' : hasCourseProject ? 'да' : 'нет'}</b> <br/>*/}
                {/*    Дифферинциальный зачет: <b> {hasDiffPass === null ? 'Нет информации' : hasDiffPass ? 'да' : 'нет'}</b> <br/>*/}
                {/*    Зачет: <b> {hasPass === null ? 'Нет информации' : hasPass ? 'да' : 'нет'}</b> <br/>*/}
                {/*    Экзамен: <b> {hasExam === null ? 'Нет информации' : hasExam ? 'да' : 'нет'}</b> <br/>*/}
                {/*</Typography>*/}

                {isCanEdit  &&
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
export default connect(withStyles(styles)(withRouter(IntermediateCertification)));
