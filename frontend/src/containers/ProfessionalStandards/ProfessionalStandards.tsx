import React from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
// @ts-ignore
import Scrollbars from "react-custom-scrollbars-2";

import classNames from 'classnames';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";

import {withStyles} from '@mui/styles';

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import EyeIcon from '@mui/icons-material/VisibilityOutlined';

import ConfirmDialog from "../../components/ConfirmDialog";
import SortingButton from "../../components/SortingButton";
import ProfessionalStandardCreateModal from "../ProfessionalStandards/CreateModal";
import {SortingType} from "../../components/SortingButton/types";

import {ProfessionalStandardsType} from './types';
import {ProfessionalStandardFields} from './enum';
import {ProfessionalStandardsProps} from "./types";

import connect from './ProfessionalStandards.connect';
import styles from './ProfessionalStandarts.styles';
import Pagination from "@mui/lab/Pagination";
import {Link} from "react-router-dom";
import {appRouter} from "../../service/router-service";

class ProfessionalStandards extends React.Component<ProfessionalStandardsProps> {
  state = {
    deleteConfirmId: null
  }

  componentDidMount() {
    this.props.actions.getProfessionalStandards();
  }

  handleClickDelete = (id: number) => () => {
    this.setState({
      deleteConfirmId: id
    });
  }

  handleConfirmDeleteDialog = () => {
    const {deleteConfirmId} = this.state;

    this.props.actions.deleteProfessionalStandard(deleteConfirmId);
    this.closeConfirmDeleteDialog();
  }

  closeConfirmDeleteDialog = () => {
    this.setState({
      deleteConfirmId: null
    });
  }

  handleClickEdit = (professionalStandard: ProfessionalStandardsType) => () => {
    this.props.actions.openDialog(professionalStandard);
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
    this.props.actions.getProfessionalStandards();
  }, 300);

  handleChangePage = (event: any, page: number) => {
    this.props.actions.changeCurrentPage(page);
    this.props.actions.getProfessionalStandards();
  }

  changeSorting = (field: string) => (mode: SortingType) => {
    this.props.actions.changeSorting({field: mode === '' ? '' : field, mode});
    this.props.actions.getProfessionalStandards();
  }

  changeRoute = (id: any) => () => {
    //@ts-ignore
    this.props.navigate(appRouter.getProfessionalStandardRoute(id))
  }

  render() {
    //@ts-ignore
    const {classes} = this.props;
    const {professionalStandards, allCount, currentPage, sortingField, sortingMode} = this.props;
    const {deleteConfirmId} = this.state;

    return (
      <Paper className={classes.root}>
        <Typography className={classes.title}>
          Профессиональные стандарты

          <TextField placeholder="Поиск"
                     variant="outlined"
                     InputProps={{
                       classes: {
                         root: classes.searchInput
                       },
                       startAdornment: <SearchOutlined/>,
                     }}
                     onChange={this.handleChangeSearchQuery}
          />
        </Typography>

        <div className={classes.tableWrap}>
          <div className={classNames(classes.row, classes.header)}>
            <Typography className={classNames(classes.marginRight, classes.numberCell)}>
              Номер
              <SortingButton changeMode={this.changeSorting(ProfessionalStandardFields.NUMBER)}
                             mode={sortingField === ProfessionalStandardFields.NUMBER ? sortingMode : ''}
              />
            </Typography>
            <Typography className={classes.profCell}>
              Наименование области проф. деятельности
              <SortingButton changeMode={this.changeSorting(ProfessionalStandardFields.NAME)}
                             mode={sortingField === ProfessionalStandardFields.NAME ? sortingMode : ''}
              />
            </Typography>
            <Typography className={classNames(classes.marginRight, classes.codeCell)}>
              Код ПС
              <SortingButton changeMode={this.changeSorting(ProfessionalStandardFields.CODE)}
                             mode={sortingField === ProfessionalStandardFields.CODE ? sortingMode : ''}
              />
            </Typography>
            <Typography className={classNames(classes.marginRight, classes.titleCell)}>
              Название стандарта
              <SortingButton changeMode={this.changeSorting(ProfessionalStandardFields.TITLE)}
                             mode={sortingField === ProfessionalStandardFields.TITLE ? sortingMode : ''}
              />
            </Typography>
          </div>

          <div className={classes.list}>
            <Scrollbars>
              {professionalStandards.map(professionalStandard =>
                <div className={classes.row} key={professionalStandard[ProfessionalStandardFields.ID]}>
                  <Typography className={classNames(classes.marginRight, classes.numberCell)} >
                    {professionalStandard[ProfessionalStandardFields.NUMBER]}
                  </Typography>
                  <Typography className={classes.profCell}>
                    {professionalStandard[ProfessionalStandardFields.NAME]}
                  </Typography>
                  <Typography className={classNames(classes.marginRight, classes.codeCell)}>
                    {professionalStandard[ProfessionalStandardFields.CODE]}
                  </Typography>
                  <Typography
                    className={classNames(classes.marginRight, classes.titleCell, classes.pointerCell)}
                    onClick={this.changeRoute(professionalStandard[ProfessionalStandardFields.ID])}
                  >
                    {professionalStandard[ProfessionalStandardFields.TITLE]}
                  </Typography>

                  <div className={classes.actions}>
                    <IconButton>
                      <Link style={{textDecoration: 'none', height: '23px', color: 'rgba(0, 0, 0, 0.54)'}}
                            to={appRouter.getProfessionalStandardRoute(professionalStandard[ProfessionalStandardFields.ID])}
                      >
                        <EyeIcon />
                      </Link>
                    </IconButton>
                    <IconButton
                      onClick={this.handleClickDelete(professionalStandard[ProfessionalStandardFields.ID])}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={this.handleClickEdit(professionalStandard)}>
                      <EditIcon/>
                    </IconButton>
                  </div>
                </div>
              )}
            </Scrollbars>
          </div>
        </div>

        <div className={classes.footer}>
          <Pagination count={allCount }
                      page={currentPage}
                      onChange={this.handleChangePage}
                      color="primary"
          />

          {/* <Fab color="secondary"
                         classes={{
                             root: classes.addIcon
                         }}
                         onClick={this.handleCreate}
                    >
                        <AddIcon/>
                    </Fab> */}
        </div>
        {/*
// @ts-ignore */}
        <ProfessionalStandardCreateModal/>

        <ConfirmDialog onConfirm={this.handleConfirmDeleteDialog}
                       onDismiss={this.closeConfirmDeleteDialog}
                       confirmText={'Вы точно уверены, что хотите удалить профессиональный стандарт?'}
                       isOpen={Boolean(deleteConfirmId)}
                       dialogTitle={'Удалить профессиоанльный стандарт'}
                       confirmButtonText={'Удалить'}
        />
      </Paper>
    );
  }
}

// @ts-ignore
export default connect(withStyles(styles)(ProfessionalStandards));
