import React, {SyntheticEvent} from 'react';
import get from 'lodash/get';
import moment from 'moment';
// @ts-ignore
import Scrollbars from "react-custom-scrollbars";

import classNames from 'classnames';

import Paper from '@material-ui/core/Paper';
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";

import withStyles from '@material-ui/core/styles/withStyles';

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";

import ConfirmDialog from "../../../components/ConfirmDialog";
import CreateModal from "./CreateModal";
import ChangePlanModal from '../CreateModal';

import {BlocksOfWorkProgramsType, EducationalPlanType} from '../types';
import {EducationalPlanDetailProps} from './types';

import connect from './Detail.connect';
import styles from './Detail.styles';
import {EducationalPlanBlockFields, ModuleFields, BlocksOfWorkProgramsFields} from "../enum";
import {WorkProgramGeneralFields, workProgramSectionFields} from "../../WorkProgram/enum";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";

class EducationalPlan extends React.Component<EducationalPlanDetailProps> {
    state = {
        deleteConfirmId: null,
        anchorEl: null
    }

    componentDidMount() {
        const workProgramId = get(this, 'props.match.params.id');

        this.props.actions.getEducationalDetail(workProgramId);
    }

    handleClickDelete = (id: number) => () => {
        this.setState({
            deleteConfirmId: id
        });
        this.handleCloseMenu();
    }

    handleConfirmDeleteDialog = () => {
        const {deleteConfirmId} = this.state;

        this.props.actions.deleteEducationalPlan(deleteConfirmId);
        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteConfirmId: null
        });
    }

    handleClickEdit = (plan: EducationalPlanType) => () => {
        this.props.actions.openDialog(plan);
        this.handleCloseMenu();
    }

    handleOpenDetailModal = () => {
        this.props.actions.openDetailDialog();
    }

    handleMenu = (event: SyntheticEvent): void => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleChangePlan = () => {
        const {detailPlan} = this.props;

        this.props.actions.openDialog(detailPlan);
    }

    handleCloseMenu = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {classes, blocks} = this.props;
        const {deleteConfirmId} = this.state;

        const {anchorEl} = this.state;

        const isOpenEditMenu = Boolean(anchorEl);
        console.log('blocks', blocks);
        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Учебный план
                </Typography>

                <div className={classes.tableWrap}>
                    <div className={classNames(classes.row, classes.header)}>

                    </div>

                    <div className={classes.list}>
                        <Scrollbars>
                            {blocks.map(block => {
                                return (
                                    <>
                                        <div className={classNames(classes.row, classes.blockRow)}>
                                            <Typography className={classes.titleCell}>{block[EducationalPlanBlockFields.NAME]}</Typography>
                                        </div>
                                        {block[EducationalPlanBlockFields.MODULES].map(module => {
                                            return (
                                                <>
                                                    <Typography className={classNames(classes.row, classes.moduleRow)}>
                                                        {module[ModuleFields.NAME]}
                                                        <AddCircleIcon className={classes.addProgramIcon}
                                                                       color="primary"
                                                                       onClick={this.handleOpenDetailModal}
                                                        />
                                                    </Typography>
                                                    {module[ModuleFields.BLOCKS_OF_WORK_PROGRAMS].map(blockOfWorkProgram => {
                                                        return blockOfWorkProgram[BlocksOfWorkProgramsFields.WORK_PROGRAMS].map(workProgram =>
                                                            <Typography className={classes.row}> {workProgram[WorkProgramGeneralFields.TITLE]} </Typography>
                                                        );
                                                    })}
                                                </>
                                            )
                                        })}
                                    </>
                                )
                            })}
                        </Scrollbars>
                    </div>
                </div>

                <div className={classes.footer}>
                    <Fab color="secondary"
                         classes={{
                             root: classes.addIcon
                         }}
                         onClick={this.handleChangePlan}
                    >
                        <EditIcon />
                    </Fab>
                </div>

                <CreateModal />
                <ChangePlanModal />

                <ConfirmDialog onConfirm={this.handleConfirmDeleteDialog}
                               onDismiss={this.closeConfirmDeleteDialog}
                               confirmText={'Вы точно уверены, что хотите удалить привязанную рабочую программу?'}
                               isOpen={Boolean(deleteConfirmId)}
                               dialogTitle={'Удалить привязку'}
                               confirmButtonText={'Удалить'}
                />
            </Paper>
        );
    }
}

export default connect(withStyles(styles)(EducationalPlan));
