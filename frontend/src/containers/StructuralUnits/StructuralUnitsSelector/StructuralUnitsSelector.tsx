import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import SearchSelector from '../../../components/SearchSelector';
import {rootState} from '../../../store/reducers';

import actions from '../actions';
import {getStructuralUnitsForSelector} from '../getters';
import {StructuralUnitsSelectorProps} from './types'

export default ({onChange, value}: StructuralUnitsSelectorProps) => {
    const dispatch = useDispatch()
    const structuralUnits = useSelector((state: rootState) => getStructuralUnitsForSelector(state))

    const handleChangeSearchQuery = (query: string) => {
        dispatch(actions.changeSearchQuery(query))
        dispatch(actions.getStructuralUnits())
    }

    return (
        <SearchSelector label='Структурное подразделение'
                        changeSearchText={handleChangeSearchQuery}
                        list={structuralUnits}
                        changeItem={(value: number) => onChange(value)}
                        value={value}
                        valueLabel=''
        />
    )
}