import React, {SyntheticEvent} from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import moment from 'moment';
import Scrollbars from "react-custom-scrollbars-2";

import {Link} from "react-router-dom";
import {withRouter} from '../../hoc/WithRouter'

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import Tooltip from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import withStyles from '@mui/material/styles/withStyles';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import Pagination from '@mui/lab/Pagination';

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import SettingsIcon from "@mui/icons-material/MoreVert";
import CopyIcon from "@mui/icons-material/FileCopyOutlined";

import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import {SortingType} from "../../components/SortingButton/types";
import CustomizeExpansionPanel from "../../components/CustomizeExpansionPanel";

import CreateModal from "./CreateModal";
import Filters from "./Filters";

import {FULL_DATE_FORMAT} from "../../common/utils";
import {appRouter} from "../../service/router-service";

import {specialization, workProgramStatusesColors, workProgramStatusesRussian} from "../WorkProgram/constants";
import {WorkProgramGeneralFields, WorkProgramStatusEnum} from '../WorkProgram/enum';
import {filterFields} from "./enum";
import {WorkProgramListProps} from './types';

import connect from './WorkProgramList.connect';
import styles from './WorkProgramList.styles';
import WorkProgramStatus from "../../components/WorkProgramStatus/WorkProgramStatus";

class WorkProgramList extends React.Component<WorkProgramListProps> {
    state = {
        deleteConfirmId: null,
        duplicateConfirmId: null,
        anchorsEl: {},
    }

    componentDidMount() {
        this.props.actions.getWorkProgramList();
    }

    componentDidUpdate(prevProps: WorkProgramListProps) {
        if (prevProps.workProgramIdForRedirect !== this.props.workProgramIdForRedirect && this.props.workProgramIdForRedirect){
            this.navigateToWorkProgram();
        }
    }

    componentWillUnmount() {
        this.props.actions.pageDown();
    }

    navigateToWorkProgram = () => {
        // @ts-ignore
        const {navigate, workProgramIdForRedirect} = this.props;
        this.props.actions.setWorkProgramIdForRedirect(null);
        navigate(appRouter.getWorkProgramLink(workProgramIdForRedirect!));
    }

    handleClickDelete = (id: number) => () => {
        this.setState({
            deleteConfirmId: id
        });
    }

    handleClickDuplicate = (id: number) => () => {
        this.setState({
            duplicateConfirmId: id
        });
    }

    handleConfirmDeleteDialog = () => {
        const {deleteConfirmId} = this.state;

        this.props.actions.deleteWorkProgram(deleteConfirmId);
        this.closeConfirmDeleteDialog();
    }

    handleConfirmDuplicateDialog = () => {
        const {duplicateConfirmId} = this.state;

        this.props.workProgramActions.cloneWorkProgram(duplicateConfirmId);
        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteConfirmId: null
        });
    }

    closeConfirmDuplicateDialog = () => {
        this.setState({
            duplicateConfirmId: null
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

    handleChangePage = (event: any, page: number) => {
        this.props.actions.changeCurrentPage(page);
        this.props.actions.getWorkProgramList();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getWorkProgramList();
    }

    handleMenu = (id: number) => (event: SyntheticEvent): void => {
        this.setState({
            anchorsEl: {
                [id]: event.currentTarget
            }
        });
    };

    handleCloseMenu = () => {
        this.setState({anchorsEl: {}});
    };

    changeShowOnlyMy = () => {
        this.props.actions.changeCurrentPage(1);
        this.props.actions.changeFiltering({[filterFields.ONLY_MY]: !this.props.showOnlyMy});
        this.props.actions.getWorkProgramList();
    }

    changeShowArchive = () => {
        this.props.actions.changeCurrentPage(1);
        this.props.actions.changeFiltering({[filterFields.ARCHIVE]: !this.props.showArchive});
        this.props.actions.getWorkProgramList();
    }

    changeStatusFiltering = (newStatus: WorkProgramStatusEnum) => () => {
        const {status} = this.props;
        this.props.actions.changeCurrentPage(1);
        this.props.actions.changeFiltering({[filterFields.STATUS]: status === newStatus ? null : newStatus});
        this.props.actions.getWorkProgramList();
    }

    render() {
        const {classes, workProgramList, allCount, currentPage, sortingField, sortingMode, showOnlyMy, showArchive, status} = this.props;
        const {deleteConfirmId, duplicateConfirmId, anchorsEl} = this.state;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Рабочие программы

                    <Typography className={classes.showOnlyMy}>
                        <Switch checked={showOnlyMy}
                                onChange={this.changeShowOnlyMy}
                                color="primary"
                        />
                        Показать только мои РПД
                    </Typography>

                    <Typography className={classes.showOnlyMy}>
                        <Switch checked={showArchive}
                                onChange={this.changeShowArchive}
                                color="primary"
                        />
                        Отобразить дисциплины в архиве
                    </Typography>

                    <TextField placeholder="Поиск"
                               variant="outlined"
                               className={classes.searchInput}
                               InputProps={{
                                   classes: {
                                       root: classes.searchInput
                                   },
                                   startAdornment: <SearchOutlined />,
                               }}
                               onChange={this.handleChangeSearchQuery}
                    />
                </Typography>

                <div className={classes.statuses}>
                    {Object.keys(workProgramStatusesRussian).map((enumStatus: any) =>
                      <WorkProgramStatus
                        status={enumStatus}
                        key={enumStatus}
                        onClick={this.changeStatusFiltering(enumStatus)}
                        disabledStyle={Boolean(status !== enumStatus && status)}
                      />
                    )}
                </div>

                <CustomizeExpansionPanel label="Фильтрация" details={<Filters />}/>

                <Scrollbars>
                    <div className={classes.tableWrap}>
                        <Table stickyHeader size='small'>
                            <TableHead className={classes.header}>
                                <TableRow>
                                    <TableCell>
                                        Код
                                        <SortingButton changeMode={this.changeSorting(WorkProgramGeneralFields.CODE)}
                                                       mode={sortingField === WorkProgramGeneralFields.CODE ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Название
                                        <SortingButton changeMode={this.changeSorting(WorkProgramGeneralFields.TITLE)}
                                                       mode={sortingField === WorkProgramGeneralFields.TITLE ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Уровень образования
                                        <SortingButton changeMode={this.changeSorting(WorkProgramGeneralFields.QUALIFICATION)}
                                                       mode={sortingField === WorkProgramGeneralFields.QUALIFICATION ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Авторский состав
                                        <SortingButton changeMode={this.changeSorting(WorkProgramGeneralFields.AUTHORS)}
                                                       mode={sortingField === WorkProgramGeneralFields.AUTHORS ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="Дата создания">
                                            <Typography>
                                                Дата
                                                <SortingButton changeMode={this.changeSorting(WorkProgramGeneralFields.APPROVAL_DATE)}
                                                               mode={sortingField === WorkProgramGeneralFields.APPROVAL_DATE ? sortingMode : ''}
                                                />
                                            </Typography>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {workProgramList.map((workProgram: any) =>
                                    <TableRow key={workProgram[WorkProgramGeneralFields.ID]}>
                                        <TableCell
                                          className={classes.cellStatus}
                                          style={{borderLeftColor: workProgramStatusesColors[get(workProgram, 'expertise_with_rpd.0.expertise_status', workProgram.work_status)]}}
                                        >
                                            {workProgram[WorkProgramGeneralFields.CODE]}
                                        </TableCell>
                                        <TableCell className={classes.link}>
                                            <Link target="_blank" to={appRouter.getWorkProgramLink(workProgram[WorkProgramGeneralFields.ID])}>
                                                {workProgram[WorkProgramGeneralFields.TITLE]}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {get(specialization.find(el => el.value === workProgram[WorkProgramGeneralFields.QUALIFICATION]), 'label', '')}
                                        </TableCell>
                                        <TableCell>
                                            {workProgram[WorkProgramGeneralFields.AUTHORS]}
                                        </TableCell>
                                        <TableCell>
                                            {moment(workProgram[WorkProgramGeneralFields.APPROVAL_DATE]).format(FULL_DATE_FORMAT)}
                                        </TableCell>
                                        <TableCell>
                                            <div className={classes.actions}>
                                                <IconButton
                                                    aria-haspopup="true"
                                                    onClick={this.handleMenu(workProgram[WorkProgramGeneralFields.ID])}
                                                    color="inherit"
                                                    className={classes.settingsButton}
                                                >
                                                    <SettingsIcon />
                                                </IconButton>
                                                <Menu
                                                    anchorEl={get(anchorsEl, workProgram[WorkProgramGeneralFields.ID])}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    keepMounted
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    open={Boolean(get(anchorsEl, workProgram[WorkProgramGeneralFields.ID]))}
                                                    onClose={this.handleCloseMenu}
                                                    PopoverClasses={{
                                                        root: classes.popper,
                                                        paper: classes.menuPaper
                                                    }}
                                                >
                                                    <MenuItem onClick={this.handleClickDuplicate(workProgram[WorkProgramGeneralFields.ID])}>
                                                        <CopyIcon className={classes.menuIcon}/>
                                                        Клонировать
                                                    </MenuItem>

                                                    <MenuItem className={classes.menuLinkItem}>
                                                        <Link to={appRouter.getWorkProgramLink(workProgram[WorkProgramGeneralFields.ID])}>
                                                            <EditIcon className={classes.menuIcon} />
                                                            Редактировать
                                                        </Link>
                                                    </MenuItem>

                                                    <MenuItem onClick={this.handleClickDelete(workProgram[WorkProgramGeneralFields.ID])}>
                                                        <DeleteIcon className={classes.menuIcon} />
                                                        Удалить
                                                    </MenuItem>
                                                </Menu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </Scrollbars>

                <div className={classes.footer}>
                    <Pagination count={Math.ceil(allCount / 10)}
                                page={currentPage}
                                onChange={this.handleChangePage}
                                color="primary"
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

                <ConfirmDialog onConfirm={this.handleConfirmDuplicateDialog}
                               onDismiss={this.closeConfirmDuplicateDialog}
                               confirmText={'Клонируя рабочую программу, вы получите копию этой программы, которая не будет включена ни в один учебный план. Вы уверены, что хотите клонировать программу?'}
                               isOpen={Boolean(duplicateConfirmId)}
                               dialogTitle={'Клонировать учебную программу'}
                               confirmButtonText={'Клонировать'}
                />

                <CreateModal />
            </Paper>
        );
    }
}

// @ts-ignore
export default connect(withStyles(styles)(withRouter(WorkProgramList)));
