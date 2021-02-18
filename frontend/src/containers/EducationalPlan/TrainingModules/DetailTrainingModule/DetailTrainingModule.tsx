import React from 'react';
import get from 'lodash/get';
import {withRouter} from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";

import Typography from '@material-ui/core/Typography';

import {BlocksOfWorkProgramsFields, ModuleFields} from "../../enum";
import {DetailTrainingModuleProps} from './types';

import connect from './DetailTrainingModule.connect';
import WPBlockCreateModal from "../../Detail/WPBlockCreateModal";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import withStyles from '@material-ui/core/styles/withStyles';
import TableBody from "@material-ui/core/TableBody";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import Paper from "@material-ui/core/Paper";

import ConfirmDialog from "../../../../components/ConfirmDialog/ConfirmDialog";

import {WorkProgramGeneralFields} from "../../../WorkProgram/enum";
import {typeOfWorkProgramInPlan} from "../../data";
import {appRouter} from "../../../../service/router-service";
import {BlocksOfWorkProgramsType} from "../../types";

import styles from './DetailTrainingModule.styles';

class DetailTrainingModule extends React.Component<DetailTrainingModuleProps> {
    state = {
        deleteBlockConfirmId: null,
        deletedWorkProgramsLength: 0,
    }
    componentDidMount() {
        this.props.actions.getTrainingModule({id: this.getModuleId()});
    }

    handleCreateNewWPBlock = () => {
        this.props.educationPlansActions.createBlockOfWorkPrograms(this.getModuleId());
    }

    getModuleId = () => get(this.props.match.params, 'id');

    goToWorkProgramPage = (id: number) => () => {
        // @ts-ignore
        const {history} = this.props;

        history.push(appRouter.getWorkProgramLink(id));
    }

    handleConfirmBlockDeleteDialog = () => {
        const {deleteBlockConfirmId} = this.state;

        this.props.educationPlansActions.deleteBlockOfWorkPrograms(deleteBlockConfirmId);
        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteBlockConfirmId: null,
            deletedWorkProgramsLength: 0,
        });
    }

    handleClickBlockDelete = (id: number, length: number) => () => {
        this.setState({
            deleteBlockConfirmId: id,
            deletedWorkProgramsLength: length
        });
    }

    handleOpenDetailModal = (block: BlocksOfWorkProgramsType|{}) => () => {
        this.props.educationPlansActions.openDetailDialog({
            ...block,
            moduleId: this.getModuleId()
        });
    }

    render() {
        const {module, classes, canEdit} = this.props;
        const {deleteBlockConfirmId, deletedWorkProgramsLength} = this.state;

        return (
            <Paper className={classes.root}>
                <div className={classes.title}>
                    <Typography> {get(module, ModuleFields.NAME, '')} </Typography>
                    <Button onClick={this.handleCreateNewWPBlock}>Создать блок рабочих программ</Button>
                </div>

                <Scrollbars>
                    <div className={classes.tableWrap}>
                        <Table stickyHeader size='small'>
                            <TableHead className={classes.header}>
                                <TableRow>
                                    <TableCell rowSpan={2}>
                                        РПД
                                    </TableCell>
                                    <TableCell colSpan={10} className={classes.headerTextHoursCount}>
                                        Количество зачетных единиц в семестрах
                                    </TableCell>
                                    <TableCell rowSpan={2}> Тип </TableCell>
                                    {canEdit && <TableCell rowSpan={2}/>}
                                </TableRow>

                                <TableRow>
                                    <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">1</TableCell>
                                    <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">2</TableCell>
                                    <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">3</TableCell>
                                    <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">4</TableCell>
                                    <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">5</TableCell>
                                    <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">6</TableCell>
                                    <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">7</TableCell>
                                    <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">8</TableCell>
                                    <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">9</TableCell>
                                    <TableCell className={classes.hourCell} style={{top: '22px'}} align="center">10</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {get(module, ModuleFields.BLOCKS_OF_WORK_PROGRAMS, []).map((blockOfWorkProgram: any) => {
                                    const semesterHours = get(blockOfWorkProgram, BlocksOfWorkProgramsFields.SEMESTER_UNIT);
                                    const workPrograms = get(blockOfWorkProgram, BlocksOfWorkProgramsFields.WORK_PROGRAMS);

                                    const mappedSemesterHours = semesterHours && semesterHours.split ? semesterHours.split(',') : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                    const semesterHour = mappedSemesterHours.slice(0, 10);

                                    return <TableRow key={blockOfWorkProgram[BlocksOfWorkProgramsFields.ID]}>
                                        <TableCell>
                                            {workPrograms.map((workProgram: any) =>
                                                <div className={classes.displayFlex}>
                                                    <Typography className={classes.workProgramLink}
                                                                onClick={this.goToWorkProgramPage(workProgram[WorkProgramGeneralFields.ID])}>
                                                        {workProgram[WorkProgramGeneralFields.TITLE]}
                                                    </Typography>
                                                </div>
                                            )}
                                        </TableCell>
                                        {semesterHour.map((semesterHour: string) =>
                                            <TableCell align="center" className={classes.hourCell} > {semesterHour} </TableCell>
                                        )}
                                        <TableCell>
                                            {get(typeOfWorkProgramInPlan.find(item =>
                                                item.value === blockOfWorkProgram[BlocksOfWorkProgramsFields.TYPE]
                                            ), 'label', '')}
                                        </TableCell>

                                        {canEdit &&
                                            <TableCell className={classes.actions}>
                                                <Tooltip
                                                    title={`Удалить ${get(workPrograms, 'length', 0) > 1 ? 'комплект рабочих программ' : 'рабочую программу'}`}>
                                                    <DeleteIcon className={classes.marginRight10}
                                                                onClick={this.handleClickBlockDelete(blockOfWorkProgram[BlocksOfWorkProgramsFields.ID], get(workPrograms, 'length', 0))}
                                                    />
                                                </Tooltip>
                                                <Tooltip
                                                    title={`Изменить ${get(workPrograms, 'length', 0) > 1 ? 'комплект рабочих программ' : 'рабочую программу'}`}>
                                                    <EditIcon
                                                        onClick={this.handleOpenDetailModal(blockOfWorkProgram)}/>
                                                </Tooltip>
                                            </TableCell>
                                        }
                                    </TableRow>;
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </Scrollbars>

                <ConfirmDialog onConfirm={this.handleConfirmBlockDeleteDialog}
                               onDismiss={this.closeConfirmDeleteDialog}
                               confirmText={`Вы точно уверены, что хотите ${deletedWorkProgramsLength > 1 ? 'комлект рабочих программ' : 'рабочую программу'}?`}
                               isOpen={Boolean(deleteBlockConfirmId)}
                               dialogTitle={`Удалить ${deletedWorkProgramsLength > 1 ? 'комлект рабочих программ' : 'рабочую программу'}`}
                               confirmButtonText={'Удалить'}
                />

                <WPBlockCreateModal disableZUN
                                    moduleId={this.getModuleId()}
                />
            </Paper>
        );
    }
}

export default connect(withStyles(styles)(withRouter(DetailTrainingModule)));
