import React from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
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
import {WorkProgramGeneralType} from '../WorkProgram/types';

import connect from './WorkProgramList.connect';
import styles from './WorkProgramList.styles';
import {appRouter} from "../../service/router-service";

class WorkProgramList extends React.Component<WorkProgramListProps> {
    state = {
        deleteConfirmId: null
    }

    componentDidMount() {
        this.props.actions.getWorkProgramList();
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

    handleClickEdit = (workProgram: WorkProgramGeneralType) => () => {
        this.props.actions.openDialog(workProgram);
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

                        <Typography className={classNames(classes.marginRight, classes.qualificationCell)}>
                            Квалификация
                            <SortingButton changeMode={this.changeSorting(WorkProgramGeneralFields.QUALIFICATION)}
                                           mode={sortingField === WorkProgramGeneralFields.QUALIFICATION ? sortingMode : ''}
                            />
                        </Typography>
                    </div>

                    <div className={classes.list}>
                        <Scrollbars>
                            {workProgramList.map(workProgram =>
                                <div className={classes.row} key={workProgram[WorkProgramGeneralFields.ID]}>
                                    <Typography className={classNames(classes.marginRight, classes.numberCell)}>
                                        {workProgram[WorkProgramGeneralFields.CODE]}
                                    </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                                        {workProgram[WorkProgramGeneralFields.TITLE]}
                                    </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.qualificationCell)}>
                                        {workProgram[WorkProgramGeneralFields.QUALIFICATION]}
                                    </Typography>
                                    <div className={classes.actions}>
                                        <IconButton onClick={this.handleClickDelete(workProgram[WorkProgramGeneralFields.ID])}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <Link to={appRouter.getWorkProgramLink(workProgram[WorkProgramGeneralFields.ID])} className={classes.link}>
                                            <IconButton onClick={this.handleClickEdit(workProgram)}>
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
            </Paper>
        );
    }
}

export default connect(withStyles(styles)(WorkProgramList));
