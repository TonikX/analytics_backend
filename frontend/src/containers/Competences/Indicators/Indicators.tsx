import React from 'react';
import get from 'lodash/get';
import Scrollbars from "react-custom-scrollbars-2";
import classNames from 'classnames';

import Paper from '@mui/material/Paper';
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";

import {withStyles} from '@mui/styles';

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";

import ConfirmDialog from "../../../components/ConfirmDialog";

import CreateModal from "./CreateModal";

import {IndicatorsFields} from "../../Indicators/enum";
import {withRouter} from '../../../hoc/WithRouter'

import connect from './Indicators.connect';
import styles from './Indicators.styles';
import {CompetenceFields} from "../enum";
import {IndicatorType} from "../../Indicators/types";

class Indicators extends React.Component<any> {
  state = {
    deleteConfirmId: null
  }

  componentDidMount() {
    this.props.actions.getIndicators(this.getCompetenceId());
    this.props.actions.getCompetence(this.getCompetenceId());
  }

  getCompetenceId = () => get(this, 'props.params.id', 0);

  handleClickDelete = (id: number) => () => {
    this.setState({
      deleteConfirmId: id
    });
  }

  handleConfirmDeleteDialog = () => {
    const {deleteConfirmId} = this.state;

    this.props.actions.deleteIndicator({
      [IndicatorsFields.ID]: deleteConfirmId,
      [IndicatorsFields.COMPETENCE]: this.getCompetenceId()
    });
    this.closeConfirmDeleteDialog();
  }

  closeConfirmDeleteDialog = () => {
    this.setState({
      deleteConfirmId: null
    });
  }

  handleClickEdit = (item: IndicatorType) => () => {
    this.props.actions.openDialog({
      ...item,
      [IndicatorsFields.COMPETENCE]: this.getCompetenceId()
    });
  }

  handleCreate = () => {
    this.props.actions.openDialog({
      [IndicatorsFields.COMPETENCE]: this.getCompetenceId()
    });
  }

  render() {
    //@ts-ignore
    const {classes} = this.props;
    const {indicators, competence} = this.props;
    const {deleteConfirmId} = this.state;

    return (
      <Paper className={classes.root}>
        <Typography className={classes.title}>
          Индикаторы компетенции «{get(competence, CompetenceFields.TITLE, '')}»
        </Typography>

        <div className={classes.tableWrap}>
          <div className={classNames(classes.listItem, classes.header)}>
            <Typography className={classNames(classes.marginRight, classes.numberCell)}>
              Номер
            </Typography>
            <Typography className={classNames(classes.marginRight, classes.titleCell)}>
              Название
            </Typography>
          </div>

          <div className={classes.list}>
            <Scrollbars>
              {indicators.map((item: any) =>
                <div className={classes.listItem} key={item[IndicatorsFields.ID]}>
                  <Typography className={classNames(classes.marginRight, classes.numberCell)}>
                    {item[IndicatorsFields.NUMBER]}
                  </Typography>
                  <Typography className={classNames(classes.marginRight, classes.titleCell)}>
                    {item[IndicatorsFields.TITLE]}
                  </Typography>
                  <div className={classes.actions}>
                    <IconButton onClick={this.handleClickDelete(item[IndicatorsFields.ID])}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={this.handleClickEdit(item)}>
                      <EditIcon />
                    </IconButton>
                  </div>
                </div>
              )}
            </Scrollbars>
          </div>
        </div>

        <div className={classes.footer}>
          <Fab color="secondary"
               classes={{
                 root: classes.addIcon
               }}
               onClick={this.handleCreate}
          >
            <AddIcon/>
          </Fab>
        </div>

        <ConfirmDialog onConfirm={this.handleConfirmDeleteDialog}
                       onDismiss={this.closeConfirmDeleteDialog}
                       confirmText={'Вы точно уверены, что хотите удалить индикатор?'}
                       isOpen={Boolean(deleteConfirmId)}
                       dialogTitle={'Удалить индикатор'}
                       confirmButtonText={'Удалить'}
        />

        <CreateModal />
      </Paper>
    );
  }
}

//@ts-ignore
export default connect(withStyles(styles)(withRouter(Indicators)));
