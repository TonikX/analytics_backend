import React, {useState, useMemo} from 'react'
import debounce from "lodash/debounce";
//@ts-ignore
import matchSorter from 'match-sorter';

import {useStyles} from './ProfessionsSelectList.styles'

// @ts-ignore
import {List, AutoSizer, CellMeasurer, CellMeasurerCache} from 'react-virtualized-reactv17';
import Scrollbars from "react-custom-scrollbars-2";
import TextField from '../../../components/TextField';
import {ProfessionItem} from '../ProfessionItem/ProfessionItem'

import {ProfessionsSelectListProps} from './types'
import {ProfessionType} from '../types'
import {selectListModes} from '../enum'

export const ProfessionsSelectList: React.FC<ProfessionsSelectListProps> = ({ professions, selectProfession, selectedProfessions, unselectProfession }) => {
  const classes = useStyles()
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 30,
  })
  const [scrollTop, setScrollTop] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const handleScroll = ({ target: { scrollTop } }: any): void => {
    setScrollTop(scrollTop)
  }
  const addProfession = (profession: ProfessionType) => {
    // необходимо чтобы избежать подергивание списка
    const index = searchedProfessions.indexOf(profession)

    selectProfession(profession)
  
    // необходимо чтобы избежать подергивание списка
    const afterRows = searchedProfessions.filter((profession: ProfessionType) => searchedProfessions.indexOf(profession) >= index )
    const afterRowsIndexes = afterRows.map((profession: ProfessionType) => searchedProfessions.indexOf(profession))
    afterRowsIndexes.forEach((index: number) => cache.clear(index, 0))
  }
  const removeProfession = (profession: ProfessionType) => {
    unselectProfession(profession)
    cache.clearAll()
  }

  const searchedProfessions = useMemo((): Array<ProfessionType> => 
    matchSorter(professions, searchQuery, {keys: ['title']}), [searchQuery, professions])

  const rowRenderer = ({key, parent, index, style}: any) => {
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        columnIndex={0}
        rowIndex={index}
        parent={parent}
      >
        <ProfessionItem 
          style={style}
          mode={selectListModes.SELECT}
          selectProfession={addProfession}
          unselectProfession={removeProfession}
          profession={searchedProfessions[index]}
        />
      </CellMeasurer>

    );
  }

  const handleChangeSearch = (query: string): void => debounceSearch(query)

  const debounceSearch = debounce((value: string): void => {
    setSearchQuery(value);
  }, 400);
  const selectedProfessionsList = selectedProfessions.map((p) => (
    <ProfessionItem
      key={p.id}
      mode={selectListModes.UNSELECT}
      selectProfession={addProfession}
      unselectProfession={removeProfession}
      profession={p}
    />
  ))
  return (
    <div className={classes.professionsLists}>
      <div className={classes.allProfessionsList}>
        <TextField 
          onChange={handleChangeSearch}
          label="Поиск"
        />
        <AutoSizer>
          {({height, width}: any): React.ReactElement => (
            <div style={{height: height - 80, width}}>
              <Scrollbars 
                height={height - 80}
                width={width}
                onScroll={handleScroll}
              >
                <List
                    width={width}
                    height={height - 80}
                    rowCount={searchedProfessions.length}
                    rowHeight={cache.rowHeight}
                    rowRenderer={rowRenderer}
                    deferredMeasurementCache={cache}
                    scrollTop={scrollTop}
                    autoHeight
                />
              </Scrollbars>
            </div>
          )}
        </AutoSizer>
      </div>
      <div className={classes.selectedProfessionsList}>
        <AutoSizer>
          {({height, width}: any): React.ReactElement => (
            <div style={{height, width}}>
              <Scrollbars 
                height={height}
                width={width}
              >
                {selectedProfessionsList}
              </Scrollbars>
            </div>
          )}
        </AutoSizer>
      </div>
    </div>
  )
}
