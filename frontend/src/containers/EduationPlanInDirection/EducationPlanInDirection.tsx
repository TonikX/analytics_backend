import React from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
// @ts-ignore
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

import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import {SortingType} from "../../components/SortingButton/types";
import CourseCreateModal from "./CreateModal";

import {DirectionFields} from "../Direction/enum";
import {EducationalPlanFields} from "../EducationalPlan/enum";
import {EducationPlanInDirectionFields} from './enum';

import {EducationalPlanInDirectionProps, EducationalPlanInDirectionType} from './types';

import connect from './EducationPlanInDirection.connect';
import styles from './EducationPlanInDirection.styles';

class EducationPlanInDirection extends React.Component<EducationalPlanInDirectionProps> {
    state = {
        deleteConfirmId: null
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

    render() {
        const {classes, educationalPlansInDirection, allCount, currentPage, sortingField, sortingMode} = this.props;
        const {deleteConfirmId} = this.state;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Реализация учебного плана в направлении

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
                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                            Направление
                            <SortingButton changeMode={this.changeSorting(EducationPlanInDirectionFields.DIRECTION)}
                                           mode={sortingField === EducationPlanInDirectionFields.DIRECTION ? sortingMode : ''}
                            />
                        </Typography>

                        <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                            Учебные планы
                            <SortingButton changeMode={this.changeSorting(EducationPlanInDirectionFields.EDUCATION_PLAN)}
                                           mode={sortingField === EducationPlanInDirectionFields.EDUCATION_PLAN ? sortingMode : ''}
                            />
                        </Typography>

                        <Typography className={classNames(classes.marginRight, classes.yearCell)}>
                            Год
                            <SortingButton changeMode={this.changeSorting(EducationPlanInDirectionFields.YEAR)}
                                           mode={sortingField === EducationPlanInDirectionFields.YEAR ? sortingMode : ''}
                            />
                        </Typography>
                    </div>

                    <div className={classes.list}>
                        <Scrollbars>
                            {educationalPlansInDirection.map(educationalPlanInDirection =>
                                <div className={classes.row} key={educationalPlanInDirection[EducationPlanInDirectionFields.ID]}>
                                    <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                                        {educationalPlanInDirection[EducationPlanInDirectionFields.DIRECTION][DirectionFields.TITLE]}
                                    </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                                        {educationalPlanInDirection[EducationPlanInDirectionFields.EDUCATION_PLAN][EducationalPlanFields.PROFILE]}
                                    </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.yearCell)}>
                                        {educationalPlanInDirection[EducationPlanInDirectionFields.YEAR]}
                                    </Typography>
                                    <div className={classes.actions}>
                                        <IconButton onClick={this.handleClickDelete(educationalPlanInDirection[EducationPlanInDirectionFields.ID])}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton onClick={this.handleClickEdit(educationalPlanInDirection)}>
                                            <EditIcon />
                                        </IconButton>
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
