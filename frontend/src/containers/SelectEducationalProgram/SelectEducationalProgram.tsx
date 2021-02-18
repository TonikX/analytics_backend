import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {useStyles} from './SelectEducationalProgram.styles'

import { getNoSelectedProfessions, getSelectedProfessions } from './getters'
import actions from './actions'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ProfessionsSelectList from './ProfessionsSelectList/ProfessionsSelectList'

import { rootState } from '../../store/reducers'
import {ProfessionType} from './types'

const SelectEducationalProgram: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const professions = useSelector((state: rootState) => getNoSelectedProfessions(state))
  const selectedProfessions = useSelector((state: rootState) => getSelectedProfessions(state))

  const selectProfession = (item: ProfessionType): void => dispatch(actions.selectProfession(item))
  const unselectProfession = (item: ProfessionType): void => dispatch(actions.unselectProfession(item))

  useEffect(() => {
    dispatch(actions.getProfessions())
  }, [])
  
  return (
    <Paper className={classes.root}>
      <Typography className={classes.title}>
        Подбор образовательных программ
      </Typography>
      {professions.length > 0 && 
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
          </>
        )
      }
    </Paper>
  )
}

export default SelectEducationalProgram