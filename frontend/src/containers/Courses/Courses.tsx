import React from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
import SearchOutlined from "@material-ui/icons/SearchOutlined";

import CustomizeExpansionPanel from "../../components/CustomizeExpansionPanel";
import { CoursesTable } from './CoursesTable/CoursesTable'
import { Filters } from './Filters/Filters'

import withStyles from '@material-ui/core/styles/withStyles';

import {CoursesProps} from './types';

import connect from './Courses.connect';
import styles from './Courses.styles';

class OnlineCourses extends React.Component<CoursesProps> {
  componentDidMount() {      
      this.props.actions.getPlatforms()
      this.props.actions.getInstitutions()
      this.props.actions.getFieldOfStudyNumbers()
      this.props.actions.getFieldOfStudyTitles()
      this.props.actions.getCourses();
  }

  // handleCreate = (): void => {
  //   this.props.actions.openDialog();
  // }

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
    const {classes, courses, allCount, currentPage, sortingField, sortingMode } = this.props;

    return (
      <Paper className={classes.root}>
        <Typography className={classes.title}>
            Онлайн курсы
            <div className={classes.searchWrapper}>
                <Tooltip title={
                  <>
                    Поиск осуществляется по: <br/>
                    - нвазвниям онлайн курсов; <br/>
                    - названиям платформ; <br/>
                    - направлениям подготовки, связанными с онлайн курсами; <br/>
                    - ключевым словам, описывающим результаты прохождения онлайн курса. <br/>
                  </>
                }>
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
                </Tooltip>
            </div>
        </Typography>

        <CustomizeExpansionPanel label="Фильтрация" details={<Filters />}/>

        <CoursesTable 
          courses={courses} 
          sortingField={sortingField} 
          sortingMode={sortingMode} 
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

          {/* <Fab 
            color="secondary"
            classes={{
              root: classes.addIcon
            }}
            onClick={this.handleCreate}
          >
            <AddIcon/>
          </Fab> */}
        </div>
        {/* 
        <CourseCreateModal />
        /> */}
      </Paper>
    );
  }
}

export default connect(withStyles(styles)(OnlineCourses));
