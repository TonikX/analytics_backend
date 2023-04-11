import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import className from "classnames";

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import ButtonGroup from "@mui/material/ButtonGroup";

import {rootState} from '../../store/reducers'
import {BACHELOR_QUALIFICATION, MASTER_QUALIFICATION} from "../WorkProgram/constants";
import actions from './actions'
import {getNoSelectedProfessions, getSelectedProfessions, getEducationalPrograms, getQualification} from './getters';

import {ProfessionsSelectList} from './ProfessionsSelectList/ProfessionsSelectList';
import {EducationalProgramsTable} from './EducationalProgramsTable/EducationalProgramsTable';

import {ProfessionType, QualificationType} from './types';

import {useStyles} from './SelectEducationalProgram.styles';

const SelectEducationalProgram: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const professions = useSelector((state: rootState) => getNoSelectedProfessions(state))
  const selectedProfessions = useSelector((state: rootState) => getSelectedProfessions(state))
  const educationalPrograms = useSelector((state: rootState) => getEducationalPrograms(state))
  const qualification = useSelector((state: rootState) => getQualification(state))

  const selectProfession = (item: ProfessionType): void => dispatch(actions.selectProfession(item))
  const unselectProfession = (item: ProfessionType): void => dispatch(actions.unselectProfession(item))
  const handleChangeQualification = (qualification: QualificationType) => () => dispatch(actions.setQualification(qualification))

  useEffect(() => {
    dispatch(actions.getProfessions())
    // eslint-disable-next-line
  }, [])

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title}>
        Подбор образовательных программ по профессиям
      </Typography>
      {(professions.length > 0 || selectedProfessions.length) ? 
        (
          <>
            <Typography className={classes.subtitle}>
              1. Уровень образования
            </Typography>
            <ButtonGroup>
              <Button onClick={handleChangeQualification(BACHELOR_QUALIFICATION)}
                      color={qualification === BACHELOR_QUALIFICATION ? 'primary' : 'info'}
                      variant="contained"
                      className={className({[classes.whiteButton]: qualification !== BACHELOR_QUALIFICATION})}
              >
                Бакалавр
              </Button>
              <Button onClick={handleChangeQualification(MASTER_QUALIFICATION)}
                      color={qualification === MASTER_QUALIFICATION ? 'primary' : 'info'}
                      variant="contained"
                      className={className({[classes.whiteButton]: qualification !== MASTER_QUALIFICATION})}
              >
                Магистр
              </Button>
            </ButtonGroup>

            <Typography className={classes.subtitle}>
              2. Выберите профессии
            </Typography>
            <ProfessionsSelectList
              selectProfession={selectProfession}
              unselectProfession={unselectProfession}
              professions={professions}
              selectedProfessions={selectedProfessions}
            />
            <Button
              variant="outlined"
              color="primary"
              className={classes.submitBtn}
              disabled={!selectedProfessions.length}
              onClick={() => dispatch(actions.getEducationalPrograms())}
            >
              Подобрать программы
            </Button>
          </>
        ) : null
      }
      {educationalPrograms.length && selectedProfessions.length ? (
        <EducationalProgramsTable
          educationalPrograms={educationalPrograms}
        />
      ) : null}
    </Paper>
  )
}

export default SelectEducationalProgram