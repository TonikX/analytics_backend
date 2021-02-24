import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {useStyles} from './SelectEducationalProgram.styles'

import actions from './actions'

import {getNoSelectedProfessions, getSelectedProfessions, getEducationalPrograms} from './getters'

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import {ProfessionsSelectList} from './ProfessionsSelectList/ProfessionsSelectList'
import {EducationalProgramsTable} from './EducationalProgramsTable/EducationalProgramsTable'

import {rootState} from '../../store/reducers'
import {ProfessionType} from './types'

const SelectEducationalProgram: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const professions = useSelector((state: rootState) => getNoSelectedProfessions(state))
  const selectedProfessions = useSelector((state: rootState) => getSelectedProfessions(state))
  const educationalPrograms = useSelector((state: rootState) => getEducationalPrograms(state))

  const selectProfession = (item: ProfessionType): void => dispatch(actions.selectProfession(item))
  const unselectProfession = (item: ProfessionType): void => dispatch(actions.unselectProfession(item))

  useEffect(() => {
    dispatch(actions.getProfessions())
    // eslint-disable-next-line
  }, [])
  
  return (
    <Paper className={classes.root}>
      <Typography className={classes.title}>
        Подбор образовательных программ
      </Typography>
      {(professions.length > 0 || selectedProfessions.length) ? 
        (
          <>
            <Typography className={classes.subtitle}>
              1. Выберите профессии
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
        <>
          <Typography className={classes.subtitle}>
            2. Образовательные программы
          </Typography>
          <EducationalProgramsTable 
            educationalPrograms={educationalPrograms}
          />
        </>
      ) : null}

    </Paper>
  )
}

export default SelectEducationalProgram