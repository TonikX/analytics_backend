import React from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import moment from 'moment';
// @ts-ignore
import Scrollbars from "react-custom-scrollbars";

// @ts-ignore
import Link from "react-router-dom/Link";

import classNames from 'classnames';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";

import withStyles from '@material-ui/core/styles/withStyles';

import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import SearchOutlined from "@material-ui/icons/SearchOutlined";

import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import {SortingType} from "../../components/SortingButton/types";

import {WorkProgramListProps} from './types';
import {WorkProgramGeneralFields} from '../WorkProgram/enum';

import connect from './WorkProgramList.connect';
import styles from './WorkProgramList.styles';
import {appRouter} from "../../service/router-service";
import CreateModal from "./CreateModal";
import {specialization} from "../WorkProgram/data";
import {FULL_DATE_FORMAT} from "../../common/utils";
import Tooltip from "@material-ui/core/Tooltip";

class WorkProgramList extends React.Component<WorkProgramListProps> {
    state = {
        deleteConfirmId: null
    }

    componentDidMount() {
        this.props.actions.getWorkProgramList();
    }

    componentWillUnmount() {
        this.props.actions.pageDown();
    }

    handleClickDelete = (id: number) => () => {
        this.setState({
            deleteConfirmId: id
        });
    }

    handleConfirmDeleteDialog = () => {
        const {deleteConfirmId} = this.state;

        this.props.actions.deleteWorkProgram(deleteConfirmId);
        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteConfirmId: null
        });
    }

    handleCreate = () => {
        this.props.actions.openDialog();
    }

    handleChangeSearchQuery = (event: React.ChangeEvent) => {
        this.changeSearch(get(event, 'target.value', ''));
    }

    changeSearch = debounce((value: string): void => {
        this.props.actions.changeSearchQuery(value);
        this.props.actions.changeCurrentPage(1);
        this.props.actions.getWorkProgramList();
    }, 300);

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        this.props.actions.changeCurrentPage(page + 1);
        this.props.actions.getWorkProgramList();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getWorkProgramList();
    }

    render() {
        const {classes, workProgramList, allCount, currentPage, sortingField, sortingMode} = this.props;
        const {deleteConfirmId} = this.state;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Рабочие программы

                    <TextField placeholder="Поиск"
                               variant="outlined"
                               InputProps={{
                                   classes: {
                                       root: classes.searchInput
                                   },
                                   startAdornment: <SearchOutlined />,
                               }}
                               onChange={this.handleChangeSearchQuery}
                    />
                </Typography>

                <div className={classes.tableWrap}>
                    <div className={classNames(classes.row, classes.header)}>
                        <Typography className={classNames(classes.marginRight, classes.qualificationCell)}>
                            Квалификация
                            <SortingButton changeMode={this.changeSorting(WorkProgramGeneralFields.QUALIFICATION)}
                                           mode={sortingField === WorkProgramGeneralFields.QUALIFICATION ? sortingMode : ''}
                            />
                        </Typography>
                        <Typography className={classNames(classes.marginRight, classes.authorCell)}>
                            Авторский состав
                            <SortingButton changeMode={this.changeSorting(WorkProgramGeneralFields.AUTHORS)}
                                           mode={sortingField === WorkProgramGeneralFields.AUTHORS ? sortingMode : ''}
                            />
                        </Typography>
                        <Typography className={classNames(classes.marginRight, classes.dateCell)}>
                            <Tooltip title="Дата создания">
                                <Typography>
                                    Дата
                                    <SortingButton changeMode={this.changeSorting(WorkProgramGeneralFields.APPROVAL_DATE)}
                                                   mode={sortingField === WorkProgramGeneralFields.APPROVAL_DATE ? sortingMode : ''}
                                    />
                                </Typography>
                            </Tooltip>
                        </Typography>
                        <Typography className={classNames(classes.marginRight, classes.numberCell)}>
                            Код
                            <SortingButton changeMode={this.changeSorting(WorkProgramGeneralFields.CODE)}
                                           mode={sortingField === WorkProgramGeneralFields.CODE ? sortingMode : ''}
                            />
                        </Typography>
                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                            Название
                            <SortingButton changeMode={this.changeSorting(WorkProgramGeneralFields.TITLE)}
                                           mode={sortingField === WorkProgramGeneralFields.TITLE ? sortingMode : ''}
                            />
                        </Typography>
                    </div>

                    <div className={classes.list}>
                        <Scrollbars>
                            {workProgramList.map(workProgram =>
                                <div className={classes.row} key={workProgram[WorkProgramGeneralFields.ID]}>
                                    <Typography className={classNames(classes.marginRight, classes.qualificationCell)}>
                                        {get(specialization.find(el => el.value === workProgram[WorkProgramGeneralFields.QUALIFICATION]), 'label', '')}
                                    </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.authorCell)}>
                                        {workProgram[WorkProgramGeneralFields.AUTHORS]}
                                    </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.dateCell)}>
                                        {moment(workProgram[WorkProgramGeneralFields.APPROVAL_DATE]).format(FULL_DATE_FORMAT)}
                                    </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.numberCell)}>
                                        072.0.8.45.2020
                                    </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                                        {workProgram[WorkProgramGeneralFields.TITLE]}
                                    </Typography>
                                    <div className={classes.actions}>
                                        <IconButton onClick={this.handleClickDelete(workProgram[WorkProgramGeneralFields.ID])}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <Link to={appRouter.getWorkProgramLink(workProgram[WorkProgramGeneralFields.ID])} className={classes.link}>
                                            <IconButton>
                                                <EditIcon />
                                            </IconButton>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </Scrollbars>
                    </div>
                </div>

                <div className={classes.footer}>
                    <TablePagination count={allCount}
                                     component="div"
                                     page={currentPage - 1}
                                     rowsPerPageOptions={[]}
                                     onChangePage={this.handleChangePage}
                                     //@ts-ignore
                                     rowsPerPage={10}
                                     onChangeRowsPerPage={()=>{}}
                    />

                    <Fab color="secondary"
                         classes={{
                             root: classes.addIcon
                         }}
                         onClick={this.handleCreate}
                    >
                        <AddIcon/>
                    </Fab>
                </div>

                <ConfirmDialog onConfirm={this.handleConfirmDeleteDialog}
                               onDismiss={this.closeConfirmDeleteDialog}
                               confirmText={'Вы точно уверены, что хотите удалить учебную программу?'}
                               isOpen={Boolean(deleteConfirmId)}
                               dialogTitle={'Удалить учебную программу'}
                               confirmButtonText={'Удалить'}
                />

                <CreateModal />
            </Paper>
        );
    }
}

export default connect(withStyles(styles)(WorkProgramList));
