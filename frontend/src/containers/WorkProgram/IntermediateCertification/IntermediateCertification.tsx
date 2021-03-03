import React, {SyntheticEvent} from 'react';
import get from 'lodash/get';
import Scrollbars from "react-custom-scrollbars";
import {AutoSizer} from 'react-virtualized';

import classNames from "classnames";

import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from "@material-ui/core/Fab";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import AddIcon from "@material-ui/icons/Add";
import SettingsIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import EyeIcon from '@material-ui/icons/VisibilityOutlined';

import DescriptionModal from "./DescriptionModal";
import EvaluationCertificationTotalList from "../EvaluationCertificationTotalList";

import {IntermediateCertificationProps} from './types';
import {IntermediateCertificationFields, fields} from "../enum";
import {IntermediateCertificationTypes} from "../constants";
import {IntermediateCertificationType} from "../types";

import CreateModal from "./CreateModal";

import connect from './IntermediateCertification.connect';
import styles from './IntermediateCertification.styles';

class IntermediateCertification extends React.PureComponent<IntermediateCertificationProps> {
    state = {
        anchorsEl: {}
    };

    componentDidMount() {
        this.props.actions.getWorkProgramEvaluationTools();
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

    handleClickShowDescription = (description: string) => () => {
        this.props.actions.openDialog({dialogType: fields.SHOW_INTERMEDIATE_CERTIFICATION_DESCRIPTION, data: description});
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
        const {classes, intermediateCertificationList, isCanEdit, isStudent} = this.props;
        const {anchorsEl} = this.state;
        
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
                                                    onClick={this.handleClickShowDescription(intermediateCertificationTool[IntermediateCertificationFields.DESCRIPTION])}>
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
                                        : !isStudent ?
                                             <div onClick={this.handleClickShowDescription(intermediateCertificationTool[IntermediateCertificationFields.DESCRIPTION])}>
                                                 <EyeIcon className={classes.menuIcon} />
                                             </div>
                                        : <></>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </Scrollbars>)}
                </AutoSizer>

                {isCanEdit &&
                    <Fab color="secondary"
                         className={classes.addIcon}
                         onClick={this.handleCreateNew}
                    >
                        <AddIcon/>
                    </Fab>
                }

                {isCanEdit && <CreateModal />}
                {isCanEdit && <DescriptionModal />}
            </div>
        );
    }
}

export default connect(withStyles(styles)(IntermediateCertification));
