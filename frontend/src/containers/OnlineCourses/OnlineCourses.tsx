import React from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Fab from "@material-ui/core/Fab";
import Button from '@material-ui/core/Button'
import Typography from "@material-ui/core/Typography";
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import ConfirmDialog from "../../components/ConfirmDialog";
import CourseCreateModal from "./CourseCreateModal";
import { CoursesTable } from './CoursesTable/CoursesTable'
import { Filters } from './Filters/Filters'

import AddIcon from "@material-ui/icons/Add";

import withStyles from '@material-ui/core/styles/withStyles';

import {CoursesProps} from './types';

import connect from './Courses.connect';
import styles from './Courses.styles';

// через стили (.styles.ts) не удалось сделать чтобы при открытии margin не появлялся
const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      // этот margin
      margin: 0,
    },
  },
  expanded: {},
})(MuiExpansionPanel);

class OnlineCourses extends React.Component<CoursesProps> {
  state = {
      deleteConfirmId: null,
      showFilters: false,
  }

  componentDidMount() {      
      this.props.actions.getPlatforms()
      this.props.actions.getInstitutions()
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

  handleShowFilters = (): void => {
    this.setState({
      showFilters: !this.state.showFilters,
    })
  }
  render() {
    const {classes, courses, allCount, currentPage, sortingField, sortingMode, institutions, platforms} = this.props;
    const {deleteConfirmId} = this.state;

    return (
      <Paper className={classes.root}>
        <Typography className={classes.title}>
            Онлайн курсы
            <div className={classes.searchWrapper}>
              <Button 
                onClick={this.handleShowFilters} 
                variant="contained" 
                color="primary" 
                disableElevation 
                className={classes.filterBtn}
              >
                Фильтрация
              </Button>
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
            </div>
        </Typography>
        <ExpansionPanel expanded={this.state.showFilters} onChange={this.handleShowFilters}>
          <ExpansionPanelSummary 
            className={classes.accordionSummary}
            expandIcon={<ExpandMoreIcon />}
          >
            Фильтрация
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Filters />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <CoursesTable 
          courses={courses} 
          sortingField={sortingField} 
          sortingMode={sortingMode} 
          handleClickDelete={(id: number) => this.handleClickDelete(id)}
          institutions={institutions}
          platforms={platforms}
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

          <Fab 
            color="secondary"
            classes={{
              root: classes.addIcon
            }}
            onClick={this.handleCreate}
          >
            <AddIcon/>
          </Fab>
        </div>

        <CourseCreateModal />

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
