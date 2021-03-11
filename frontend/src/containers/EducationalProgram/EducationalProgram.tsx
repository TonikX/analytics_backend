import React, {SyntheticEvent} from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';

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

import withStyles from '@material-ui/core/styles/withStyles';

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EyeIcon from '@material-ui/icons/VisibilityOutlined';
import SearchOutlined from "@material-ui/icons/SearchOutlined";

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

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        this.props.actions.changeCurrentPage(page + 1);
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
        const {classes, educationalProgram, allCount, currentPage, sortingField, sortingMode, canAddNew} = this.props;
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
                                        Учебный план
                                        <SortingButton changeMode={this.changeSorting(EducationProgramFields.ACADEMIC_PLAN_FOR_EP)}
                                                       mode={sortingField === EducationProgramFields.ACADEMIC_PLAN_FOR_EP ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Квалификация
                                        <SortingButton changeMode={this.changeSorting(EducationProgramFields.QUALIFICATION)}
                                                       mode={sortingField === EducationProgramFields.QUALIFICATION ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Год начала
                                        <SortingButton changeMode={this.changeSorting(EducationProgramFields.YEAR)}
                                                       mode={sortingField === EducationProgramFields.YEAR ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Руководитель
                                        <SortingButton changeMode={this.changeSorting(EducationProgramFields.MANAGER)}
                                                       mode={sortingField === EducationProgramFields.MANAGER ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {educationalProgram.map(educationalProgram =>
                                    <TableRow key={educationalProgram[EducationProgramFields.ID]}>
                                        <TableCell>
                                            {getEducationPlanInDirectionFullName(educationalProgram[EducationProgramFields.ACADEMIC_PLAN_FOR_EP])}
                                        </TableCell>
                                        <TableCell>
                                            {get(specializationObject, educationalProgram[EducationProgramFields.QUALIFICATION], '')}
                                        </TableCell>
                                        <TableCell>
                                            {educationalProgram[EducationProgramFields.YEAR]}
                                        </TableCell>
                                        <TableCell>
                                            {getUserFullName(educationalProgram[EducationProgramFields.MANAGER])}
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
                    <TablePagination count={allCount}
                                     component="div"
                                     page={currentPage - 1}
                                     rowsPerPageOptions={[]}
                                     onChangePage={this.handleChangePage}
                                     //@ts-ignore
                                     rowsPerPage={10}
                                     onChangeRowsPerPage={()=>{}}
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

                {canAddNew && <CourseCreateModal />}

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

export default connect(withStyles(styles)(EducationalProgram));
