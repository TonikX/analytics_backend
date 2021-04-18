import React, {SyntheticEvent} from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import classNames from 'classnames';
import {Link} from "react-router-dom";

import Scrollbars from "react-custom-scrollbars";

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import withStyles from '@material-ui/core/styles/withStyles';

import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import CreateIcon from "@material-ui/icons/NoteAddOutlined";
import SettingsIcon from "@material-ui/icons/MoreVert";

import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import {SortingType} from "../../components/SortingButton/types";
import CourseCreateModal from "./CreateModal";

import {DirectionFields} from "../Direction/enum";
import {EducationalPlanFields} from "../EducationalPlan/enum";
import {EducationPlanInDirectionFields} from './enum';

import {appRouter} from "../../service/router-service";

import {EducationalPlanInDirectionProps, EducationalPlanInDirectionType} from './types';

import connect from './EducationPlanInDirection.connect';
import styles from './EducationPlanInDirection.styles';

class EducationPlanInDirection extends React.Component<EducationalPlanInDirectionProps> {
    state = {
        deleteConfirmId: null,
        anchorsEl: {}
    }

    componentDidMount() {
        this.props.actions.getEducationalPlansInDirection();
    }

    handleClickDelete = (id: number) => () => {
        this.setState({
            deleteConfirmId: id
        });
    }

    handleConfirmDeleteDialog = () => {
        const {deleteConfirmId} = this.state;

        this.props.actions.deleteEducationalPlanInDirection(deleteConfirmId);
        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteConfirmId: null
        });
    }

    handleClickEdit = (competence: EducationalPlanInDirectionType) => () => {
        this.props.actions.openDialog(competence);
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
        this.props.actions.getEducationalPlansInDirection();
    }, 300);

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        this.props.actions.changeCurrentPage(page + 1);
        this.props.actions.getEducationalPlansInDirection();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getEducationalPlansInDirection();
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

    handleCreatePlan = (id: number) => () => {
        this.props.actions.createIndividualEducationalPlan(id);
        this.handleCloseMenu();
    };

    render() {
        const {classes, educationalPlansInDirection, allCount, currentPage, sortingField, sortingMode, canEdit} = this.props;
        const {deleteConfirmId, anchorsEl} = this.state;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Образовательные программы

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

                <Scrollbars>
                    <div className={classes.tableWrap}>
                        <Table stickyHeader size='small'>
                            <TableHead className={classes.header}>
                                <TableRow>
                                    <TableCell>
                                        Направление
                                        <SortingButton changeMode={this.changeSorting(EducationPlanInDirectionFields.DIRECTION)}
                                                       mode={sortingField === EducationPlanInDirectionFields.DIRECTION ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Номер направления
                                        <SortingButton changeMode={this.changeSorting(EducationPlanInDirectionFields.NUMBER)}
                                                       mode={sortingField === EducationPlanInDirectionFields.NUMBER ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Учебный план
                                        <SortingButton changeMode={this.changeSorting(EducationPlanInDirectionFields.EDUCATION_PLAN)}
                                                       mode={sortingField === EducationPlanInDirectionFields.EDUCATION_PLAN ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Год
                                        <SortingButton changeMode={this.changeSorting(EducationPlanInDirectionFields.YEAR)}
                                                       mode={sortingField === EducationPlanInDirectionFields.YEAR ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Реализатор
                                    </TableCell>
                                    {canEdit && <TableCell />}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {educationalPlansInDirection.map(educationalPlanInDirection =>
                                    <TableRow key={educationalPlanInDirection[EducationPlanInDirectionFields.ID]}
                                              className={classNames({[classes.bigRow]: !canEdit})}
                                    >
                                        <TableCell>
                                            {educationalPlanInDirection[EducationPlanInDirectionFields.DIRECTION][DirectionFields.TITLE]}
                                        </TableCell>
                                        <TableCell>
                                            {educationalPlanInDirection[EducationPlanInDirectionFields.DIRECTION][DirectionFields.NUMBER]}
                                        </TableCell>
                                        <TableCell>
                                            <Link to={appRouter.getPlanDetailLink(educationalPlanInDirection[EducationPlanInDirectionFields.EDUCATION_PLAN][EducationalPlanFields.ID])}
                                                  target="_blank"
                                                  className={classes.link}
                                            >
                                                {educationalPlanInDirection[EducationPlanInDirectionFields.EDUCATION_PLAN][EducationalPlanFields.PROFILE]}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {educationalPlanInDirection[EducationPlanInDirectionFields.YEAR]}
                                        </TableCell>
                                        <TableCell>
                                            {educationalPlanInDirection[EducationPlanInDirectionFields.DIRECTION][DirectionFields.FACULTY]}
                                        </TableCell>
                                        {canEdit &&
                                            <TableCell>
                                              <div className={classes.actions}>
                                                <IconButton
                                                  aria-haspopup="true"
                                                  onClick={this.handleMenu(educationalPlanInDirection[EducationPlanInDirectionFields.ID])}
                                                  color="inherit"
                                                >
                                                  <SettingsIcon />
                                                </IconButton>
                                                <Menu
                                                  anchorEl={get(anchorsEl, educationalPlanInDirection[EducationPlanInDirectionFields.ID])}
                                                  anchorOrigin={{
                                                      vertical: 'top',
                                                      horizontal: 'right',
                                                  }}
                                                  keepMounted
                                                  transformOrigin={{
                                                      vertical: 'top',
                                                      horizontal: 'right',
                                                  }}
                                                  open={Boolean(get(anchorsEl, educationalPlanInDirection[EducationPlanInDirectionFields.ID]))}
                                                  onClose={this.handleCloseMenu}
                                                  PopoverClasses={{
                                                      root: classes.popper,
                                                      paper: classes.menuPaper
                                                  }}
                                                >
                                                  <MenuItem className={classes.menuLinkItem}
                                                            onClick={this.handleCreatePlan(educationalPlanInDirection[EducationPlanInDirectionFields.ID])}
                                                  >
                                                    <CreateIcon className={classes.menuIcon} />
                                                    Создать индивидуальный <br /> учебный план
                                                  </MenuItem>
                                                  <MenuItem className={classes.menuLinkItem}
                                                            onClick={this.handleClickDelete(educationalPlanInDirection[EducationPlanInDirectionFields.ID])}
                                                  >
                                                    <DeleteIcon className={classes.menuIcon} />
                                                    Удалить
                                                  </MenuItem>
                                                  <MenuItem className={classes.menuLinkItem}
                                                            onClick={this.handleClickEdit(educationalPlanInDirection)}
                                                  >
                                                    <EditIcon className={classes.menuIcon} />
                                                    Изменить
                                                  </MenuItem>
                                                </Menu>
                                              </div>
                                            </TableCell>
                                        }
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

                    {canEdit &&
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

                {canEdit && <CourseCreateModal />}

                <ConfirmDialog onConfirm={this.handleConfirmDeleteDialog}
                               onDismiss={this.closeConfirmDeleteDialog}
                               confirmText={'Вы точно уверены, что хотите удалить реализацию учебного плана?'}
                               isOpen={Boolean(deleteConfirmId)}
                               dialogTitle={'Удалить реализацию учебного плана'}
                               confirmButtonText={'Удалить'}
                />
            </Paper>
        );
    }
}

export default connect(withStyles(styles)(EducationPlanInDirection));
