import React from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';



import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";


import withStyles from '@material-ui/core/styles/withStyles';

import AddIcon from "@material-ui/icons/Add";

import SearchOutlined from "@material-ui/icons/SearchOutlined";

import ConfirmDialog from "../../components/ConfirmDialog";

//import CourseCreateModal from "./CourseCreateModal";
import {SortingType} from "../../components/SortingButton/types";

import {CoursesProps, CourseType} from './types';


import connect from './Courses.connect';
import styles from './Courses.styles';
import { CoursesTable } from './CoursesTable/CoursesTable'

class OnlineCourses extends React.Component<CoursesProps> {
  state = {
      deleteConfirmId: null
  }

  componentDidMount() {
      this.props.actions.getCourses();
  }

  handleClickDelete = (id: number): void => {
      this.setState({
          deleteConfirmId: id
      });
  }

  handleConfirmDeleteDialog = (): void => {
      const {deleteConfirmId} = this.state;

      this.props.actions.deleteCourse(deleteConfirmId);
      this.closeConfirmDeleteDialog();
  }

  closeConfirmDeleteDialog = (): void => {
      this.setState({
          deleteConfirmId: null
      });
  }

  handleClickEdit = (course: CourseType): void => {
    console.log('handleClickEdit', course.id);
    this.props.actions.openDialog(course);
  }

  handleCreate = (): void => {
    this.props.actions.openDialog();
  }

  handleChangeSearchQuery = (event: React.ChangeEvent): void => {
    this.changeSearch(get(event, 'target.value', ''));
  }

  changeSearch = debounce((value: string): void => {
    this.props.actions.changeSearchQuery(value);
    this.props.actions.changeCurrentPage(1);
    this.props.actions.getCourses();
  }, 300);

  handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number): void => {
      this.props.actions.changeCurrentPage(page + 1);
      this.props.actions.getCourses();
  }


  render() {
    const {classes, courses, allCount, currentPage, sortingField, sortingMode} = this.props;
    const {deleteConfirmId} = this.state;

    return (
      <Paper className={classes.root}>
        <Typography className={classes.title}>
            Онлайн курсы

            <TextField 
              placeholder="Поиск"
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

        <CoursesTable 
          courses={courses} 
          sortingField={sortingField} 
          sortingMode={sortingMode} 
          handleClickDelete={(id: number) => this.handleClickDelete(id)} 
          handleClickEdit={(course: CourseType) => this.handleClickEdit(course)}
        />

        <div className={classes.footer}>
          <TablePagination 
            count={allCount}
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

        {/* <CourseCreateModal /> */}

        <ConfirmDialog 
          onConfirm={this.handleConfirmDeleteDialog}
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

export default connect(withStyles(styles)(OnlineCourses));
