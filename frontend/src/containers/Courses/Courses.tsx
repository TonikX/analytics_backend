import React from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
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

                <div className={classes.courseTableWrap}>
                    <div className={classNames(classes.course, classes.header)}>
                        <Typography className={classNames(classes.marginRight, classes.courseTitle)}>
                            Название курса
                            <SortingButton changeMode={this.changeSorting(CourseFields.TITLE)}
                                           mode={sortingField === CourseFields.TITLE ? sortingMode : ''}
                            />
                        </Typography>
                        <Typography className={classNames(classes.marginRight, classes.courseLink)}>
                            Ссылка на курс
                            <SortingButton changeMode={this.changeSorting(CourseFields.COURSE_URL)}
                                           mode={sortingField === CourseFields.COURSE_URL ? sortingMode : ''}
                            />
                        </Typography>
                        <Typography className={classNames(classes.marginRight, classes.coursePlatform)}>
                            Платформа
                            <SortingButton changeMode={this.changeSorting(CourseFields.PLATFORM)}
                                           mode={sortingField === CourseFields.PLATFORM ? sortingMode : ''}
                            />
                        </Typography>
                        <Typography className={classNames(classes.marginRight, classes.courseDescription)}>
                            Описание
                            <SortingButton changeMode={this.changeSorting(CourseFields.DESCRIPTION)}
                                           mode={sortingField === CourseFields.DESCRIPTION ? sortingMode : ''}
                            />
                        </Typography>
                    </div>

                    <div className={classes.courseList}>
                        <Scrollbars>
                            {courses.map(course =>
                                <div className={classes.course} key={course[CourseFields.ID]}>
                                    <Typography className={classNames(classes.marginRight, classes.courseTitle)}> {course[CourseFields.TITLE]} </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.courseLink)}>
                                        <Link to={course[CourseFields.COURSE_URL]} className={classes.link}>
                                            {course[CourseFields.COURSE_URL]}
                                        </Link>
                                    </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.coursePlatform)}>
                                        {course[CourseFields.PLATFORM]}
                                    </Typography>
                                    <Typography className={classNames(classes.marginRight, classes.courseDescription)}>
                                        {course[CourseFields.DESCRIPTION]}
                                    </Typography>
                                    <div className={classes.actions}>
                                        <IconButton onClick={this.handleClickDelete(course[CourseFields.ID])}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton onClick={this.handleClickEdit(course)}>
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
