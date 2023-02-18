import React from 'react';
import get from 'lodash/get';

import {AddCompetenceModalProps} from './types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';

import SearchSelector from "../SearchSelector/SearchSelector";

import connect from './AddCompetenceModal.connect';
import styles from './AddCompetenceModal.styles';
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import {CompetenceFields} from "../../containers/Competences/enum";
import CompetencesService from "../../containers/Competences/service";
import classNames from "classnames";

const Service = new CompetencesService()

class AddCompetenceModal extends React.PureComponent<AddCompetenceModalProps> {
  state = {
    competence: null,
    createCompetence: false,
    newCompetence: {},
  };

  componentDidMount() {
    this.props.competenceActions.getCompetences();
  }

  handleClose = () => {
    this.props.closeDialog();
  }

  handleSave = async () => {
    if (this.state.createCompetence) {
      const { data }: any = await Service.createCompetence(this.state.newCompetence);
      this.props.saveDialog({ value: data?.id})
      this.props.closeDialog();
      this.setState({competence: null, createCompetence: false, newCompetence: {}})
    } else {
      this.props.saveDialog(this.state.competence);
      this.props.closeDialog();

      this.setState({competence: null})
    }
  }

  save = (value: string) => {
    const {competenceList} = this.props;
    const competence = competenceList.find(el => el.value === value);

    this.setState({competence: competence})
  }

  handleChangeSearchText = (searchText: string) => {
    this.props.competenceActions.changeSearchQuery(searchText);
    this.props.competenceActions.getCompetences();
  }

  changeNewCompetence = (field: string) => (e: any) => {
    this.setState({
      newCompetence: {
        ...this.state.newCompetence,
        [field]: e.target.value,
      }
    })
  }

  render() {
    const {isOpen, classes, competenceList, } = this.props;
    const { createCompetence, newCompetence } = this.state

    // @ts-ignore
    const disableButton = createCompetence ? !(newCompetence[CompetenceFields.TITLE] && newCompetence[CompetenceFields.NUMBER])
      : get(this, 'state.competence.value', null) === null;

    return (
      <Dialog
        open={isOpen}
        onClose={this.handleClose}
        classes={{
          paper: classes.dialog,
          root: classes.root,
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
          Добавить компетенцию
          {createCompetence ? (
            <Button color="primary"
                    variant="text"
                    size="small"
                    onClick={() => this.setState({ createCompetence: false })}
            >
              <AddIcon/> Добавить из существующих
            </Button>
          ) : (
            <Button color="primary"
            variant="text"
            size="small"
            onClick={() => this.setState({ createCompetence: true })}
            >
              <AddIcon/> Создать компетенцию
            </Button>
          )}
        </DialogTitle>

        <DialogContent>
          {createCompetence ? (
            <>
              <TextField label="Номер компетенции *"
                         onChange={this.changeNewCompetence(CompetenceFields.NUMBER)}
                         variant="outlined"
                         fullWidth
                // @ts-ignore
                         value={newCompetence[CompetenceFields.NUMBER]}
                         InputLabelProps={{
                           shrink: true,
                         }}
              />
              <TextField label="Название компетенции *"
                         onChange={this.changeNewCompetence(CompetenceFields.TITLE)}
                         variant="outlined"
                         className={classNames(classes.marginBottom30)}
                         fullWidth
                         // @ts-ignore
                         value={newCompetence[CompetenceFields.TITLE]}
                         InputLabelProps={{
                           shrink: true,
                         }}
              />
            </>
          ) : (
            <SearchSelector label="Компетенция * "
                            changeSearchText={this.handleChangeSearchText}
                            list={competenceList}
                            changeItem={this.save}
                            value={''}
                            valueLabel={''}
            />
          )}
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button onClick={this.handleClose}
                  variant="text">
            Отмена
          </Button>
          <Button onClick={this.handleSave}
                  variant="contained"
                  disabled={disableButton}
                  color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

// @ts-ignore
export default connect(withStyles(styles)(AddCompetenceModal));
