import React, {SyntheticEvent} from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import moment from 'moment';
// @ts-ignore
import Link from "react-router-dom/Link";
import Scrollbars from "react-custom-scrollbars";

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
import MenuItem from "@material-ui/core/MenuItem";
import EyeIcon from "@material-ui/icons/VisibilityOutlined";
import SettingsIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";

import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import CourseCreateModal from "./CreateModal";
import {SortingType} from "../../components/SortingButton/types";

import {EducationalPlanProps, EducationalPlanType} from './types';
import {EducationalPlanFields} from './enum';

import {appRouter} from "../../service/router-service";

import connect from './EducationalPlan.connect';
import styles from './EducationalPlan.styles';

class EducationalPlan extends React.Component<EducationalPlanProps> {
    state = {
        deleteConfirmId: null,
        anchorEl: null
    }

    componentDidMount() {
        this.props.actions.getEducationalPlans();
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

    handleMenu = (event: SyntheticEvent): void => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleCloseMenu = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {classes, educationalPlan, allCount, currentPage, sortingField, sortingMode} = this.props;
        const {deleteConfirmId} = this.state;

        const {anchorEl} = this.state;

        const isOpenEditMenu = Boolean(anchorEl);

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Учебный план

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
                        <Typography className={classNames(classes.marginRight, classes.dateCell)}>
                            Дата согласования
                            <SortingButton changeMode={this.changeSorting(EducationalPlanFields.PROFILE)}
                                           mode={sortingField === EducationalPlanFields.PROFILE ? sortingMode : ''}
                            />
                        </Typography>

                        <Typography className={classNames(classes.marginRight, classes.numberCell)}>
                            Номер
                            <SortingButton changeMode={this.changeSorting(EducationalPlanFields.NUMBER)}
                                           mode={sortingField === EducationalPlanFields.NUMBER ? sortingMode : ''}
                            />
                        </Typography>
                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                            Профиль
                            <SortingButton changeMode={this.changeSorting(EducationalPlanFields.PROFILE)}
                                           mode={sortingField === EducationalPlanFields.PROFILE ? sortingMode : ''}
                            />
                        </Typography>

                    </div>

                    <div className={classes.list}>
                        <Scrollbars>
                            {educationalPlan.map(plan =>
                                <div className={classes.row} key={plan[EducationalPlanFields.ID]}>
                                    <Typography className={classNames(classes.marginRight, classes.dateCell)}>
                                        {moment(plan[EducationalPlanFields.APPROVAL_DATE]).format('DD.MM.YYYY')}
                                    </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.numberCell)}> {plan[EducationalPlanFields.NUMBER]} </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.titleCell)}> {plan[EducationalPlanFields.PROFILE]} </Typography>

                                    <div className={classes.actions}>
                                        <IconButton
                                            aria-haspopup="true"
                                            onClick={this.handleMenu}
                                            color="inherit"
                                        >
                                            <SettingsIcon />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={isOpenEditMenu}
                                            onClose={this.handleCloseMenu}
                                            PopoverClasses={{
                                                root: classes.popper,
                                                paper: classes.menuPaper
                                            }}
                                        >
                                            <Link to={appRouter.getPlanDetailLink(plan[EducationalPlanFields.ID])}
                                                  className={classes.menuLink}
                                            >
                                                <MenuItem>
                                                    <EyeIcon className={classes.menuIcon}/>
                                                    Смотреть детально
                                                </MenuItem>
                                            </Link>

                                            <MenuItem onClick={this.handleClickEdit(plan)}>
                                                <EditIcon className={classes.menuIcon} />
                                                Редактировать
                                            </MenuItem>

                                            <MenuItem onClick={this.handleClickDelete(plan[EducationalPlanFields.ID])}>
                                                <DeleteIcon className={classes.menuIcon} />
                                                Удалить
                                            </MenuItem>
                                        </Menu>
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

                <CourseCreateModal />

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

export default connect(withStyles(styles)(EducationalPlan));
