import React, {SyntheticEvent} from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';

import Scrollbars from "react-custom-scrollbars-2";

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

import {withStyles} from '@mui/styles';

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EyeIcon from '@mui/icons-material/VisibilityOutlined';
import SearchOutlined from "@mui/icons-material/SearchOutlined";

import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import {SortingType} from "../../components/SortingButton/types";
import CourseCreateModal from "./CreateModal";

import {EducationProgramFields} from './enum';

import {appRouter} from "../../service/router-service";

import {
    EducationalProgramProps,
    EducationalProgramType
} from './types';

import {specializationObject} from "../WorkProgram/constants";
import {getUserFullName} from "../../common/utils";
import {getEducationPlanInDirectionFullName} from "../EduationPlanInDirection/getters";
import TableSettingsMenu from "../../components/TableSettingsMenu";

import connect from './EducationalProgram.connect';
import styles from './EducationalProgram.styles';
import Pagination from "@mui/lab/Pagination";

class EducationalProgram extends React.Component<EducationalProgramProps> {
    state = {
        deleteConfirmId: null,
        anchorsEl: {}
    }

    componentDidMount() {
        this.props.actions.getEducationalProgramList();
    }

    handleClickDelete = (id: number) => () => {
        this.setState({
            deleteConfirmId: id
        });
    }

    handleConfirmDeleteDialog = () => {
        const {deleteConfirmId} = this.state;

        this.props.actions.deleteEducationalProgram(deleteConfirmId);
        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteConfirmId: null
        });
    }

    handleClickEdit = (program: EducationalProgramType) => () => {
        this.props.actions.openDialog(program);
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
        this.props.actions.getEducationalProgramList();
    }, 300);

    handleChangePage = (event: any, page: number) => {
        this.props.actions.changeCurrentPage(page);
        this.props.actions.getEducationalProgramList();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getEducationalProgramList();
    }

    handleOpenMenu = (id: number) => (event: SyntheticEvent): void => {
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
        //@ts-ignore
        const {classes} = this.props;
        const {educationalProgram, allCount, currentPage, sortingField, sortingMode, canAddNew} = this.props;
        const {deleteConfirmId, anchorsEl} = this.state;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Общие характеристики

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
                                        Образовательная программа
                                        {/*<SortingButton changeMode={this.changeSorting(EducationProgramFields.ACADEMIC_PLAN_FOR_EP)}*/}
                                        {/*               mode={sortingField === EducationProgramFields.ACADEMIC_PLAN_FOR_EP ? sortingMode : ''}*/}
                                        {/*/>*/}
                                    </TableCell>
                                    <TableCell>
                                        Уровень образования
                                        {/*<SortingButton changeMode={this.changeSorting(EducationProgramFields.QUALIFICATION)}*/}
                                        {/*               mode={sortingField === EducationProgramFields.QUALIFICATION ? sortingMode : ''}*/}
                                        {/*/>*/}
                                    </TableCell>
                                    <TableCell>
                                        Год начала
                                        {/*<SortingButton changeMode={this.changeSorting(EducationProgramFields.YEAR)}*/}
                                        {/*               mode={sortingField === EducationProgramFields.YEAR ? sortingMode : ''}*/}
                                        {/*/>*/}
                                    </TableCell>
                                    <TableCell>
                                        Направление подготовки
                                        {/*<SortingButton changeMode={this.changeSorting(EducationProgramFields.MANAGER)}*/}
                                        {/*               mode={sortingField === EducationProgramFields.MANAGER ? sortingMode : ''}*/}
                                        {/*/>*/}
                                    </TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {educationalProgram.map((educationalProgram: any) =>
                                    <TableRow key={educationalProgram[EducationProgramFields.ID]}>
                                        <TableCell>
                                            {educationalProgram?.educational_program?.map((item: any) => item?.title).join(', ')}
                                        </TableCell>
                                        <TableCell>
                                            {specializationObject[educationalProgram?.educational_program?.[0]?.qualification]}
                                        </TableCell>
                                        <TableCell>
                                            {educationalProgram?.educational_program?.[0]?.year}
                                        </TableCell>
                                        <TableCell>
                                            {educationalProgram?.educational_program?.map((item: any) => (
                                              item?.field_of_study?.[0]?.title + ' ' + item?.field_of_study?.[0]?.number
                                            )).join(', ')}
                                        </TableCell>
                                        <TableCell>
                                            <TableSettingsMenu menuItems={[
                                                {
                                                    text: 'Характеристика',
                                                    icon: <EyeIcon/>,
                                                    link: appRouter.getEducationalProgramCharacteristicLink(educationalProgram[EducationProgramFields.ID])
                                                },
                                                ...educationalProgram[EducationProgramFields.CAN_EDIT] ? [{
                                                    text: 'Удалить',
                                                    icon: <DeleteIcon/>,
                                                    handleClickItem: this.handleClickDelete(educationalProgram[EducationProgramFields.ID]),
                                                }] : []
                                            ]}
                                                               handleOpenMenu={this.handleOpenMenu(educationalProgram[EducationProgramFields.ID])}
                                                               handleCloseMenu={this.handleCloseMenu}
                                                               anchorEl={get(anchorsEl, educationalProgram[EducationProgramFields.ID])}
                                            />
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
                    {canAddNew &&
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

                {canAddNew &&
                  //@ts-ignore
                  <CourseCreateModal />
                }

                <ConfirmDialog onConfirm={this.handleConfirmDeleteDialog}
                               onDismiss={this.closeConfirmDeleteDialog}
                               confirmText={'Вы точно уверены, что хотите удалить образовательную программу?'}
                               isOpen={Boolean(deleteConfirmId)}
                               dialogTitle={'Удалить образовательную программу'}
                               confirmButtonText={'Удалить'}
                />
            </Paper>
        );
    }
}

//@ts-ignore
export default connect(withStyles(styles)(EducationalProgram));
