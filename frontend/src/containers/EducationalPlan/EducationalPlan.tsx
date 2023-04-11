import React, {SyntheticEvent} from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import {Link} from 'react-router-dom'

import Scrollbars from "react-custom-scrollbars-2";

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import {withStyles} from '@mui/styles';
import Menu from "@mui/material/Menu";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import EyeIcon from "@mui/icons-material/VisibilityOutlined";
import SettingsIcon from "@mui/icons-material/MoreVert";

import CreateModal from "./CreateModal";
import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import {SortingType} from "../../components/SortingButton/types";

import {EducationalPlanProps, EducationalPlanType} from './types';
import {specializationObject} from "../WorkProgram/constants";
import {EducationalPlanFields} from './enum';

import {appRouter} from "../../service/router-service";

import connect from './EducationalPlan.connect';
import styles from './EducationalPlan.styles';
import {DirectionFields} from "../Direction/enum";
import {DirectionType} from "../Direction/types";
import {withRouter} from "../../hoc/WithRouter";
import Pagination from "@mui/lab/Pagination";

class EducationalPlan extends React.Component<EducationalPlanProps> {
  state = {
    deleteConfirmId: null,
    anchorsEl: {}
  }

  componentDidMount() {
    this.props.actions.getEducationalPlans();
  }

  componentDidUpdate(prevProps: Readonly<EducationalPlanProps>, prevState: Readonly<{}>, snapshot?: any) {
    // @ts-ignore
    const {newPlanIdForRedirect, navigate} = this.props;
    if (prevProps.newPlanIdForRedirect !== this.props.newPlanIdForRedirect && this.props.newPlanIdForRedirect) {
      this.props.actions.setNewPlanIdForRedirect(null);
      // @ts-ignore
      navigate(appRouter.getPlanDetailLink(newPlanIdForRedirect));
    }
  }

  componentWillUnmount() {
    this.props.actions.pageDown();
  }

  handleClickDelete = (id: number) => () => {
    this.setState({
      deleteConfirmId: id
    });
    this.handleCloseMenu();
  }

  handleConfirmDeleteDialog = () => {
    const {deleteConfirmId} = this.state;

    this.props.actions.deleteEducationalPlan(deleteConfirmId);
    this.closeConfirmDeleteDialog();
  }

  closeConfirmDeleteDialog = () => {
    this.setState({
      deleteConfirmId: null
    });
  }

  handleClickEdit = (plan: EducationalPlanType) => () => {
    this.props.actions.openDialog(plan);
    this.handleCloseMenu();
  }

  goToDetailView = (id: number) => () => {
    // @ts-ignore
    let {navigate} = this.props;

    navigate(appRouter.getPlanDetailLink(id));
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
    this.props.actions.getEducationalPlans();
  }, 300);

  handleChangePage = (event: any, page: number) => {
    this.props.actions.changeCurrentPage(page);
    this.props.actions.getEducationalPlans();
  }

  changeSorting = (field: string) => (mode: SortingType)=> {
    this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
    this.props.actions.getEducationalPlans();
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

  render() {
    //@ts-ignore
    const {classes} = this.props;
    const {educationalPlan, allCount, currentPage, sortingField, sortingMode, canAddNewPlan} = this.props;
    const {deleteConfirmId} = this.state;

    const {anchorsEl} = this.state;

    return (
      <Paper className={classes.root}>
        <div className={classes.titleWrap}>
          <Typography variant="h4" className={classes.title}>Учебные планы</Typography>

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
        </div>

        <Scrollbars>
          <div className={classes.tableWrap}>
            <Table stickyHeader size='small'>
              <TableHead className={classes.header}>
                <TableRow>
                  <TableCell>
                    <div className={classes.headerCell}>
                      Образовательная программа
                      <SortingButton changeMode={this.changeSorting('academic_plan_in_field_of_study__title')}
                                     mode={sortingField === 'academic_plan_in_field_of_study__title' ? sortingMode : ''}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={classes.headerCell}>
                      Год набора
                      <SortingButton changeMode={this.changeSorting('academic_plan_in_field_of_study__year')}
                                     mode={sortingField === 'academic_plan_in_field_of_study__year' ? sortingMode : ''}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={classes.headerCell}>
                      Уровень образования
                      <SortingButton changeMode={this.changeSorting('academic_plan_in_field_of_study__qualification')}
                                     mode={sortingField === 'academic_plan_in_field_of_study__qualification' ? sortingMode : ''}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={classes.headerCell}>
                      Направления
                      <SortingButton changeMode={this.changeSorting('academic_plan_in_field_of_study__field_of_study__title')}
                                     mode={sortingField === 'academic_plan_in_field_of_study__field_of_study__title' ? sortingMode : ''}
                      />
                    </div>
                  </TableCell>

                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {educationalPlan.map(plan =>
                  <TableRow key={plan[EducationalPlanFields.ID]}>
                    <TableCell>{get(plan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.TITLE], '')}</TableCell>
                    <TableCell>{get(plan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.YEAR], '')}</TableCell>
                    <TableCell>
                      {specializationObject[get(plan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.QUALIFICATION], '')]}
                    </TableCell>

                    <TableCell>{get(plan, [EducationalPlanFields.ACADEMIC_PLAN_IN_FIELD_OF_STUDY, 0, EducationalPlanFields.FIELD_OF_STUDY], []).map((fieldOfStudy: DirectionType) =>
                      <> {fieldOfStudy[DirectionFields.TITLE]} ({fieldOfStudy[DirectionFields.NUMBER]}) <br /> </>
                    )}</TableCell>

                    <TableCell style={{padding: '0 !important'}}>
                      <div className={classes.actions}>
                        <IconButton
                          aria-haspopup="true"
                          onClick={this.handleMenu(plan[EducationalPlanFields.ID])}
                          color="inherit"
                        >
                          <SettingsIcon />
                        </IconButton>
                        <Menu
                          anchorEl={get(anchorsEl, plan[EducationalPlanFields.ID])}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          open={Boolean(get(anchorsEl, plan[EducationalPlanFields.ID]))}
                          onClose={this.handleCloseMenu}
                          PopoverClasses={{
                            root: classes.popper,
                            paper: classes.menuPaper
                          }}
                        >
                          <MenuItem className={classes.menuLinkItem}>
                            <Link to={appRouter.getPlanDetailLink(plan[EducationalPlanFields.ID])} target="_blank">
                              <EyeIcon className={classes.menuIcon}/>
                              Смотреть детально
                            </Link>
                          </MenuItem>

                          {/*{plan[EducationalPlanFields.CAN_EDIT] &&*/}
                          {/*    <MenuItem onClick={this.handleClickEdit(plan)}>*/}
                          {/*        <EditIcon className={classes.menuIcon}/>*/}
                          {/*        Редактировать*/}
                          {/*    </MenuItem>*/}
                          {/*}*/}

                          {plan[EducationalPlanFields.CAN_EDIT] &&
                            <MenuItem
                              onClick={this.handleClickDelete(plan[EducationalPlanFields.ID])}>
                              <DeleteIcon className={classes.menuIcon}/>
                              Удалить
                            </MenuItem>
                          }
                        </Menu>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Scrollbars>

        <div className={classes.footer}>
          <Pagination count={Math.ceil(allCount / 10)}
                      page={currentPage}
                      onChange={this.handleChangePage}
                      color="primary"
          />

          {canAddNewPlan &&
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

        {canAddNewPlan && <CreateModal/>}

        <ConfirmDialog onConfirm={this.handleConfirmDeleteDialog}
                       onDismiss={this.closeConfirmDeleteDialog}
                       confirmText={'Вы точно уверены, что хотите удалить учебный план?'}
                       isOpen={Boolean(deleteConfirmId)}
                       dialogTitle={'Удалить учебный план'}
                       confirmButtonText={'Удалить'}
        />
      </Paper>
    );
  }
}

// @ts-ignore
export default connect(withStyles(styles)(withRouter(EducationalPlan)));
