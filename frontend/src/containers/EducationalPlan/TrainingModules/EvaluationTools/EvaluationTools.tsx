import React, {SyntheticEvent} from 'react';
import get from 'lodash/get';
import Scrollbars from "react-custom-scrollbars";
import {AutoSizer} from 'react-virtualized';

import classNames from "classnames";

import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import withStyles from '@mui/material/styles/withStyles';
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
import CreateModal from "./CreateModal";

import {Props} from './types';
import {IntermediateCertificationFields} from "../../../WorkProgram/enum";
import {IntermediateCertificationType} from "../../../WorkProgram/types";
import {IntermediateCertificationTypes} from "../../../WorkProgram/constants";

import {fields} from "../enum";
import connect from './EvaluationTools.connect';
import styles from './EvaluationTools.styles';

class EvaluationTools extends React.PureComponent<Props> {
    state = {
        anchorsEl: {}
    };

    handleCreateNew = () => {
        this.props.actions.openDialog({dialog: fields.EVALUATION_MODULE_DIALOG, data: {}});
        this.handleCloseItemMenu();
    };

    handleClickDelete = (id: number) => () => {
        this.props.actions.deleteIntermediateCertification(id);
        this.handleCloseItemMenu();
    };

    handleClickEdit = (evaluationTool: IntermediateCertificationType) => () => {
        this.props.actions.openDialog({dialog: fields.EVALUATION_MODULE_DIALOG, data: evaluationTool});
        this.handleCloseItemMenu();
    };

    handleClickShowDescription = (evaluationTool: IntermediateCertificationType) => () => {
        this.props.actions.openDialog({dialog: fields.EVALUATION_DESCRIPTION_MODULE_DIALOG, data: evaluationTool});
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
        const {classes, evaluationToolsList, isCanEdit} = this.props;
        const {anchorsEl} = this.state;

        return (
            <div className={classes.root}>
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
                        {evaluationToolsList.map((intermediateCertificationTool) => (
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
                                              onClick={this.handleClickShowDescription(intermediateCertificationTool)}>
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
                                         onClick={this.handleClickShowDescription(intermediateCertificationTool)}
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
export default connect(withStyles(styles)(EvaluationTools));
