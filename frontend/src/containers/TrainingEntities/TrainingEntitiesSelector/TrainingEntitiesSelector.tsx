import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import classNames from "classnames";
import SearchSelector from '../../../components/SearchSelector';
import {rootState} from '../../../store/reducers';

import actions from '../actions';
import {getTrainingEntitiesForSelect} from '../getters';
import {TrainingEntitiesSelectorProps} from './types'

export default ({onChange, value, isReset, label, className}: TrainingEntitiesSelectorProps) => {
    const dispatch = useDispatch()
    const trainingEntities = useSelector((state: rootState) => getTrainingEntitiesForSelect(state))

    const handleChangeSearchQuery = (query: string) => {
      dispatch(actions.changeSearchQuery(query))
      dispatch(actions.getTrainingEntities())
    }

    const resetMenu = () => {
      dispatch(actions.changeSearchQuery(''))
      dispatch(actions.setTrainingEntities([]))
    }
    useEffect(() => {
      return resetMenu
    }, [])
    return (
        <SearchSelector label={label}
                        changeSearchText={handleChangeSearchQuery}
                        list={trainingEntities}
                        changeItem={(value: number) => onChange(value)}
                        value={value}
                        valueLabel=''
                        isReset={isReset}
                        className={classNames({ [className]: className })}
        />
    )
}