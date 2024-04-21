import React from 'react';
import get from 'lodash/get';

import {AddCompetenceModalProps} from './types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import {withStyles} from '@mui/styles';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import connect from './AddCompetenceModal.connect';
import styles from './AddCompetenceModal.styles';
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import {CompetenceFields} from "../../containers/Competences/enum";
import CompetencesService from "../../containers/Competences/service";

const Service = new CompetencesService()

class AddCompetenceModal extends React.PureComponent<AddCompetenceModalProps, any> {
  state = {
    competence: null,
    createCompetence: false,
    newCompetence: {},
  };

  componentDidMount() {
    this.props.competenceActions.getCompetences(this.props.competenceType);
  }

  handleClose = () => {
    this.props.closeDialog();
    this.props.competenceActions.changeCodeQuery('');
    this.props.competenceActions.changeSearchQuery('');
    this.props.competenceActions.getCompetences(this.props.competenceType);
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

  handleChangeCodeText = (event: any) => {
    this.props.competenceActions.changeCodeQuery(event.target.value);
  }

  handleChangeValueText = (event: any) => {
    this.props.competenceActions.changeSearchQuery(event.target.value);
  }

  changeNewCompetence = (field: string) => (e: any) => {
    this.setState({
      newCompetence: {
        ...this.state.newCompetence,
        [field]: e.target.value,
      }
    })
  }

  selectCompetence = (label:string) => (event: any) => {
    this.setState({
      competence: {value: Number(event.currentTarget.value), label: label}
    })
  }

  handleSearch = () => {
    this.props.competenceActions.getCompetences(this.props.competenceType)
  }

  render() {
    const {isOpen, classes, competenceList} = this.props;
    const {createCompetence, newCompetence} = this.state;

    const disableButton = createCompetence
      //@ts-ignore
      ? !(newCompetence[CompetenceFields.TITLE] && newCompetence[CompetenceFields.NUMBER])
      : get(this, 'state.competence.value', null) === null;

    return (
      <Dialog
        open={isOpen}
        onClose={this.handleClose}
        classes={{
          paper: classes.dialog,
          root: classes.root,
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap' }}>
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
          </div>

          <div className={classes.searchRow}>
            <TextField label="Код"
                       onChange={this.handleChangeCodeText}
                       variant="outlined"
                       fullWidth
                       className={classes.searchInputCode}
                       InputLabelProps={{
                         shrink: true,
                       }}
            />
            <TextField label="Название"
                       onChange={this.handleChangeValueText}
                       variant="outlined"
                       fullWidth
                       InputLabelProps={{
                         shrink: true,
                       }}
                       className={classes.searchInputText}
            />
            <Button onClick={this.handleSearch}
                    variant="contained"
                    className={classes.searchButton}
                    color="primary">
              Поиск
            </Button>
          </div>
        </DialogTitle>

        <DialogContent>
          {createCompetence ? (
            <>
              <TextField label="Номер компетенции *"
                         onChange={this.changeNewCompetence(CompetenceFields.NUMBER)}
                         variant="outlined"
                         fullWidth
                         //@ts-ignore
                         value={newCompetence[CompetenceFields.NUMBER]}
                         className={classes.marginBottom30}
                         InputLabelProps={{
                           shrink: true,
                         }}
              />
              <TextField label="Название компетенции *"
                         onChange={this.changeNewCompetence(CompetenceFields.TITLE)}
                         variant="outlined"
                         className={classes.marginBottom30}
                         fullWidth
                         //@ts-ignore
                         value={newCompetence[CompetenceFields.TITLE]}
                         InputLabelProps={{
                           shrink: true,
                         }}
              />
            </>
          ) : (
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                {competenceList.map((competence) =>
                  <FormControlLabel
                    key={competence.value}
                    value={competence.value}
                    //@ts-ignore
                    control={<Radio checked={this.state.competence?.value === competence.value} />}
                    label={competence.label}
                    onChange={this.selectCompetence(competence.label)}
                  />
                )}
              </RadioGroup>
            </FormControl>
          )}
        </DialogContent>

        <DialogActions className={classes.actions}>
          <Button onClick={this.handleClose} variant="text">
            Отмена
          </Button>
          <Button onClick={this.handleSave}
                  variant="contained"
                  color="primary"
                  disabled={disableButton}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

// @ts-ignore
export default connect(withStyles(styles)(AddCompetenceModal));
