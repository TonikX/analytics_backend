import React, {SyntheticEvent} from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import moment from 'moment';
import Scrollbars from "react-custom-scrollbars";

import {Link} from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import withStyles from '@material-ui/core/styles/withStyles';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import Pagination from '@material-ui/lab/Pagination';

import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import SettingsIcon from "@material-ui/icons/MoreVert";
import CopyIcon from "@material-ui/icons/FileCopyOutlined";

import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import {SortingType} from "../../components/SortingButton/types";
import CustomizeExpansionPanel from "../../components/CustomizeExpansionPanel";

import CreateModal from "./CreateModal";
import Filters from "./Filters";

import {FULL_DATE_FORMAT} from "../../common/utils";
import {appRouter} from "../../service/router-service";

import {specialization} from "../WorkProgram/constants";
import {WorkProgramGeneralFields} from '../WorkProgram/enum';
import {filterFields} from "./enum";
import {WorkProgramListProps} from './types';

import connect from './WorkProgramList.connect';
import styles from './WorkProgramList.styles';

class WorkProgramList extends React.Component<WorkProgramListProps> {
    state = {
        deleteConfirmId: null,
        duplicateConfirmId: null,
        anchorsEl: {},
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

    render() {
        const {classes, workProgramList, allCount, currentPage, sortingField, sortingMode, showOnlyMy} = this.props;
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
                                {workProgramList.map(workProgram =>
                                    <TableRow key={workProgram[WorkProgramGeneralFields.ID]}>
                                        <TableCell>
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
                    <Pagination count={allCount}
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
export default connect(withStyles(styles)(WorkProgramList));
