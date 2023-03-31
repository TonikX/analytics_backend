import React, {SyntheticEvent} from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import classNames from 'classnames';

import Scrollbars from "react-custom-scrollbars";

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import withStyles from '@mui/material/styles/withStyles';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import CreateIcon from "@mui/icons-material/NoteAddOutlined";
import SettingsIcon from "@mui/icons-material/MoreVert";

import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import {SortingType} from "../../components/SortingButton/types";
import CourseCreateModal from "./CreateModal";

import {DirectionFields} from "../Direction/enum";
import {EducationPlanInDirectionFields} from './enum';

import {EducationalPlanInDirectionProps, EducationalPlanInDirectionType} from './types';

import CustomizeExpansionPanel from "../../components/CustomizeExpansionPanel";
import {specializationObject} from "../WorkProgram/constants";
import Filters from "./Filters";

import connect from './EducationPlanInDirection.connect';
import styles from './EducationPlanInDirection.styles';


class EducationPlanInDirection extends React.Component<EducationalPlanInDirectionProps> {
    state = {
        deleteConfirmId: null,
        anchorsEl: {},
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

                <CustomizeExpansionPanel label="Фильтрация" details={<Filters />}/>

                <Scrollbars>
                    <div className={classes.tableWrap}>
                        <Table stickyHeader size='small'>
                            <TableHead className={classes.header}>
                                <TableRow>
                                    <TableCell>
                                        Номер
                                        <SortingButton changeMode={this.changeSorting(DirectionFields.NUMBER)}
                                                       mode={sortingField === DirectionFields.NUMBER ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Направление
                                        <SortingButton changeMode={this.changeSorting(EducationPlanInDirectionFields.DIRECTION)}
                                                       mode={sortingField === EducationPlanInDirectionFields.DIRECTION ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Квалификация
                                        <SortingButton changeMode={this.changeSorting(DirectionFields.QUALIFICATION)}
                                                       mode={sortingField === DirectionFields.QUALIFICATION ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Образовательная программа
                                        <SortingButton changeMode={this.changeSorting(EducationPlanInDirectionFields.TITLE)}
                                                       mode={sortingField === EducationPlanInDirectionFields.TITLE ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Год
                                        <SortingButton changeMode={this.changeSorting(EducationPlanInDirectionFields.YEAR)}
                                                       mode={sortingField === EducationPlanInDirectionFields.YEAR ? sortingMode : ''}
                                        />
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
                                            {get(educationalPlanInDirection, [EducationPlanInDirectionFields.DIRECTION, 0, DirectionFields.NUMBER], '')}
                                        </TableCell>
                                        <TableCell>
                                            {get(educationalPlanInDirection, [EducationPlanInDirectionFields.DIRECTION, 0, DirectionFields.TITLE], '')}
                                        </TableCell>
                                        <TableCell>
                                            {specializationObject[get(educationalPlanInDirection, [EducationPlanInDirectionFields.DIRECTION, 0, DirectionFields.QUALIFICATION], '')]}
                                        </TableCell>
                                        <TableCell>
                                            {educationalPlanInDirection[EducationPlanInDirectionFields.TITLE]}
                                        </TableCell>
                                        <TableCell>
                                            {educationalPlanInDirection[EducationPlanInDirectionFields.YEAR]}
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
                                                  {/*<MenuItem className={classes.menuLinkItem}*/}
                                                  {/*          onClick={this.handleClickEdit(educationalPlanInDirection)}*/}
                                                  {/*>*/}
                                                  {/*  <EditIcon className={classes.menuIcon} />*/}
                                                  {/*  Изменить*/}
                                                  {/*</MenuItem>*/}
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

                    {/*{canEdit &&*/}
                    {/*    <Fab color="secondary"*/}
                    {/*         classes={{*/}
                    {/*             root: classes.addIcon*/}
                    {/*         }}*/}
                    {/*         onClick={this.handleCreate}*/}
                    {/*    >*/}
                    {/*        <AddIcon/>*/}
                    {/*    </Fab>*/}
                    {/*}*/}
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
