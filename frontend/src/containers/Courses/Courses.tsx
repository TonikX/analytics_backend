import React from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
// @ts-ignore
import Link from "react-router-dom/Link";
import Scrollbars from "react-custom-scrollbars";

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import withStyles from '@material-ui/core/styles/withStyles';

import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import SearchOutlined from "@material-ui/icons/SearchOutlined";

import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import CourseCreateModal from "./CourseCreateModal";
import {SortingType} from "../../components/SortingButton/types";

import {CoursesProps, CourseType} from './types';
import {CourseFields} from './enum';

import connect from './Courses.connect';
import styles from './Courses.styles';

class Courses extends React.Component<CoursesProps> {
    state = {
        deleteConfirmId: null
    }

    componentDidMount() {
        this.props.actions.getCourses();
    }

    handleClickDelete = (id: number) => () => {
        this.setState({
            deleteConfirmId: id
        });
    }

    handleConfirmDeleteDialog = () => {
        const {deleteConfirmId} = this.state;

        this.props.actions.deleteCourse(deleteConfirmId);
        this.closeConfirmDeleteDialog();
    }

    closeConfirmDeleteDialog = () => {
        this.setState({
            deleteConfirmId: null
        });
    }

    handleClickEdit = (course: CourseType) => () => {
        this.props.actions.openDialog(course);
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
        this.props.actions.getCourses();
    }, 300);

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        this.props.actions.changeCurrentPage(page + 1);
        this.props.actions.getCourses();
    }

    changeSorting = (field: string) => (mode: SortingType)=> {
        this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
        this.props.actions.getCourses();
    }

    render() {
        const {classes, courses, allCount, currentPage, sortingField, sortingMode} = this.props;
        const {deleteConfirmId} = this.state;

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Онлайн курсы

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
                                        Название курса
                                        <SortingButton changeMode={this.changeSorting(CourseFields.TITLE)}
                                                       mode={sortingField === CourseFields.TITLE ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Ссылка на курс
                                        <SortingButton changeMode={this.changeSorting(CourseFields.COURSE_URL)}
                                                       mode={sortingField === CourseFields.COURSE_URL ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Платформа
                                        <SortingButton changeMode={this.changeSorting(CourseFields.PLATFORM)}
                                                       mode={sortingField === CourseFields.PLATFORM ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        Описание
                                        <SortingButton changeMode={this.changeSorting(CourseFields.DESCRIPTION)}
                                                       mode={sortingField === CourseFields.DESCRIPTION ? sortingMode : ''}
                                        />
                                    </TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {courses.map(course =>
                                    <TableRow>
                                        <TableCell> {course[CourseFields.TITLE]} </TableCell>
                                        <TableCell>
                                            <Link to={course[CourseFields.COURSE_URL]} className={classes.link}>
                                                {course[CourseFields.COURSE_URL]}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {course[CourseFields.PLATFORM]}
                                        </TableCell>
                                        <TableCell>
                                            {course[CourseFields.DESCRIPTION]}
                                        </TableCell>

                                        <TableCell>
                                            <div className={classes.actions}>
                                                <IconButton onClick={this.handleClickDelete(course[CourseFields.ID])}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton onClick={this.handleClickEdit(course)}>
                                                    <EditIcon />
                                                </IconButton>
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
                               confirmText={'Вы точно уверены, что хотите удалить курс?'}
                               isOpen={Boolean(deleteConfirmId)}
                               dialogTitle={'Удалить онлайн курс'}
                               confirmButtonText={'Удалить'}
                />
            </Paper>
        );
    }
}

export default connect(withStyles(styles)(Courses));
