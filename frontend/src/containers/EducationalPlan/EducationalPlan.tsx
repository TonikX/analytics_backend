import React, {SyntheticEvent} from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import moment from 'moment';
import {Link, withRouter} from 'react-router-dom'

import Scrollbars from "react-custom-scrollbars";

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from '@material-ui/core/styles/withStyles';
import Menu from "@material-ui/core/Menu";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import EyeIcon from "@material-ui/icons/VisibilityOutlined";
import SettingsIcon from "@material-ui/icons/MoreVert";

import CreateModal from "./CreateModal";
import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import {SortingType} from "../../components/SortingButton/types";

import {EducationalPlanProps, EducationalPlanType} from './types';
import {FULL_DATE_FORMAT} from "../../common/utils";
import {specialization, specializationObject} from "../WorkProgram/constants";
import {EducationalPlanFields} from './enum';

import {appRouter} from "../../service/router-service";

import connect from './EducationalPlan.connect';
import styles from './EducationalPlan.styles';
import {DirectionFields} from "../Direction/enum";
import {DirectionType} from "../Direction/types";

class EducationalPlan extends React.Component<EducationalPlanProps> {
    state = {
        deleteConfirmId: null,
        anchorsEl: {}
    }

    componentDidMount() {
        this.props.actions.getEducationalPlans();
    }

    componentWillUnmount() {
        this.props.actions.pageDown();
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

    goToDetailView = (id: number) => () => {
        // @ts-ignore
        let {history} = this.props;

        history.push(appRouter.getPlanDetailLink(id));
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
        this.props.actions.getEducationalPlans();
    }, 300);

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        this.props.actions.changeCurrentPage(page + 1);
        this.props.actions.getEducationalPlans();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getEducationalPlans();
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

    render() {
        const {classes, educationalPlan, allCount, currentPage, sortingField, sortingMode, canAddNewPlan} = this.props;
        const {deleteConfirmId} = this.state;

        const {anchorsEl} = this.state;

        return (
            <Paper className={classes.root}>
                <div className={classes.titleWrap}>
                    <Typography className={classes.title}>Учебные планы</Typography>

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
                </div>

                <Scrollbars>
                    <div className={classes.tableWrap}>
                        <Table stickyHeader size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Образовательная программа
                                        <SortingButton changeMode={this.changeSorting(EducationalPlanFields.PROFILE)}
                                                       mode={sortingField === EducationalPlanFields.PROFILE ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell className={classes.displayFlex}>
                                        <div className={classes.headerCellTitle}> Год набора </div>
                                        <SortingButton changeMode={this.changeSorting(EducationalPlanFields.YEAR)}
                                                       mode={sortingField === EducationalPlanFields.YEAR ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Уровень образования
                                        <SortingButton changeMode={this.changeSorting(EducationalPlanFields.QUALIFICATION)}
                                                       mode={sortingField === EducationalPlanFields.QUALIFICATION ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Направления
                                    </TableCell>

                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {educationalPlan.map(plan =>
                                    <TableRow key={plan[EducationalPlanFields.ID]}>
                                        <TableCell>{get(plan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.TITLE], '')}</TableCell>
                                        <TableCell>{get(plan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.YEAR], '')}</TableCell>
                                        <TableCell>
                                            {specializationObject[get(plan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.QUALIFICATION], '')]}
                                        </TableCell>

                                        <TableCell>{get(plan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.FIELD_OF_STUDY], []).map((fieldOfStudy: DirectionType) =>
                                            <> {fieldOfStudy[DirectionFields.TITLE]}  {fieldOfStudy[DirectionFields.NUMBER]} <br /> </>
                                        )}</TableCell>

                                        <TableCell style={{padding: '0 !important'}}>
                                            <div className={classes.actions}>
                                                <IconButton
                                                    aria-haspopup="true"
                                                    onClick={this.handleMenu(plan[EducationalPlanFields.ID])}
                                                    color="inherit"
                                                >
                                                    <SettingsIcon />
                                                </IconButton>
                                                <Menu
                                                    anchorEl={get(anchorsEl, plan[EducationalPlanFields.ID])}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    keepMounted
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    open={Boolean(get(anchorsEl, plan[EducationalPlanFields.ID]))}
                                                    onClose={this.handleCloseMenu}
                                                    PopoverClasses={{
                                                        root: classes.popper,
                                                        paper: classes.menuPaper
                                                    }}
                                                >
                                                    <MenuItem className={classes.menuLinkItem}>
                                                        <Link to={appRouter.getPlanDetailLink(plan[EducationalPlanFields.ID])}>
                                                            <EyeIcon className={classes.menuIcon}/>
                                                            Смотреть детально
                                                        </Link>
                                                    </MenuItem>

                                                    {/*{plan[EducationalPlanFields.CAN_EDIT] &&*/}
                                                    {/*    <MenuItem onClick={this.handleClickEdit(plan)}>*/}
                                                    {/*        <EditIcon className={classes.menuIcon}/>*/}
                                                    {/*        Редактировать*/}
                                                    {/*    </MenuItem>*/}
                                                    {/*}*/}

                                                    {plan[EducationalPlanFields.CAN_EDIT] &&
                                                        <MenuItem
                                                            onClick={this.handleClickDelete(plan[EducationalPlanFields.ID])}>
                                                            <DeleteIcon className={classes.menuIcon}/>
                                                            Удалить
                                                        </MenuItem>
                                                    }
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
                    <TablePagination count={allCount}
                                     component="div"
                                     page={currentPage - 1}
                                     rowsPerPageOptions={[]}
                                     onChangePage={this.handleChangePage}
                                     //@ts-ignore
                                     rowsPerPage={10}
                                     onChangeRowsPerPage={()=>{}}
                    />

                    {canAddNewPlan &&
                        <Fab color="secondary"
                             classes={{
                                 root: classes.addIcon
                             }}
                             onClick={this.handleCreate}
                        >
                            <AddIcon/>
                        </Fab>
                    }
                </div>

                {canAddNewPlan && <CreateModal/>}

                <ConfirmDialog onConfirm={this.handleConfirmDeleteDialog}
                               onDismiss={this.closeConfirmDeleteDialog}
                               confirmText={'Вы точно уверены, что хотите удалить учебный план?'}
                               isOpen={Boolean(deleteConfirmId)}
                               dialogTitle={'Удалить учебный план'}
                               confirmButtonText={'Удалить'}
                />
            </Paper>
        );
    }
}

// @ts-ignore
export default connect(withStyles(styles)(withRouter(EducationalPlan)));
